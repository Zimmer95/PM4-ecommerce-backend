import { ApiProperty, PickType } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
  IsNumber,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  @MinLength(3, { message: "Name must be at least 3 characters long" })
  @MaxLength(80, { message: "Name cannot exceed 80 characters" })
  @ApiProperty({
    description: "Full name of the user",
    example: "Jorge Zimmermann",
  })
  name: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Please provide a valid email address" })
  @ApiProperty({
    description: "Email address of the user",
    example: "jorgezimmer95@gmail.com",
  })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        "The password must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !@#$%^&*",
    }
  )
  @ApiProperty({ description: "Password of the user" })
  password: string;

  @IsNumber({}, { message: "Phone must be a number" })
  @ApiProperty({ description: "Phone number of the user",
  example: "3132525498", })
  phone: number;

  @IsString({ message: "Address must be a string" })
  @MinLength(5, { message: "Address must be at least 5 characters long" })
  @MaxLength(80, { message: "Address cannot exceed 80 characters" })
  @ApiProperty({ description: "Address of the user",
  example: "Av. Siempre Viva 123", })
  address: string;

  @IsString({ message: "Country must be a string" })
  @MinLength(5, { message: "Country must be at least 5 characters long" })
  @MaxLength(20, { message: "Country cannot exceed 20 characters" })
  @ApiProperty({ description: "Country of the user",
  example: "Argentina", })
  country: string;

  @IsString({ message: "City must be a string" })
  @MinLength(5, { message: "City must be at least 5 characters long" })
  @MaxLength(20, { message: "City cannot exceed 20 characters" })
  @ApiProperty({ description: "City of the user" ,
  example: "Obera",})
  city: string;
}
