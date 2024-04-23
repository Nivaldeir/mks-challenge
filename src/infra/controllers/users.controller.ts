import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UsePipes,
} from "@nestjs/common";
import { UsersService } from "../../application/usecases/users.service";
import { Response } from "express";
import { ZodValidationPipe } from "./schemas/zod-validate";
import { createdUserSchema } from "./schemas/user.schema";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createdUserSchema))
  async create(@Res() response: Response, @Body() input: InputCreateUserDTO) {
    const userCreated = this.userService.create(input);
    return response.status(200).json(userCreated);
  }
  @Get(":id")
  async findBy(@Res() response: Response, @Param("id") id: string) {
    const userCreated = this.userService.findUnique({ id });
    return response.status(200).json(userCreated);
  }
}
