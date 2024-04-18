import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUserDto } from "src/dtos/authUser.dto";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { CreateAdminDto } from "src/dtos/createAdmin.dto";
import { ApiTags } from "@nestjs/swagger";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env.development" });

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAdminUser(@Body() user: CreateAdminDto) {
    user.role = Boolean(process.env.ADMIN_ROLE)
    user.name= process.env.ADMIN_USERNAME
    user.email= process.env.ADMIN_EMAIL
    user.password= process.env.ADMIN_PASSWORD
    return this.authService.createAdmin(user),"  Estamos del otro lado";
  }

  @Post("signup")
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @Get("signin")
  signIn(@Body() user: AuthUserDto) {
    return this.authService.signIn(user);
  }
}
