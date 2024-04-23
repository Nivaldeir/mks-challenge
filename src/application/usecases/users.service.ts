import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as crypto from "crypto";
import { Users } from "src/domain/user";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}
  // async findAll(): Promise<Users[]> {
  //   const cached = await this.redisService.Get("users");
  //   if (cached) return JSON.parse(cached);
  //   const users = await this.usersRepository.find();
  //   await this.redisService.Set("movies", JSON.stringify(users));
  //   return users;
  // }
  async findUnique(input: { [key: string]: any }): Promise<Users> {
    const isExist = await this.usersRepository.findOneBy({
      ...input,
    });
    if (!isExist) throw new Error("Usuario não cadastrado");
    return isExist;
  }
  async create(input: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    const password = crypto
      .pbkdf2Sync(input.password, "20", 100, 64, "sha512")
      .toString("hex");

    const createdUser = await this.usersRepository.save({ ...input, password });
    return {
      createAt: createdUser.createdAt,
      email: createdUser.email,
      name: createdUser.name,
      updateAt: createdUser.updateAt,
    };
  }
}
