module.exports = {
  id: "006_create_alunos",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        codigo TEXT NOT NULL UNIQUE,

        nome_completo TEXT NOT NULL,

        data_nascimento TEXT NOT NULL,

        sexo TEXT NOT NULL
          CHECK (
            sexo IN ('M', 'F')
          ),

        numero_documento TEXT UNIQUE,

        telefone TEXT,
        email TEXT,
        morada TEXT,

        nacionalidade TEXT DEFAULT 'Angolana',

        foto TEXT,

        ativo INTEGER NOT NULL DEFAULT 1
          CHECK (ativo IN (0, 1)),

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_alunos_nome
      ON alunos(nome_completo);

      CREATE INDEX IF NOT EXISTS idx_alunos_ativo
      ON alunos(ativo);

      CREATE INDEX IF NOT EXISTS idx_alunos_documento
      ON alunos(numero_documento);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS alunos;
    `);
  }
};