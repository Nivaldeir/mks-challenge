import { Body, Controller, Post, Res, UsePipes } from "@nestjs/common";
import { AuthService } from "../../application/usecases/auth.service";
import { Response } from "express";
import { ZodValidationPipe } from "./schemas/zod-validate";
import { authSchema } from "./schemas/auth.schema";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(authSchema))
  async signIn(@Res() response: Response, @Body() input: InputAuth) {
    const token = await this.authService.signIn(input);
    response.set("authorization", `Bearer ${token}`);
    return response.status(200).json({
      token,
    });
  }
}
