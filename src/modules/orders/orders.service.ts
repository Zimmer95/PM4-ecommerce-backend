import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { CreateOrdersDto } from "src/dtos/createOrder.dto";

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  addOrder(order: CreateOrdersDto) {
    return this.ordersRepository.addOrder(order);
  }
  getOrdersByUserId(id: string) {
    return this.ordersRepository.getOrdersByUserId(id);
  }
  getOrders() {
    return this.ordersRepository.getOrders();
  }
}
