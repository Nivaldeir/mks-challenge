import { z } from "zod";

export const authSchema = z.object({
  email: z.string({
    message: "Email obrigatorio",
  }),
  password: z.string({
    message: "Senha obrigatorio",
  }),
});
