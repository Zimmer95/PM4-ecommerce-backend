import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUserDto } from "src/dtos/authUser.dto";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getComprobation() {
    return "Estamos del otro lado";
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
