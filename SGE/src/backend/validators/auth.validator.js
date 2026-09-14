const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email inválido"),

  password: z
    .string()
    .min(1, "Password é obrigatória")
});

module.exports = {
  loginSchema
};