const app = require("./app");
const { PORT, HOST } = require("./config/env");

async function start() {
  try {
    await app.listen({
      port: PORT,
      host: HOST
    });

    console.log(`API rodando em http://localhost:${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();