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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Products")
@Controller("products")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("seeder")
  @UseGuards(RolesGuard)
  @Roles(Role.admin) 
  preloadProducts() {
    return this.productsService.preloadProducts();
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.admin && Role.user)
  async getProducts(@Query("name") name?: string) {
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
  @UseGuards(RolesGuard)
  @Roles(Role.admin && Role.user)
  getProductById(@Param("id") id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  addProduct(@Body() product: ProductsDto) {
    return this.productsService.addProduct(product);
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
