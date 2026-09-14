const PORT = Number(process.env.PORT) || 3500;
const HOST = process.env.HOST || "0.0.0.0";

const JWT_SECRET =
  process.env.JWT_SECRET || "sge-dev-secret-change-me";

module.exports = {
  PORT,
  HOST,
  JWT_SECRET
};