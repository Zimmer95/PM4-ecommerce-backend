import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesService } from "./localDbFiles.service";
import { FilesController } from "./files.controller";
import { Products } from "src/entities/products.entity";
import { Files } from "src/entities/files.entity";
import { CloudinaryService } from "src/modules/files/cloudinary.service";
import { CloudinaryConfig } from "src/config/cloudinary.config";

@Module({
  imports: [TypeOrmModule.forFeature([Products, Files])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryService, CloudinaryConfig],
})
export class FilesModule {}
