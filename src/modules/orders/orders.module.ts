import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { OrdersRepository } from "./orders.repository";
import { ProductsRepository } from "../products/products.repository";
import { Products } from "src/entities/products.entity";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { UsersRepository } from "../users/users.repository";
import { Users } from "src/entities/users.entity";
import { CategoriesRepository } from "../categories/categories.repository";
import { Categories } from "src/entities/categories.entity";
import { preloadProducts } from "src/helpers/data";
import { CategoriesService } from "../categories/categories.service";
import { Files } from "src/entities/files.entity";
import { FilesService } from "../files/localDbFiles.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orders,
      Products,
      OrderDetails,
      Users,
      Categories,
      Files
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    ProductsRepository,
    UsersRepository,
    CategoriesRepository,
    CategoriesService,
    FilesService,
    { provide: "ProductsData", useValue: preloadProducts },
  ],
})
export class OrdersModule {}
