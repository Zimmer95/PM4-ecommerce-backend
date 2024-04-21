import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  ParseUUIDPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UsePipes,
  Param,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./localDbFiles.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { Repository } from "typeorm";
import { CloudinaryService } from "src/modules/files/cloudinary.service";
import { MinSizeValidatorPipe } from "src/pipes/min-size-validator.pipe";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";
import { Role } from "../auth/role.enum";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Files")
@Controller("files")
@UseGuards(RolesGuard)
@Roles(Role.admin)
@UseGuards(AuthGuard)
export class FilesController {
  constructor(
    private filesService: FilesService,
    private cloudinaryService: CloudinaryService,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>
  ) {}

  //cloudinary
  @Post("uploadImage/:id")
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @UseInterceptors(FileInterceptor("file"))
  @UsePipes(MinSizeValidatorPipe)
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: "El archivo debe ser menor a 200kb",
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      })
    )
    @UploadedFile()
    file: Express.Multer.File,
    @Param("id", ParseUUIDPipe)
    id: string
  ) {
    const product = await this.productsRepository.findOne({
      where: { id: id },
    });
    console.log(id);

    if (!product) {
      throw new Error("Product not found");
    }
    const savedFile = await this.cloudinaryService.uploadImage(file);

    product.imgUrl = savedFile.url;
    await this.productsRepository.save(product);
    console.log(product);

    return savedFile;
  }

  //local DB
  @Post("local/:id")
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @UseInterceptors(FileInterceptor("file"))
  async uploadToLocalDbFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: "El archivo debe ser menor a 200kb",
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      })
    )
    @UploadedFile()
    file: Express.Multer.File,
    @Param("id", ParseUUIDPipe)
    id: string
  ) {
    console.log("HOLA WORLD");

    const product = await this.productsRepository.findOne({
      where: { id: id },
    });

    console.log(product);

    if (!product) {
      throw new Error("Product not found");
    }

    return await this.filesService.saveFile({
      name: file.originalname,
      mimeType: file.mimetype,
      data: file.buffer,
      product,
    });
  }
}
