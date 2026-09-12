const repository = require("../repositories/ano-letivo.repository");

async function listar() {
  return repository.listar();
}

async function buscarPorId(id) {
  const anoLetivo = repository.buscarPorId(id);

  if (!anoLetivo) {
    const error = new Error("Ano letivo não encontrado.");
    error.statusCode = 404;
    throw error;
  }

  return anoLetivo;
}

async function criar(dados) {
  const existente = repository.buscarPorNome(dados.nome);

  if (existente) {
    const error = new Error(
      "Já existe um ano letivo com esse nome."
    );

    error.statusCode = 409;
    throw error;
  }

  return repository.criar(dados);
}

async function atualizar(id, dados) {
  await buscarPorId(id);

  const existente = repository.buscarPorNome(dados.nome);

  if (existente && existente.id !== Number(id)) {
    const error = new Error(
      "Já existe outro ano letivo com esse nome."
    );

    error.statusCode = 409;
    throw error;
  }

  return repository.atualizar(id, dados);
}

async function remover(id) {
  await buscarPorId(id);

  try {
    repository.remover(id);
  } catch (error) {
    const err = new Error(
      "Não foi possível remover o ano letivo."
    );

    err.statusCode = 409;
    throw err;
  }

  return {
    message: "Ano letivo removido com sucesso."
  };
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};