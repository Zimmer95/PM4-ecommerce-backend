import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AuthUserDto } from "src/dtos/authUser.dto";

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { CreateAdminDto } from "src/dtos/createAdmin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(user: CreateUserDto) {
    return await this.usersService.addUser(user);
  }

  async signIn(authUser: AuthUserDto) {
    const user = await this.usersService.getUserByEmail(authUser.email);

    if (!user) {
      throw new BadRequestException("Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(
      authUser.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid username or password");
    }

    const role = () => {
      if (user.role) {
        return "admin";
      } else {
        return "user";
      }
    };

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: role(),
    };

    const token = this.jwtService.sign(userPayload);
    return {
      userId: user.id,
      success: "Successfully generated token",
      Token: token,
    };
  }
}
