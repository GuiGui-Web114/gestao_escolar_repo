module.exports = {
  id: "013_create_avaliacoes",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS avaliacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        turma_disciplina_id INTEGER NOT NULL,

        nome TEXT NOT NULL,

        tipo TEXT NOT NULL
          CHECK (
            tipo IN (
              'MAC',
              'NPP',
              'PP',
              'PT',
              'TESTE',
              'EXAME',
              'OUTRO'
            )
          ),

        periodo TEXT NOT NULL
          CHECK (
            periodo IN (
              'I_TRIMESTRE',
              'II_TRIMESTRE',
              'III_TRIMESTRE',
              'EXAME'
            )
          ),

        data_avaliacao TEXT,

        peso REAL NOT NULL DEFAULT 1
          CHECK (peso > 0),

        nota_maxima REAL NOT NULL DEFAULT 20
          CHECK (nota_maxima > 0),

        ativo INTEGER NOT NULL DEFAULT 1
          CHECK (ativo IN (0, 1)),

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (turma_disciplina_id)
          REFERENCES turma_disciplinas(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_avaliacoes_turma_disciplina
      ON avaliacoes(turma_disciplina_id);

      CREATE INDEX IF NOT EXISTS idx_avaliacoes_periodo
      ON avaliacoes(periodo);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS avaliacoes;
    `);
  }
};