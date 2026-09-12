const service = require("../services/classe.service");

const {
  criarClasseSchema,
  atualizarClasseSchema,
  idSchema
} = require("../validators/classe.validator");

async function listar(request, reply) {
  const dados = await service.listar();

  return reply.send({
    data: dados
  });
}

async function buscarPorId(request, reply) {
  const id = idSchema.parse(
    request.params.id
  );

  const classe = await service.buscarPorId(id);

  return reply.send({
    data: classe
  });
}

async function criar(request, reply) {
  const dados = criarClasseSchema.parse(
    request.body
  );

  const classe = await service.criar(dados);

  return reply.code(201).send({
    data: classe,
    message: "Classe criada com sucesso."
  });
}

async function atualizar(request, reply) {
  const id = idSchema.parse(
    request.params.id
  );

  const dados = atualizarClasseSchema.parse(
    request.body
  );

  const classe = await service.atualizar(
    id,
    dados
  );

  return reply.send({
    data: classe,
    message: "Classe atualizada com sucesso."
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