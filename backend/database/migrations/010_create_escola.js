module.exports = {
  id: "010_create_escola",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS escola (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        nome TEXT NOT NULL,
        nome_curto TEXT,

        nif TEXT,
        numero_processo TEXT,
        numero_licenca TEXT,

        endereco TEXT,
        municipio TEXT,
        provincia TEXT,
        pais TEXT NOT NULL DEFAULT 'Angola',

        telefone TEXT,
        email TEXT,
        website TEXT,

        diretor_nome TEXT,

        logotipo TEXT,

        ativo INTEGER NOT NULL DEFAULT 1
          CHECK (ativo IN (0, 1)),

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS escola;
    `);
  }
};