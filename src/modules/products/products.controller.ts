import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsDto } from "src/dtos/products.dto";
import { UpdateProductsDto } from "src/dtos/updateProducts.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Role } from "../auth/role.enum";
import { Roles } from "src/decorators/roles.decorator";
import { Request } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Products")
@Controller("products")
/* @UseGuards(AuthGuard) */
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.user)
  addProduct(@Body() product: ProductsDto) {
    return this.productsService.addProduct(product);
  }

  @Get("seeder")
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  preloadProducts() {
    return this.productsService.preloadProducts();
  }

  @Get()
  async getProducts(@Req() req: Request, @Query("name") name?: string) {
    console.log(JSON.stringify(req));

    if (name) {
      const product = await this.productsService.getProductByName(name);
      if (!product) {
        throw new BadRequestException(`Product with name '${name}' not found.`);
      }
      return product;
    }
    return this.productsService.getProducts();
  }

  @Get(":id")
  getProductById(@Param("id") id: string) {
    return this.productsService.getProductById(id);
  }

  @Put(":id")
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  updateProduct(@Param("id") id: string, @Body() product: UpdateProductsDto) {
    return this.productsService.updateProduct(product, id);
  }

  @Delete(":id")
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  deleteProduct(@Param("id") id: string) {
    return this.productsService.deleteProduct(id);
  }
}
