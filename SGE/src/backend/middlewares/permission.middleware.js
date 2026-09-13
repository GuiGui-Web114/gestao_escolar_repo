function permitirPerfis(...perfisPermitidos) {
  return async (request, reply) => {
    const perfil = request.user.perfil;

    if (!perfisPermitidos.includes(perfil)) {
      return reply.status(403).send({
        error: {
          code: "FORBIDDEN",
          message: "Não tens permissão para executar esta operação."
        }
      });
    }
  };
}

module.exports = permitirPerfis;