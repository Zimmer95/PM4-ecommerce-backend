import { PickType } from "@nestjs/swagger";
import { UsersDto } from "./users.dto";

export class AuthUserDto extends PickType(UsersDto, ["email", "password"]) {}
