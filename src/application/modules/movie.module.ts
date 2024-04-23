import { MiddlewareConsumer, Module } from "@nestjs/common";
import { MovieController } from "../../infra/controllers/movie.controller";
import { MovieService } from "../usecases/movie.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "src/domain/movies";
import { AuthMiddleware } from "src/infra/controllers/auth.middlware";
import { TokenService } from "src/application/usecases/token.service";
import { RedisAdapter } from "src/infra/redis";

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService, TokenService, RedisAdapter],
})
export class MovieModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
