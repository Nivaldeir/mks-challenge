import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  UsePipes,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { MovieService } from "../../application/usecases/movie.service";
import { Movie } from "src/domain/movies";
import { Response, response } from "express";
import { ZodValidationPipe } from "./schemas/zod-validate";
import { createdMovieSchema } from "./schemas/movie.schema";

@Controller("movies")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(@Res() response: Response) {
    const movies = await this.movieService.findAll();
    console.log(movies);
    return response.status(200).json(movies);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Movie> {
    return this.movieService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createdMovieSchema))
  create(@Body() movieData: InputCreateMovieDTO): Promise<Movie> {
    try {
      return this.movieService.create(movieData);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() movieData: Partial<InputCreateMovieDTO>
  ): Promise<Movie> {
    return this.movieService.update(id, movieData);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.movieService.delete(id);
  }
}
