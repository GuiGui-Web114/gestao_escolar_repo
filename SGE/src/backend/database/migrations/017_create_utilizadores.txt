module.exports = {
  id: "017_create_utilizadores",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS utilizadores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        nome TEXT NOT NULL,

        username TEXT NOT NULL UNIQUE,

        email TEXT UNIQUE,

        password_hash TEXT NOT NULL,

        perfil_id INTEGER NOT NULL,

        ativo INTEGER NOT NULL DEFAULT 1
          CHECK (ativo IN (0, 1)),

        ultimo_login TEXT,

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (perfil_id)
          REFERENCES perfis(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT
      );

      CREATE INDEX IF NOT EXISTS idx_utilizadores_perfil
      ON utilizadores(perfil_id);

      CREATE INDEX IF NOT EXISTS idx_utilizadores_ativo
      ON utilizadores(ativo);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS utilizadores;
    `);
  }
};