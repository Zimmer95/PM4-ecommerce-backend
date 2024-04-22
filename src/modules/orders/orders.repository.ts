import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Orders } from "src/entities/orders.entity";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { Products } from "src/entities/products.entity";
import { CreateOrdersDto } from "src/dtos/createOrder.dto";

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async addOrder(order: CreateOrdersDto) {
    const user = await this.usersRepository.findOne({
      where: { id: order.userId },
      select: ["id", "name", "email", "address", "city"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const uniqueProductIds = new Set(order.products);
    if (uniqueProductIds.size !== order.products.length) {
      throw new BadRequestException(
        "Duplicate product IDs found. Only one unit of each product is allowed per order."
      );
    }

    const newOrder = new Orders();
    newOrder.user_id = user;

    const createdOrder = await this.ordersRepository.save(newOrder);
    const productIds = order.products.map((products) => products.id);
    const productsArray = await Promise.all(
      productIds.map(async (prodId) => {
        return await this.productsRepository.findOne({
          where: { id: prodId },
          select: ["id", "name", "price", "stock"],
        });
      })
    );

    productsArray.forEach((product) => {
      if (product === null) {
        throw new NotFoundException(
          "Some product is not found in the database"
        );
      }
    });

    const totalPrice = productsArray.reduce(
      (acc, product) => acc + Number(product.price),
      0
    );

    productsArray.forEach((product) => {
      if (product.stock === 0) {
        throw new NotFoundException(
          "Some product is not valid or is out of stock"
        );
      }
    });

    productsArray.map((product) => (product.stock = product.stock - 1));
    productsArray.map((product) => this.productsRepository.save(product));

    const orderDetails = new OrderDetails();
    orderDetails.products = productsArray;
    orderDetails.price = totalPrice;

    const createdOrderDetails = await this.orderDetailsRepository.save(
      orderDetails
    );

    createdOrder.orderDetails = createdOrderDetails;

    return createdOrder;
  }

  async getOrders() {
    return await this.ordersRepository.find();
  }

  async getOrdersByUserId(id: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { id: id } });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      if (user.orders.length < 1) {
        throw new ConflictException("User has no orders");
      }

      return user.orders;
    } catch (error) {
      throw new NotFoundException("User or orders not found");
    }
  }
}
