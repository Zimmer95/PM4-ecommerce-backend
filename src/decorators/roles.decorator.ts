import { SetMetadata } from "@nestjs/common";
import { Role } from "src/modules/auth/role.enum";

export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);
