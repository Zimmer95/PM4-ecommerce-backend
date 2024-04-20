import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesService } from "./localDbFiles.service";
import { FilesController } from "./files.controller";
import { Products } from "src/entities/products.entity";
import { Files } from "src/entities/files.entity";
import { CloudinaryService } from "src/modules/files/cloudinary.service";
import { CloudinaryConfig } from "src/config/cloudinary.config";
import { ProductsService } from "../products/products.service";
import { ProductsRepository } from "../products/products.repository";
import { CategoriesService } from "../categories/categories.service";
import { Categories } from "src/entities/categories.entity";
import { preloadProducts } from "src/helpers/data";
import { CategoriesRepository } from "../categories/categories.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Products, Files, Categories])],
  providers: [
    FilesService,
    CloudinaryService,
    CloudinaryConfig,
    ProductsService,
    ProductsRepository,
    CategoriesService,
    CategoriesRepository,
    { provide: "ProductsData", useValue: preloadProducts },
  ],
  controllers: [FilesController],
})
export class FilesModule {}
