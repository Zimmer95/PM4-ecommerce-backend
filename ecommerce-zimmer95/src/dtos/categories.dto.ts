import { IsNotEmpty, IsString } from "class-validator";

export class CategoriesDto {
  @IsNotEmpty({ message: "The name is required" })
  @IsString()
  name: string;

  @IsNotEmpty({ message: "The name is required" })
  @IsString()
  products: string[];
}
