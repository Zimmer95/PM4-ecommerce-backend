import { PickType } from "@nestjs/swagger";
import { UsersDto } from "./users.dto";

export class CreateUserDto extends PickType(UsersDto, [
  "name",
  "email",
  "password",
  "phone",
  "country",
  "address",
  "city",
]) {}
