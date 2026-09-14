
module.exports = {
  id: "011_create_configuracoes_escola",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS configuracoes_escola (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        escola_id INTEGER NOT NULL,

        ano_letivo_padrao_id INTEGER,

        periodo_atual TEXT DEFAULT 'I_TRIMESTRE'
          CHECK (
            periodo_atual IN (
              'I_TRIMESTRE',
              'II_TRIMESTRE',
              'III_TRIMESTRE'
            )
          ),

        media_minima REAL NOT NULL DEFAULT 10
          CHECK (media_minima >= 0),

        faltas_maximas INTEGER
          CHECK (
            faltas_maximas IS NULL
            OR faltas_maximas >= 0
          ),

        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (escola_id)
          REFERENCES escola(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,

        FOREIGN KEY (ano_letivo_padrao_id)
          REFERENCES anos_letivos(id)
          ON UPDATE CASCADE
          ON DELETE SET NULL,

        UNIQUE (escola_id)
      );
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS configuracoes_escola;
    `);
  }
};