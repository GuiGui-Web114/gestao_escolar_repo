module.exports = {
  id: "012_create_turma_disciplinas",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS turma_disciplinas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        turma_id INTEGER NOT NULL,
        disciplina_id INTEGER NOT NULL,
        professor_id INTEGER NOT NULL,

        carga_horaria INTEGER,

        ativo INTEGER NOT NULL DEFAULT 1
          CHECK (ativo IN (0, 1)),

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (turma_id)
          REFERENCES turmas(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT,

        FOREIGN KEY (disciplina_id)
          REFERENCES disciplinas(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT,

        FOREIGN KEY (professor_id)
          REFERENCES professores(id)
          ON UPDATE CASCADE
          ON DELETE RESTRICT,

        UNIQUE (
          turma_id,
          disciplina_id
        )
      );

      CREATE INDEX IF NOT EXISTS idx_turma_disciplinas_turma
      ON turma_disciplinas(turma_id);

      CREATE INDEX IF NOT EXISTS idx_turma_disciplinas_disciplina
      ON turma_disciplinas(disciplina_id);

      CREATE INDEX IF NOT EXISTS idx_turma_disciplinas_professor
      ON turma_disciplinas(professor_id);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS turma_disciplinas;
    `);
  }
};