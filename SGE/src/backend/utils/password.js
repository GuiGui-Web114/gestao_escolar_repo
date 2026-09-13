const argon2 = require("argon2");

async function hashPassword(password) {
  return argon2.hash(password);
}

async function verifyPassword(
  password,
  passwordHash
) {
  return argon2.verify(
    passwordHash,
    password
  );
}

module.exports = {
  hashPassword,
  verifyPassword
};