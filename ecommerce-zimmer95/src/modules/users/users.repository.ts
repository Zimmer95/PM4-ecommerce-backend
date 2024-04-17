import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dtos/createUser.dto";
import * as bcrypt from "bcrypt";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "src/dtos/updateUsers.dto";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ) {}

  async getUsers() {
    const foundUser = await this.usersRepository.find();
    const thisUser = foundUser.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      coutry: user.country,
      city: user.city,
      address: user.address,
      createdAt: user.createdAt,
    }));
    return thisUser;
  }

  async getUserById(id: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { id: id },
      relations: ["orders"],
    });

    if (!foundUser) {
      throw new NotFoundException("User not found");
    }

    const { password, role, ...thisUser } = foundUser;
    return thisUser;
  }

  async getUserByUsername(name?: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { name: name },
    });
    if (!foundUser) {
      throw new NotFoundException("User not found");
    }
    const { password, role, ...thisUser } = foundUser;

    return thisUser;
  }

  async getUserByEmail(email: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!foundUser) {
      throw new NotFoundException("User not found");
    }
    /* const { password, role, ...thisUser } = foundUser; */

    return foundUser;
  }

  async addUser(user: CreateUserDto) {
    const foundUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (foundUser) {
      throw new NotFoundException("The user is already registered");
    }

    const newUser = this.usersRepository.create(user);
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    if (!hashedPassword) {
      throw new BadRequestException("Password could not be hashed");
    }

    const now = new Date();
    newUser.createdAt = now;
    newUser.password = hashedPassword;

    const { role, ...thisUser } = await this.usersRepository.save(newUser);

    return thisUser;
  }

  async updateUser(user: UpdateUserDto, id: string) {
    const foundUser = await this.usersRepository.findOne({ where: { id: id } });
    if (!foundUser) {
      throw new BadRequestException("User not found");
    }
    const { password, role, ...thisUser } = foundUser;
    /*foundUser.address = address;
    foundUser.city = city;
    foundUser.country = country;
    foundUser.name = name;
    foundUser.phone = phone;*/

    Object.assign(thisUser, user);
    const updatedUser = await this.usersRepository.save(thisUser);

    return updatedUser;
  }
  async deleteUser(id: string) {
    return this.usersRepository.delete(id);
  }
}
