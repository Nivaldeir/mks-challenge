import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { TokenService } from "src/application/usecases/token.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly exceptions = ["/movies"];
  constructor(private readonly tokenService: TokenService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (!this.exceptions.includes(req.baseUrl)) {
      return next();
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Usuario não autenticado" });
    }
    try {
      const decoded = this.tokenService.verify(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token invalido" });
    }
  }
}
