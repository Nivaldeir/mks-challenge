import { Module } from "@nestjs/common";
import { AuthController } from "../../infra/controllers/auth.controller";
import { AuthService } from "../usecases/auth.service";
import { UsersService } from "src/application/usecases/users.service";
import { TokenService } from "src/application/usecases/token.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/domain/user";
import { RedisAdapter } from "src/infra/redis";
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, TokenService, RedisAdapter],
})
export class AuthModule {}
