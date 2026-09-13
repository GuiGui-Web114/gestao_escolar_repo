const repository = require("../repositories/utilizador.repository");

const {
  verifyPassword
} = require("../utils/password");

async function login(email, password) {
  const utilizador = repository.buscarPorEmail(email);

  if (!utilizador) {
    const error = new Error(
      "Email ou password inválidos."
    );

    error.statusCode = 401;
    throw error;
  }

  if (!utilizador.ativo) {
    const error = new Error(
      "Utilizador desativado."
    );

    error.statusCode = 403;
    throw error;
  }

  const passwordValida = await verifyPassword(
    password,
    utilizador.password_hash
  );

  if (!passwordValida) {
    const error = new Error(
      "Email ou password inválidos."
    );

    error.statusCode = 401;
    throw error;
  }

  repository.atualizarUltimoLogin(
    utilizador.id
  );

  return {
    id: utilizador.id,
    nome: utilizador.nome,
    username: utilizador.username,
    email: utilizador.email,
    perfil_id: utilizador.perfil_id,
    perfil: utilizador.perfil
  };
}

async function buscarPerfil(id) {
  const utilizador = repository.buscarPorId(id);

  if (!utilizador) {
    const error = new Error(
      "Utilizador não encontrado."
    );

    error.statusCode = 404;
    throw error;
  }

  if (!utilizador.ativo) {
    const error = new Error(
      "Utilizador desativado."
    );

    error.statusCode = 403;
    throw error;
  }

  return {
    id: utilizador.id,
    nome: utilizador.nome,
    username: utilizador.username,
    email: utilizador.email,
    perfil_id: utilizador.perfil_id,
    perfil: utilizador.perfil
  };
}

module.exports = {
  login,
  buscarPerfil
};