import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { OrdersDto } from "src/dtos/orders.dto";

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  addOrder(order: OrdersDto) {
    return this.ordersRepository.addOrder(order);
  }
  getOrderById(id: string) {
    return this.ordersRepository.getOrderById(id);
  }
  getOrders() {
    return this.ordersRepository.getOrders();
  }
}
