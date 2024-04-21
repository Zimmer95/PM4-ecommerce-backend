import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "./createUser.dto";

export class AuthUserDto extends PickType(CreateUserDto, [
  "email",
  "password",
]) {}
