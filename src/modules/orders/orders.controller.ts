import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { AuthGuard } from "src/guards/auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { CreateOrdersDto } from "src/dtos/createOrder.dto";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";
import { Role } from "../auth/role.enum";

@ApiTags("Orders")
@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.admin && Role.user)
  addOrder(@Body() order: CreateOrdersDto) {
    return this.ordersService.addOrder(order);
  }

  @Get(":id")
  @UseGuards(RolesGuard)
  @Roles(Role.admin && Role.user)
  getOrderById(@Param() id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  getOrders() {
    return this.ordersService.getOrders();
  }
}
