import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Orders } from "src/entities/orders.entity";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderDetailsRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async addOrderDetails(orderDetails: OrderDetails) {/* 
    const newOrderDetails = this.ordersRepository.create(orderDetails);
    const orderDetail = await this.orderDetailsRepository.save(newOrderDetails); */
    return orderDetails;
  }

  async getOrderDetails(id: Partial<Orders>) {
    return id;
  }
}
