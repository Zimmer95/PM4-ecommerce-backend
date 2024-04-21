import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { UpdateUserDto } from "src/dtos/updateUsers.dto";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";
import { Role } from "../auth/role.enum";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @ApiQuery({ name: "name", required: false })
  getUsers(@Param("name") name?: string) {
    if (name) {
      return this.usersService.getUserByUsername(name);
    }
    return this.usersService.getUsers();
  }

  @Get(":id")
  @UseGuards(RolesGuard)
  @Roles(Role.admin && Role.user)
  getUserById(@Param("id", ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  addUser(@Body() user: CreateUserDto) {
    return this.usersService.addUser(user);
  }
  
  @Put(":id")
  @UseGuards(RolesGuard)
  @Roles(Role.admin && Role.user)
  updateUser(@Param("id") id: string, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(":id")
  @UseGuards(RolesGuard)
  @Roles(Role.admin && Role.user)
  deleteUser(@Param("id", ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
