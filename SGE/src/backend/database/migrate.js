const fs = require("fs");
const path = require("path");

const db = require("./connection");

const migrationsPath = path.join(
  __dirname,
  "migrations"
);

function createMigrationsTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      executed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

function getExecutedMigrations() {
  return db
    .prepare(`
      SELECT name
      FROM migrations
      ORDER BY id ASC
    `)
    .all()
    .map((migration) => migration.name);
}

function getMigrationFiles() {
  return fs
    .readdirSync(migrationsPath)
    .filter((file) => file.endsWith(".js"))
    .sort();
}

function runMigrations() {
  createMigrationsTable();

  const executedMigrations = getExecutedMigrations();
  const migrationFiles = getMigrationFiles();

  for (const file of migrationFiles) {
    const migration = require(
      path.join(migrationsPath, file)
    );

    if (executedMigrations.includes(migration.id)) {
      continue;
    }

    const transaction = db.transaction(() => {
      migration.up(db);

      db.prepare(`
        INSERT INTO migrations (name)
        VALUES (?)
      `).run(migration.id);
    });

    transaction();

    console.log(`[MIGRATION] ${migration.id} executada`);
  }

  console.log("[MIGRATION] Banco atualizado.");
}

try {
  runMigrations();
} catch (error) {
  console.error("[MIGRATION] Erro:", error);
  process.exit(1);
}