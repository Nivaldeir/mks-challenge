import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class TokenService {
  generate(input: InputToken) {
    const token = jwt.sign(input.body, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: input.expiresIn,
    });
    return token;
  }
  verify(token: string) {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    return isValid;
  }
}
