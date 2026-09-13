module.exports = {
  id: "008_create_aluno_encarregado",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS aluno_encarregado (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        aluno_id INTEGER NOT NULL,
        encarregado_id INTEGER NOT NULL,

        principal INTEGER NOT NULL DEFAULT 0
          CHECK (principal IN (0, 1)),

        observacao TEXT,

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (aluno_id)
          REFERENCES alunos(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,

        FOREIGN KEY (encarregado_id)
          REFERENCES encarregados(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT,

        UNIQUE (
          aluno_id,
          encarregado_id
        )
      );

      CREATE INDEX IF NOT EXISTS idx_aluno_encarregado_aluno
      ON aluno_encarregado(aluno_id);

      CREATE INDEX IF NOT EXISTS idx_aluno_encarregado_encarregado
      ON aluno_encarregado(encarregado_id);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS aluno_encarregado;
    `);
  }
};