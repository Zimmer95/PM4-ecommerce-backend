import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { Categories } from "src/entities/categories.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesRepository } from "./categories.repository";
import { preloadProducts } from "src/helpers/data";
import { Files } from "src/entities/files.entity";
import { FilesService } from "../files/localDbFiles.service";

@Module({
  imports: [TypeOrmModule.forFeature([Categories]), ],
  providers: [
    { provide: "ProductsData", useValue: preloadProducts },
    CategoriesService,
    CategoriesRepository,
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
