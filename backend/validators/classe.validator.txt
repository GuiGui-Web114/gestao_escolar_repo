const { z } = require("zod");

const criarClasseSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "Nome da classe é obrigatório")
    .max(50),

  nivel: z
    .number()
    .int("O nível deve ser um número inteiro")
    .positive("O nível deve ser maior que zero"),

  ordem: z
    .number()
    .int("A ordem deve ser um número inteiro")
    .positive("A ordem deve ser maior que zero"),

  ativo: z
    .union([
      z.boolean(),
      z.number().int().min(0).max(1)
    ])
    .optional()
    .default(1)
});

const atualizarClasseSchema = criarClasseSchema;

const idSchema = z.coerce
  .number()
  .int()
  .positive();

module.exports = {
  criarClasseSchema,
  atualizarClasseSchema,
  idSchema
};