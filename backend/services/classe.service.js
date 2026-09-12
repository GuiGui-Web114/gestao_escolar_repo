const repository = require("../repositories/classe.repository");

async function listar() {
  return repository.listar();
}

async function buscarPorId(id) {
  const classe = repository.buscarPorId(id);

  if (!classe) {
    const error = new Error(
      "Classe não encontrada."
    );

    error.statusCode = 404;
    throw error;
  }

  return classe;
}

async function criar(dados) {
  const existente = repository.buscarPorNome(
    dados.nome
  );

  if (existente) {
    const error = new Error(
      "Já existe uma classe com esse nome."
    );

    error.statusCode = 409;
    throw error;
  }

  return repository.criar(dados);
}

async function atualizar(id, dados) {
  await buscarPorId(id);

  const existente = repository.buscarPorNome(
    dados.nome
  );

  if (
    existente &&
    existente.id !== Number(id)
  ) {
    const error = new Error(
      "Já existe outra classe com esse nome."
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
      "Não foi possível remover a classe. Ela pode estar associada a uma turma."
    );

    err.statusCode = 409;
    throw err;
  }

  return {
    message: "Classe removida com sucesso."
  };
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};