import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersDto } from "src/dtos/orders.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Orders")
@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  addOrder(@Body() order: OrdersDto) {
    return this.ordersService.addOrder(order);
  }
  @Get(":id")
  getOrderById(@Param() id: string) {
    return this.ordersService.getOrderById(id);
  }
  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }
}
