import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";
import { CacheRepository } from "src/application/repository/CacheRepository";
@Injectable()
export class RedisAdapter extends Redis {
  constructor() {
    super({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT!),
      password: process.env.REDIS_PASSWORD,
    });
    super.on("error", (err: Error) => {
      console.log("REDIS ERROR", err);
      process.exit(1);
    });
    super.on("connect", () => {
      console.log("[REDIS]: Connected");
    });
  }

  async Get(value: string): Promise<string | null> {
    return this.get(value);
  }
  async Set(key: string, value: string): Promise<void> {
    this.set(key, value, "EX", 30);
  }
}
