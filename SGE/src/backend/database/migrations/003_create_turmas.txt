module.exports = {
  id: "003_create_turmas",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS turmas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        nome TEXT NOT NULL,

        classe_id INTEGER NOT NULL,
        ano_letivo_id INTEGER NOT NULL,

        sala TEXT,

        turno TEXT NOT NULL
          CHECK (
            turno IN (
              'MANHA',
              'TARDE',
              'NOITE'
            )
          ),

        limite_alunos INTEGER
          CHECK (
            limite_alunos IS NULL
            OR limite_alunos > 0
          ),

        ativo INTEGER NOT NULL DEFAULT 1
          CHECK (ativo IN (0, 1)),

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (classe_id)
          REFERENCES classes(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT,

        FOREIGN KEY (ano_letivo_id)
          REFERENCES anos_letivos(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT,

        UNIQUE (
          nome,
          classe_id,
          ano_letivo_id
        )
      );

      CREATE INDEX IF NOT EXISTS idx_turmas_classe
      ON turmas(classe_id);

      CREATE INDEX IF NOT EXISTS idx_turmas_ano_letivo
      ON turmas(ano_letivo_id);

      CREATE INDEX IF NOT EXISTS idx_turmas_ativo
      ON turmas(ativo);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS turmas;
    `);
  }
};