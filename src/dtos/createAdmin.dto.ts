import { PickType, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./createUser.dto";

export class CreateAdminDto extends PartialType(PickType(CreateUserDto, [
  "name",
  "email",
  "password",
])) {
  role: boolean;
}