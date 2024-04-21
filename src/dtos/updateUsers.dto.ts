import { PartialType, PickType } from "@nestjs/swagger";
import { CreateUserDto } from "./createUser.dto";

export class UpdateUserDto extends PartialType(
  PickType(CreateUserDto, [
    "name",
    "email",
    "password",
    "phone",
    "address",
    "country",
    "city",
  ])
) {}
