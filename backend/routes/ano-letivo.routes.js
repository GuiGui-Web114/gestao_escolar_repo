const controller = require("../controllers/ano-letivo.controller");

async function routes(app) {
  app.get(
    "/",
    controller.listar
  );

  app.get(
    "/:id",
    controller.buscarPorId
  );

  app.post(
    "/",
    controller.criar
  );

  app.put(
    "/:id",
    controller.atualizar
  );

  app.delete(
    "/:id",
    controller.remover
  );
}

module.exports = routes;