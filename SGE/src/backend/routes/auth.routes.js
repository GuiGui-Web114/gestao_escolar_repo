const controller = require("../controllers/auth.controller");
const autenticar = require("../middlewares/auth.middleware");

async function routes(app) {
  // Login - público
  app.post(
    "/login",
    controller.login
  );

  // Perfil do utilizador - protegido
  app.get(
    "/me",
    {
      preHandler: autenticar
    },
    controller.me
  );
}

module.exports = routes;