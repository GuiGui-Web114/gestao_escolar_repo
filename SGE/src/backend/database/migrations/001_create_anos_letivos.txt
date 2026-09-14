module.exports = {
  id: "001_create_anos_letivos",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS anos_letivos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        nome TEXT NOT NULL UNIQUE,

        data_inicio TEXT NOT NULL,
        data_fim TEXT NOT NULL,

        ativo INTEGER NOT NULL DEFAULT 0
          CHECK (ativo IN (0, 1)),

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS anos_letivos;
    `);
  }
};