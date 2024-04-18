import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UsersDto } from "src/dtos/users.dto";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { UpdateUserDto } from "src/dtos/updateUsers.dto";
import { CreateAdminDto } from "src/dtos/createAdmin.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  getUserByUsername(name?: string) {
    return this.usersRepository.getUserByUsername(name);
  }

  getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }

  addUser(user: CreateUserDto) {
    return this.usersRepository.addUser(user);
  }

  updateUser(id: string, user: UpdateUserDto) {
    return this.usersRepository.updateUser(user, id);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
