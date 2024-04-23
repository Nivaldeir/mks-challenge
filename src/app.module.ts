import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./application/modules/users.module";
import { join } from "path";
import { AuthModule } from "./application/modules/auth.module";
import { MovieModule } from "./application/modules/movie.module";
import { RedisAdapter } from "./infra/redis";
import { APP_PIPE } from "@nestjs/core";
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT!),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      logging: false,
      entities: [join(__dirname, "/domain/*{.ts,.js}")],
    }),
    UsersModule,
    AuthModule,
    MovieModule,
  ],
  controllers: [],
  providers: [
    RedisAdapter,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
