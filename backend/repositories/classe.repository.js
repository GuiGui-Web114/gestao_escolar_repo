const db = require("../database/connection");

function listar() {
  return db.prepare(`
    SELECT
      id,
      nome,
      nivel,
      ordem,
      ativo,
      created_at,
      updated_at
    FROM classes
    ORDER BY ordem ASC
  `).all();
}

function buscarPorId(id) {
  return db.prepare(`
    SELECT
      id,
      nome,
      nivel,
      ordem,
      ativo,
      created_at,
      updated_at
    FROM classes
    WHERE id = ?
  `).get(id);
}

function buscarPorNome(nome) {
  return db.prepare(`
    SELECT
      id,
      nome,
      nivel,
      ordem,
      ativo,
      created_at,
      updated_at
    FROM classes
    WHERE nome = ?
  `).get(nome);
}

function criar(dados) {
  const resultado = db.prepare(`
    INSERT INTO classes (
      nome,
      nivel,
      ordem,
      ativo
    )
    VALUES (?, ?, ?, ?)
  `).run(
    dados.nome,
    dados.nivel,
    dados.ordem,
    dados.ativo ?? 1
  );

  return buscarPorId(resultado.lastInsertRowid);
}

function atualizar(id, dados) {
  db.prepare(`
    UPDATE classes
    SET
      nome = ?,
      nivel = ?,
      ordem = ?,
      ativo = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    dados.nome,
    dados.nivel,
    dados.ordem,
    dados.ativo,
    id
  );

  return buscarPorId(id);
}

function remover(id) {
  return db.prepare(`
    DELETE FROM classes
    WHERE id = ?
  `).run(id);
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorNome,
  criar,
  atualizar,
  remover
};