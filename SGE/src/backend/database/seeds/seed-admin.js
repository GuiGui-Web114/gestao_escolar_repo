const db = require("../connection");

const {
  hashPassword
} = require("../../utils/password");

async function seedAdmin() {
  const email = "admin@sge.local";

  const existente = db
    .prepare(`
      SELECT id
      FROM utilizadores
      WHERE LOWER(email) = LOWER(?)
    `)
    .get(email);

  if (existente) {
    console.log(
      "[SEED] ADMIN já existe."
    );
    return;
  }

  const perfil = db
    .prepare(`
      SELECT id
      FROM perfis
      WHERE nome = 'ADMIN'
      LIMIT 1
    `)
    .get();

  if (!perfil) {
    throw new Error(
      "Perfil ADMIN não encontrado. Execute as migrations primeiro."
    );
  }

  const passwordHash =
    await hashPassword("Admin@123");

  db.prepare(`
    INSERT INTO utilizadores (
      nome,
      username,
      email,
      password_hash,
      perfil_id,
      ativo
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    "Administrador",
    "admin",
    email,
    passwordHash,
    perfil.id,
    1
  );

  console.log(
    "[SEED] ADMIN criado com sucesso."
  );
}

seedAdmin()
  .catch((error) => {
    console.error(
      "[SEED] Erro:",
      error
    );

    process.exit(1);
  });