module.exports = {
  id: "005_create_professores",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS professores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        codigo TEXT NOT NULL UNIQUE,
        nome_completo TEXT NOT NULL,

        data_nascimento TEXT,

        sexo TEXT
          CHECK (
            sexo IS NULL
            OR sexo IN ('M', 'F')
          ),

        telefone TEXT,
        email TEXT,
        morada TEXT,

        especialidade TEXT,

        ativo INTEGER NOT NULL DEFAULT 1
          CHECK (ativo IN (0, 1)),

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_professores_nome
      ON professores(nome_completo);

      CREATE INDEX IF NOT EXISTS idx_professores_ativo
      ON professores(ativo);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS professores;
    `);
  }
};