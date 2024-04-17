import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class OrdersDto {
  @IsNotEmpty({ message: "The name is required" })
  @IsString({ message: "The received user id must be a string" })
  userId: string;

  @IsNotEmpty({ message: "The products are required" })
  @IsArray({ message: "It must be an array of products." })
  products: [{ id: string }];
}
