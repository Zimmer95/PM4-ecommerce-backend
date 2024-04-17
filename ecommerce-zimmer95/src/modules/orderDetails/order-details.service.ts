import { Injectable } from '@nestjs/common';
import { OrderDetailsRepository } from './order-details.repository';
import { OrderDetails } from 'src/entities/orderDetails.entity';

@Injectable()
export class OrderDetailsService {
    constructor(private orderDetailsRepository: OrderDetailsRepository) {}

    addOrderDetails(orderDetails: OrderDetails) {
      return this.orderDetailsRepository.addOrderDetails(orderDetails);
    }
    getOrderDetails(id: Partial<OrderDetails>) {
      return this.orderDetailsRepository.getOrderDetails(id);
    }
}
