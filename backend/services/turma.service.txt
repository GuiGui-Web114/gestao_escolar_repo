const repository = require("../repositories/turma.repository");

const classeRepository = require("../repositories/classe.repository");
const anoLetivoRepository = require("../repositories/ano-letivo.repository");

async function listar(filtros) {
  return repository.listar(filtros);
}

async function buscarPorId(id) {
  const turma = repository.buscarPorId(id);

  if (!turma) {
    const error = new Error("Turma não encontrada.");
    error.statusCode = 404;
    throw error;
  }

  return turma;
}

async function validarClasse(classeId) {
  const classe = classeRepository.buscarPorId(classeId);

  if (!classe) {
    const error = new Error("Classe não encontrada.");
    error.statusCode = 404;
    throw error;
  }

  return classe;
}

async function validarAnoLetivo(anoLetivoId) {
  const anoLetivo = anoLetivoRepository.buscarPorId(
    anoLetivoId
  );

  if (!anoLetivo) {
    const error = new Error(
      "Ano letivo não encontrado."
    );

    error.statusCode = 404;
    throw error;
  }

  return anoLetivo;
}

async function criar(dados) {
  await validarClasse(dados.classe_id);
  await validarAnoLetivo(dados.ano_letivo_id);

  const existente = repository.buscarPorChave(
    dados.nome,
    dados.classe_id,
    dados.ano_letivo_id
  );

  if (existente) {
    const error = new Error(
      "Já existe essa turma para esta classe e ano letivo."
    );

    error.statusCode = 409;
    throw error;
  }

  return repository.criar(dados);
}

async function atualizar(id, dados) {
  await buscarPorId(id);

  await validarClasse(dados.classe_id);
  await validarAnoLetivo(dados.ano_letivo_id);

  const existente = repository.buscarPorChave(
    dados.nome,
    dados.classe_id,
    dados.ano_letivo_id
  );

  if (
    existente &&
    existente.id !== Number(id)
  ) {
    const error = new Error(
      "Já existe essa turma para esta classe e ano letivo."
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
      "Não foi possível remover a turma. Ela pode estar associada a matrículas."
    );

    err.statusCode = 409;
    throw err;
  }

  return {
    message: "Turma removida com sucesso."
  };
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover
};