module.exports = {
  id: "007_create_encarregados",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS encarregados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        nome_completo TEXT NOT NULL,

        parentesco TEXT,

        telefone TEXT NOT NULL,

        telefone_alternativo TEXT,

        email TEXT,

        profissao TEXT,

        morada TEXT,

        numero_documento TEXT,

        tipo_documento TEXT,

        ativo INTEGER NOT NULL DEFAULT 1
          CHECK (ativo IN (0, 1)),

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_encarregados_nome
      ON encarregados(nome_completo);

      CREATE INDEX IF NOT EXISTS idx_encarregados_telefone
      ON encarregados(telefone);
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS encarregados;
    `);
  }
};