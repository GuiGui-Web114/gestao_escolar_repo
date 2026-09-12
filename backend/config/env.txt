const PORT = Number(process.env.PORT) || 3500;
const HOST = process.env.HOST || "0.0.0.0";
const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  PORT,
  HOST,
  NODE_ENV
};