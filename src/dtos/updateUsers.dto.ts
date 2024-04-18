import { PartialType, PickType } from "@nestjs/swagger";
import { UsersDto } from "./users.dto";

export class UpdateUserDto extends PartialType(
  PickType(UsersDto, [
    "name",
    "email",
    "password",
    "phone",
    "address",
    "country",
    "city",
  ])
) {}
