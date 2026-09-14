const { z } = require("zod");

const criarTurmaSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "Nome da turma é obrigatório")
    .max(20),

  classe_id: z
    .coerce
    .number()
    .int()
    .positive(),

  ano_letivo_id: z
    .coerce
    .number()
    .int()
    .positive(),

  sala: z
    .string()
    .trim()
    .max(50)
    .optional()
    .nullable(),

  turno: z.enum([
    "MANHA",
    "TARDE",
    "NOITE"
  ]),

  limite_alunos: z
    .coerce
    .number()
    .int()
    .positive()
    .optional()
    .nullable(),

  ativo: z
    .union([
      z.boolean(),
      z.coerce.number().int().min(0).max(1)
    ])
    .optional()
    .default(1)
});

const atualizarTurmaSchema = criarTurmaSchema;

const listarTurmasQuerySchema = z.object({
  ano_letivo_id: z.coerce
    .number()
    .int()
    .positive()
    .optional(),

  classe_id: z.coerce
    .number()
    .int()
    .positive()
    .optional(),

  ativo: z.coerce
    .number()
    .int()
    .min(0)
    .max(1)
    .optional()
});

const idSchema = z.coerce
  .number()
  .int()
  .positive();

module.exports = {
  criarTurmaSchema,
  atualizarTurmaSchema,
  listarTurmasQuerySchema,
  idSchema
};