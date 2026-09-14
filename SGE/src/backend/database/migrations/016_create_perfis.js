module.exports = {
  id: "016_create_perfis",

  up(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS perfis (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        nome TEXT NOT NULL UNIQUE,

        descricao TEXT,

        ativo INTEGER NOT NULL DEFAULT 1
          CHECK (ativo IN (0, 1)),

        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    db.prepare(`
      INSERT OR IGNORE INTO perfis (
        nome,
        descricao
      )
      VALUES
        ('ADMIN', 'Administrador do sistema'),
        ('DIRECAO', 'Direção da escola'),
        ('SECRETARIA', 'Secretaria escolar'),
        ('PROFESSOR', 'Professor');
    `).run();
  },

  down(db) {
    db.exec(`
      DROP TABLE IF EXISTS perfis;
    `);
  }
};