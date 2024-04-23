import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "src/domain/movies";
import { RedisAdapter } from "src/infra/redis";
import { Repository } from "typeorm";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly redisService: RedisAdapter
  ) {}

  async findAll() {
    const cached = await this.redisService.get("movies");
    if (cached) return JSON.parse(cached);
    const movies = await this.movieRepository.find();
    await this.redisService.Set("movies", JSON.stringify(movies));
    return movies;
  }
  async create(input: InputCreateMovieDTO) {
    await this.redisService.Set("movies", null);
    const movieCreated = await this.movieRepository.save(input);
    return movieCreated;
  }
  async update(id: string, movieData: Partial<Movie>): Promise<Movie> {
    await this.movieRepository.update(id, movieData);
    await this.redisService.Set("movies", null);
    return this.movieRepository.findOneBy({
      id: id,
    });
  }
  async delete(id: string) {
    await this.movieRepository.delete({
      id,
    });
    await this.redisService.Set("movies", null);
  }
  async findOne(id: string): Promise<Movie> {
    return this.movieRepository.findOneBy({
      id: id,
    });
  }
}
