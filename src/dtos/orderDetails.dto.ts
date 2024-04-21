import { IsNotEmpty, IsString } from "class-validator";

export class OrderDetailsDto {
  @IsNotEmpty({ message: "The name is required" })
  @IsString({ message: "The received user id must be a string" })
  price: number;

  @IsNotEmpty({ message: "The name is required" })
  @IsString({ message: "The received user id must be a string" })
  orders: string;

  @IsNotEmpty({ message: "The name is required" })
  @IsString({ message: "The received user id must be a string" })
  products: string[];
}
