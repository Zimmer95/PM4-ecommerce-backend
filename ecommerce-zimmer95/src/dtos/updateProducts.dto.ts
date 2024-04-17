import { PartialType, PickType } from "@nestjs/swagger";
import { ProductsDto } from "./products.dto";

export class UpdateProductsDto extends PartialType(
  PickType(ProductsDto, [
    "name",
    "description",
    "price",
    "stock",
    "imgUrl",
    "category",
  ])
) {}
