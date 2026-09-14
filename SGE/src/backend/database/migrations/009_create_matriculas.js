module.exports = {
  id: "009_create_matriculas",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS matriculas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        aluno_id INTEGER NOT NULL,
        ano_letivo_id INTEGER NOT NULL,
        classe_id INTEGER NOT NULL,
        turma_id INTEGER NOT NULL,

        numero_matricula TEXT NOT NULL,

        data_matricula TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        estado TEXT NOT NULL DEFAULT 'ATIVA'
          CHECK (
            estado IN (
              'ATIVA',
              'CONCLUIDA',
              'TRANSFERIDA',
              'ANULADA'
            )
          ),

        observacao TEXT,

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (aluno_id)
          REFERENCES alunos(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT,

        FOREIGN KEY (ano_letivo_id)
          REFERENCES anos_letivos(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT,

        FOREIGN KEY (classe_id)
          REFERENCES classes(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT,

        FOREIGN KEY (turma_id)
          REFERENCES turmas(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT,

        UNIQUE (
          numero_matricula,
          ano_letivo_id
        ),

        UNIQUE (
          aluno_id,
          ano_letivo_id
        )
      );

      CREATE INDEX IF NOT EXISTS idx_matriculas_aluno
      ON matriculas(aluno_id);

      CREATE INDEX IF NOT EXISTS idx_matriculas_ano
      ON matriculas(ano_letivo_id);

      CREATE INDEX IF NOT EXISTS idx_matriculas_turma
      ON matriculas(turma_id);

      CREATE INDEX IF NOT EXISTS idx_matriculas_classe
      ON matriculas(classe_id);

      CREATE INDEX IF NOT EXISTS idx_matriculas_estado
      ON matriculas(estado);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS matriculas;
    `);
  }
};