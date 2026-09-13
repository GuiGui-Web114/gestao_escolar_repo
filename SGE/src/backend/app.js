const Fastify = require("fastify");
const jwt = require("@fastify/jwt");

const { JWT_SECRET } = require("./config/env");

const app = Fastify({
  logger: true
});

app.register(jwt, {
  secret: JWT_SECRET
});

app.get("/health", async () => {
  return {
    status: "ok",
    service: "school-management-api"
  };
});

app.register(
  require("./routes/auth.routes"),
  {
    prefix: "/api/v1/auth"
  }
);

// Grupo de rotas protegidas
app.register(async function (privateRoutes) {
  privateRoutes.addHook(
    "preHandler",
    async (request, reply) => {
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
  );

  privateRoutes.register(
    require("./routes/ano-letivo.routes"),
    {
      prefix: "/anos-letivos"
    }
  );

  privateRoutes.register(
    require("./routes/classe.routes"),
    {
      prefix: "/classes"
    }
  );

  privateRoutes.register(
    require("./routes/turma.routes"),
    {
      prefix: "/turmas"
    }
  );
}, {
  prefix: "/api/v1"
});

module.exports = app;