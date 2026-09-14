module.exports = {
  id: "015_create_presencas",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS presencas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        aluno_id INTEGER NOT NULL,
        turma_disciplina_id INTEGER NOT NULL,

        data TEXT NOT NULL,

        estado TEXT NOT NULL
          CHECK (
            estado IN (
              'PRESENTE',
              'FALTA',
              'JUSTIFICADA'
            )
          ),

        observacao TEXT,

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (aluno_id)
          REFERENCES alunos(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,

        FOREIGN KEY (turma_disciplina_id)
          REFERENCES turma_disciplinas(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,

        UNIQUE (
          aluno_id,
          turma_disciplina_id,
          data
        )
      );

      CREATE INDEX IF NOT EXISTS idx_presencas_aluno
      ON presencas(aluno_id);

      CREATE INDEX IF NOT EXISTS idx_presencas_turma_disciplina
      ON presencas(turma_disciplina_id);

      CREATE INDEX IF NOT EXISTS idx_presencas_data
      ON presencas(data);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS presencas;
    `);
  }
};