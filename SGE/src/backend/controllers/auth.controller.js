const service = require("../services/auth.service");

const {
  loginSchema
} = require("../validators/auth.validator");

async function login(request, reply) {
  const dados = loginSchema.parse(
    request.body
  );

  const utilizador = await service.login(
    dados.email,
    dados.password
  );

  const token = await reply.jwtSign({
    sub: utilizador.id,
    perfil: utilizador.perfil
  });

  return reply.send({
    data: {
      token,
      utilizador
    },
    message: "Login realizado com sucesso."
  });
}
async function me(request, reply) {
  const utilizador = await service.buscarPerfil(
    request.user.sub
  );

  return reply.send({
    data: utilizador
  });
}
module.exports = {
  login,me
};