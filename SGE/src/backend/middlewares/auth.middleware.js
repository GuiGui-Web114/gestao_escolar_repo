async function autenticar(request, reply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({
      error: {
        code: "UNAUTHORIZED",
        message: "Não autenticado."
      }
    });
  }
}

module.exports = autenticar;