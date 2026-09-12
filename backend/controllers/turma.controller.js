const service = require("../services/turma.service");

const {
  criarTurmaSchema,
  atualizarTurmaSchema,
  listarTurmasQuerySchema,
  idSchema
} = require("../validators/turma.validator");

async function listar(request, reply) {
  const filtros = listarTurmasQuerySchema.parse(
    request.query
  );

  const dados = await service.listar(filtros);

  return reply.send({
    data: dados
  });
}

async function buscarPorId(request, reply) {
  const id = idSchema.parse(
    request.params.id
  );

  const turma = await service.buscarPorId(id);

  return reply.send({
    data: turma
  });
}

async function criar(request, reply) {
  const dados = criarTurmaSchema.parse(
    request.body
  );

  const turma = await service.criar(dados);

  return reply.code(201).send({
    data: turma,
    message: "Turma criada com sucesso."
  });
}

async function atualizar(request, reply) {
  const id = idSchema.parse(
    request.params.id
  );

  const dados = atualizarTurmaSchema.parse(
    request.body
  );

  const turma = await service.atualizar(
    id,
    dados
  );

  return reply.send({
    data: turma,
    message: "Turma atualizada com sucesso."
  });
}

async function remover(request, reply) {
  const id = idSchema.parse(
    request.params.id
  );

  const resultado = await service.remover(id);

  return reply.send(resultado);
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};