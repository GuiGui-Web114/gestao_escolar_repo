const Fastify = require("fastify");

const app = Fastify({
  logger: true
});

app.setErrorHandler((error, request, reply) => {
  if (error.name === "ZodError") {
    return reply.status(400).send({
      error: {
        code: "VALIDATION_ERROR",
        message: "Dados inválidos.",
        details: error.issues
      }
    });
  }

  const statusCode = error.statusCode || 500;

  return reply.status(statusCode).send({
    error: {
      code: "INTERNAL_ERROR",
      message:
        statusCode === 500
          ? "Erro interno do servidor."
          : error.message
    }
  });
});

app.get("/health", async () => {
  return {
    status: "ok",
    service: "school-management-api"
  };
});

app.register(
  require("./routes/ano-letivo.routes"),
  {
    prefix: "/api/v1/anos-letivos"
  }
);
app.register(
  require("./routes/classe.routes"),
  {
    prefix: "/api/v1/classes"
  }
);
app.register(
  require("./routes/turma.routes"),
  {
    prefix: "/api/v1/turmas"
  }
);
module.exports = app;