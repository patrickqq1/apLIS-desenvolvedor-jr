const { z } = require("zod");

const pacienteSchema = z.object({
  nome: z.string().min(1, "Nome e obrigatorio"),
  data_nascimento: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Data de nascimento deve estar no formato YYYY-MM-DD",
    ),
  carteirinha: z.string().min(1, "Carteirinha e obrigatoria"),
  cpf: z
    .string()
    .regex(/^\d{11}$/, "CPF deve conter exatamente 11 digitos numericos"),
});

module.exports = pacienteSchema;
