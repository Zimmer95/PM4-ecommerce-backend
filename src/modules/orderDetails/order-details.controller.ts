import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { OrderDetailsService } from "./order-details.service";
import { AuthGuard } from "src/guards/auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Order-details")
@Controller("order-details")
@UseGuards(AuthGuard)
export class OrderDetailsController {
  constructor(private ordersDetailsService: OrderDetailsService) {}
  @Post()
  addOrderDetail(@Body() orderDetail: OrderDetails) {
    return this.ordersDetailsService.addOrderDetails(orderDetail);
  }/* 
  @Get(":id")
  getOrder(@Param() id: Partial<OrderDetails>) {
    return this.ordersDetailsService.getOrderDetails(id);
  } */
}
