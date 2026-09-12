module.exports = {
  id: "004_create_disciplinas",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS disciplinas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        nome TEXT NOT NULL UNIQUE,

        codigo TEXT UNIQUE,

        carga_horaria INTEGER
          CHECK (
            carga_horaria IS NULL
            OR carga_horaria > 0
          ),

        ativo INTEGER NOT NULL DEFAULT 1
          CHECK (ativo IN (0, 1)),

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_disciplinas_ativo
      ON disciplinas(ativo);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS disciplinas;
    `);
  }
};