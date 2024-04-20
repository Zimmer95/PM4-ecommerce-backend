import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { preloadProducts } from "src/helpers/data";
import { CategoriesRepository } from "../categories/categories.repository";
import { Categories } from "src/entities/categories.entity";
import { FilesService } from "../files/localDbFiles.service";
import { Files } from "src/entities/files.entity";
import { CategoriesService } from "../categories/categories.service";
import { requiresAuth } from "express-openid-connect";

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories, Files])],
  providers: [
    { provide: "ProductsData", useValue: preloadProducts },
    ProductsService,
    FilesService,
    ProductsRepository,
    CategoriesRepository,
    CategoriesService,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
