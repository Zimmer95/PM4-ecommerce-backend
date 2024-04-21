import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriesDto {
  @IsNotEmpty({ message: "The name is required" })
  @IsString()
  name: string;
}
