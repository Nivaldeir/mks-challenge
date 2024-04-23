import { z } from "zod";

export const createdMovieSchema = z
  .object({
    title: z.string({
      message: "Titulo obrigatorio",
    }),
    director: z.string({
      message: "Diretor obrigatorio",
    }),
    year: z.string({
      message: "Ano obrigatorio",
    }),
    gender: z.string({
      message: "Gênero obrigatorio",
    }),
    countryOfOrigin: z.string({
      message: "País de origem obrigatorio",
    }),
    language: z.string({
      message: "Idioma obrigatorio",
    }),
    duration: z.number().min(1, "Duração obrigatorio"),
  })
  .required();