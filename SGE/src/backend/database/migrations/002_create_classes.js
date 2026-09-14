module.exports = {
  id: "002_create_classes",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        nome TEXT NOT NULL UNIQUE,

        nivel INTEGER NOT NULL
          CHECK (nivel > 0),

        ordem INTEGER NOT NULL
          CHECK (ordem > 0),

        ativo INTEGER NOT NULL DEFAULT 1
          CHECK (ativo IN (0, 1)),

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_classes_ativo
      ON classes(ativo);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS classes;
    `);
  }
};