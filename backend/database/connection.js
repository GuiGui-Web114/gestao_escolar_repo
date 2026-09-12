const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const databaseDir = path.join(__dirname, "../../../../data");

if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, {
    recursive: true
  });
}

const databasePath = path.join(databaseDir, "school.db");

const db = new Database(databasePath);

db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");

module.exports = db;