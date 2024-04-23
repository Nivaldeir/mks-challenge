import { Module } from "@nestjs/common";
import { TokenService } from "../usecases/token.service";

@Module({
  controllers:[],
  imports:[],
  providers: [TokenService],
})
export class TokenModule {}
