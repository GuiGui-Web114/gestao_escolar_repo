const service = require("../services/ano-letivo.service");

const {
  criarAnoLetivoSchema,
  atualizarAnoLetivoSchema,
  idSchema
} = require("../validators/ano-letivo.validator");

async function listar(request, reply) {
  const dados = await service.listar();

  return reply.send({
    data: dados
  });
}

async function buscarPorId(request, reply) {
  const id = idSchema.parse(request.params.id);

  const anoLetivo = await service.buscarPorId(id);

  return reply.send({
    data: anoLetivo
  });
}

async function criar(request, reply) {
  const dados = criarAnoLetivoSchema.parse(request.body);

  const anoLetivo = await service.criar(dados);

  return reply.code(201).send({
    data: anoLetivo,
    message: "Ano letivo criado com sucesso."
  });
}

async function atualizar(request, reply) {
  const id = idSchema.parse(request.params.id);

  const dados = atualizarAnoLetivoSchema.parse(request.body);

  const anoLetivo = await service.atualizar(
    id,
    dados
  );

  return reply.send({
    data: anoLetivo,
    message: "Ano letivo atualizado com sucesso."
  });
}

async function remover(request, reply) {
  const id = idSchema.parse(request.params.id);

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