import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProductsDto {
  @IsNotEmpty({ message: "The name is required" })
  @IsString({ message: "The name must be a string" })
  @ApiProperty({ description: "Name of the product" })
  name: string;

  @IsNotEmpty({ message: "The description is required" })
  @IsString({ message: "The description must be a string" })
  @ApiProperty({ description: "Description of the product" })
  description: string;

  @IsNotEmpty({ message: "The price is required" })
  @IsNumber({}, { message: "The price must be a number" })
  @ApiProperty({ description: "Price of the product" })
  price: number;

  @IsNotEmpty({ message: "The stock is required" })
  @IsNumber({}, { message: "The stock must be a number" })
  @ApiProperty({ description: "Stock of the product" })
  stock: number;

  @IsOptional()
  @IsString({ message: "The image url must be a string" })
  @ApiProperty({ description: "Image URL of the product", required: false })
  imgUrl?: string;

  @IsNotEmpty({ message: "The category is required" })
  @IsString({ message: "The category must be a string" })
  @ApiProperty({ description: "Category of the product" })
  category: string;
}
