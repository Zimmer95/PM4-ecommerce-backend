import { PickType, PartialType } from "@nestjs/swagger";
import { UsersDto } from "./users.dto";

export class CreateAdminDto extends PartialType(PickType(UsersDto, [
  "name",
  "email",
  "password",
])) {
  role: boolean;
}