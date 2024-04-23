import { Module } from "@nestjs/common";
import { UsersController } from "../../infra/controllers/users.controller";
import { UsersService } from "../usecases/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/domain/user";
import { RedisAdapter } from "src/infra/redis";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, RedisAdapter],
})
export class UsersModule {}
