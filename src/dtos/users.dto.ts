import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  MinLength,
  MaxLength,
} from "class-validator";

export class UsersDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  @MinLength(3, { message: "Name must be at least 3 characters long" })
  @MaxLength(80, { message: "Name cannot exceed 80 characters" })
  @ApiProperty({ description: "Full name of the user" })
  name: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Please provide a valid email address" })
  @ApiProperty({ description: "Email address of the user" })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(15, { message: "Password cannot exceed 15 characters" })
  @ApiProperty({ description: "Password of the user" })
  password: string;

  @IsNumber({}, { message: "Phone must be a number" })
  @ApiProperty({ description: "Phone number of the user" })
  phone: number;

  @IsString({ message: "Address must be a string" })
  @MinLength(5, { message: "Address must be at least 5 characters long" })
  @MaxLength(80, { message: "Address cannot exceed 80 characters" })
  @ApiProperty({ description: "Address of the user" })
  address: string;

  @IsString({ message: "Country must be a string" })
  @MinLength(5, { message: "Country must be at least 5 characters long" })
  @MaxLength(20, { message: "Country cannot exceed 20 characters" })
  @ApiProperty({ description: "Country of the user" })
  country: string;

  @IsString({ message: "City must be a string" })
  @MinLength(5, { message: "City must be at least 5 characters long" })
  @MaxLength(20, { message: "City cannot exceed 20 characters" })
  @ApiProperty({ description: "City of the user" })
  city: string;
}