const db = require("../database/connection");

function listar(filtros = {}) {
  let sql = `
    SELECT
      t.id,
      t.nome,
      t.classe_id,
      c.nome AS classe,
      t.ano_letivo_id,
      a.nome AS ano_letivo,
      t.sala,
      t.turno,
      t.limite_alunos,
      t.ativo,
      t.created_at,
      t.updated_at
    FROM turmas t
    INNER JOIN classes c
      ON c.id = t.classe_id
    INNER JOIN anos_letivos a
      ON a.id = t.ano_letivo_id
  `;

  const conditions = [];
  const params = [];

  if (filtros.ano_letivo_id) {
    conditions.push("t.ano_letivo_id = ?");
    params.push(filtros.ano_letivo_id);
  }

  if (filtros.classe_id) {
    conditions.push("t.classe_id = ?");
    params.push(filtros.classe_id);
  }

  if (filtros.ativo !== undefined) {
    conditions.push("t.ativo = ?");
    params.push(filtros.ativo);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  sql += `
    ORDER BY
      a.nome DESC,
      c.ordem ASC,
      t.nome ASC
  `;

  return db.prepare(sql).all(...params);
}

function buscarPorId(id) {
  return db.prepare(`
    SELECT
      t.id,
      t.nome,
      t.classe_id,
      c.nome AS classe,
      t.ano_letivo_id,
      a.nome AS ano_letivo,
      t.sala,
      t.turno,
      t.limite_alunos,
      t.ativo,
      t.created_at,
      t.updated_at
    FROM turmas t
    INNER JOIN classes c
      ON c.id = t.classe_id
    INNER JOIN anos_letivos a
      ON a.id = t.ano_letivo_id
    WHERE t.id = ?
  `).get(id);
}

function buscarPorChave(nome, classeId, anoLetivoId) {
  return db.prepare(`
    SELECT *
    FROM turmas
    WHERE nome = ?
      AND classe_id = ?
      AND ano_letivo_id = ?
  `).get(
    nome,
    classeId,
    anoLetivoId
  );
}

function criar(dados) {
  const resultado = db.prepare(`
    INSERT INTO turmas (
      nome,
      classe_id,
      ano_letivo_id,
      sala,
      turno,
      limite_alunos,
      ativo
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    dados.nome,
    dados.classe_id,
    dados.ano_letivo_id,
    dados.sala ?? null,
    dados.turno,
    dados.limite_alunos ?? null,
    dados.ativo ?? 1
  );

  return buscarPorId(resultado.lastInsertRowid);
}

function atualizar(id, dados) {
  db.prepare(`
    UPDATE turmas
    SET
      nome = ?,
      classe_id = ?,
      ano_letivo_id = ?,
      sala = ?,
      turno = ?,
      limite_alunos = ?,
      ativo = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    dados.nome,
    dados.classe_id,
    dados.ano_letivo_id,
    dados.sala ?? null,
    dados.turno,
    dados.limite_alunos ?? null,
    dados.ativo,
    id
  );

  return buscarPorId(id);
}

function remover(id) {
  return db.prepare(`
    DELETE FROM turmas
    WHERE id = ?
  `).run(id);
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorChave,
  criar,
  atualizar,
  remover
};