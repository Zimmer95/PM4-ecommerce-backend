import { Module } from "@nestjs/common";
import { OrderDetailsController } from "./order-details.controller";
import { OrderDetailsService } from "./order-details.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Orders } from "src/entities/orders.entity";
import { Users } from "src/entities/users.entity";
import { OrdersRepository } from "../orders/orders.repository";
import { UsersRepository } from "../users/users.repository";
import { OrderDetailsRepository } from "./order-details.repository";
import { ProductsRepository } from "../products/products.repository";
import { CategoriesRepository } from "../categories/categories.repository";
import { Categories } from "src/entities/categories.entity";
import { Products } from "src/entities/products.entity";
import { preloadProducts } from "src/helpers/data";
import { CategoriesService } from "../categories/categories.service";
import { Files } from "src/entities/files.entity";
import { FilesService } from "../files/localDbFiles.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderDetails,
      Orders,
      Users,
      Categories,
      Products,
      Files
    ]),
  ],
  controllers: [OrderDetailsController],
  providers: [
    { provide: "ProductsData", useValue: preloadProducts },
    OrderDetailsService,
    OrderDetailsRepository,
    OrdersRepository,
    UsersRepository,
    ProductsRepository,
    CategoriesRepository,
    CategoriesService,
    FilesService
  ],
})
export class OrderDetailsModule {}
