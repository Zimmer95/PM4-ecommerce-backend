import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  MinLength,
  MaxLength,
  IsBoolean,
} from "class-validator";

export class UsersDto {
 /**
   * Name must be a string of at least 3 characters
   * @example: Strong!(PassWord)
   */
  @IsNotEmpty({ message: "El nombre es requerido" })
  @IsString({ message: "El nombre debe ser una cadena de caracteres" })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  @MaxLength(80, { message: "El nombre no puede superar los 80 caracteres" })
  name: string;

  @IsNotEmpty({ message: "El correo electrónico es requerido" })
  @IsEmail({}, { message: "Debe proporcionar un correo electrónico válido" })
  email: string;

  @IsNotEmpty({ message: "La contraseña es requerida" })
  @IsString({ message: "La contraseña debe ser una cadena de caracteres" })
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  @MaxLength(15, {
    message: "La contraseña no puede superar los 15 caracteres",
  })
  password: string;

  @IsNumber({}, { message: "El teléfono debe ser un número" })
  phone: number;

  @IsString({ message: "El país debe ser una cadena de caracteres" })
  @MinLength(5, { message: "El país debe tener al menos 5 caracteres" })
  @MaxLength(20, { message: "El país no puede superar los 20 caracteres" })
  country: string;

  @IsString({ message: "La dirección debe ser una cadena de caracteres" })
  @MinLength(5, { message: "La dirección debe tener al menos 5 caracteres" })
  @MaxLength(80, { message: "La dirección no puede superar los 80 caracteres" })
  address: string;

  @IsString({ message: "La ciudad debe ser una cadena de caracteres" })
  @MinLength(5, { message: "La ciudad debe tener al menos 5 caracteres" })
  @MaxLength(20, { message: "La ciudad no puede superar los 20 caracteres" })
  city: string;
}
