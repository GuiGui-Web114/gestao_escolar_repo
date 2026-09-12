const db = require("../database/connection");

function listar() {
  return db.prepare(`
    SELECT
      id,
      nome,
      data_inicio,
      data_fim,
      ativo,
      created_at,
      updated_at
    FROM anos_letivos
    ORDER BY nome DESC
  `).all();
}

function buscarPorId(id) {
  return db.prepare(`
    SELECT
      id,
      nome,
      data_inicio,
      data_fim,
      ativo,
      created_at,
      updated_at
    FROM anos_letivos
    WHERE id = ?
  `).get(id);
}

function buscarPorNome(nome) {
  return db.prepare(`
    SELECT *
    FROM anos_letivos
    WHERE nome = ?
  `).get(nome);
}

function criar(dados) {
  const resultado = db.prepare(`
    INSERT INTO anos_letivos (
      nome,
      data_inicio,
      data_fim,
      ativo
    )
    VALUES (?, ?, ?, ?)
  `).run(
    dados.nome,
    dados.data_inicio,
    dados.data_fim,
    dados.ativo ?? 0
  );

  return buscarPorId(resultado.lastInsertRowid);
}

function atualizar(id, dados) {
  db.prepare(`
    UPDATE anos_letivos
    SET
      nome = ?,
      data_inicio = ?,
      data_fim = ?,
      ativo = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    dados.nome,
    dados.data_inicio,
    dados.data_fim,
    dados.ativo,
    id
  );

  return buscarPorId(id);
}

function remover(id) {
  return db.prepare(`
    DELETE FROM anos_letivos
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