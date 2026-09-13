module.exports = {
  id: "014_create_notas",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS notas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        aluno_id INTEGER NOT NULL,
        avaliacao_id INTEGER NOT NULL,

        valor REAL NOT NULL
          CHECK (valor >= 0),

        observacao TEXT,

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (aluno_id)
          REFERENCES alunos(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,

        FOREIGN KEY (avaliacao_id)
          REFERENCES avaliacoes(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,

        UNIQUE (
          aluno_id,
          avaliacao_id
        )
      );

      CREATE INDEX IF NOT EXISTS idx_notas_aluno
      ON notas(aluno_id);

      CREATE INDEX IF NOT EXISTS idx_notas_avaliacao
      ON notas(avaliacao_id);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS notas;
    `);
  }
};