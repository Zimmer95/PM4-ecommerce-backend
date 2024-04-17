import { PickType } from "@nestjs/swagger";
import { OrdersDto } from "./orders.dto";

export class CreateOrderDto extends PickType(OrdersDto, [
  "userId",
  "products",
]) {}
