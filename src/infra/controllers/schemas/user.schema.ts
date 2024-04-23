import { z } from "zod";

export const createdUserSchema = z
  .object({
    name: z.string({ message: "Nome obrigatorio" }),
    email: z.string().email("Email invalido"),
    password: z
      .string()
      .min(8, "A Senha deve conter um minimo de 8 caracteres"),
  })
  .required();
