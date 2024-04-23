import { Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenService } from "src/application/usecases/token.service";
import { UsersService } from "src/application/usecases/users.service";
import * as crypto from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService
  ) {}
  async signIn(input: InputAuth) {
    const user = await this.userService.findUnique({ email: input.email });
    const isMatch = crypto
      .pbkdf2Sync(input.password, "20", 100, 64, "sha512")
      .toString("hex");
    if (isMatch != user.password) throw new UnauthorizedException();
    const token = this.tokenService.generate({
      body: {
        email: user.email,
        id: user.id,
      },
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }
}
