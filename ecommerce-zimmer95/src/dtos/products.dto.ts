import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductsDto {
  @IsNotEmpty({ message: "The name is required" })
  @IsString({ message: "The received user id must be a string" })
  name: string;

  @IsNotEmpty({ message: "The description is required" })
  @IsString({ message: "The received user id must be a string" })
  description: string;

  @IsNotEmpty({ message: "The price is required" })
  @IsNumber({}, { message: "Must be a number" })
  price: number;

  @IsNotEmpty({ message: "The price is required" })
  @IsNumber({}, { message: "Must be a number" })
  stock: number;

  @IsOptional()
  @IsString({ message: "The received image url must be a string" })
  imgUrl?: string;

  @IsNotEmpty({ message: "The category is required" })
  @IsString({ message: "The received category must be a string" })
  category: string;
}
