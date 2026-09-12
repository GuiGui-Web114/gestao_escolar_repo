const db = require("./connection");

function executarTeste() {
  console.log("\n===== TESTE DA BASE DE DADOS =====\n");

  // 1. Escola
  const escola = db.prepare(`
    SELECT *
    FROM escola
  `).all();

  console.log("ESCOLA:");
  console.table(escola);

  // 2. Turmas
  const turmas = db.prepare(`
    SELECT
      t.id,
      t.nome AS turma,
      c.nome AS classe,
      a.nome AS ano_letivo,
      t.turno,
      t.sala
    FROM turmas t
    INNER JOIN classes c
      ON c.id = t.classe_id
    INNER JOIN anos_letivos a
      ON a.id = t.ano_letivo_id
    ORDER BY c.ordem, t.nome
  `).all();

  console.log("\nTURMAS:");
  console.table(turmas);

  // 3. Alunos matriculados
  const alunos = db.prepare(`
    SELECT
      a.id,
      a.codigo,
      a.nome_completo AS aluno,
      c.nome AS classe,
      t.nome AS turma,
      al.nome AS ano_letivo,
      m.numero_matricula,
      m.estado
    FROM matriculas m
    INNER JOIN alunos a
      ON a.id = m.aluno_id
    INNER JOIN classes c
      ON c.id = m.classe_id
    INNER JOIN turmas t
      ON t.id = m.turma_id
    INNER JOIN anos_letivos al
      ON al.id = m.ano_letivo_id
    ORDER BY a.nome_completo
  `).all();

  console.log("\nALUNOS MATRICULADOS:");
  console.table(alunos);

  // 4. Disciplinas e professores
  const disciplinas = db.prepare(`
    SELECT
      t.nome AS turma,
      c.nome AS classe,
      d.nome AS disciplina,
      p.nome_completo AS professor
    FROM turma_disciplinas td
    INNER JOIN turmas t
      ON t.id = td.turma_id
    INNER JOIN classes c
      ON c.id = t.classe_id
    INNER JOIN disciplinas d
      ON d.id = td.disciplina_id
    INNER JOIN professores p
      ON p.id = td.professor_id
    ORDER BY t.nome, d.nome
  `).all();

  console.log("\nDISCIPLINAS:");
  console.table(disciplinas);

  // 5. Notas
  const notas = db.prepare(`
    SELECT
      a.nome_completo AS aluno,
      d.nome AS disciplina,
      av.nome AS avaliacao,
      av.tipo,
      av.periodo,
      n.valor
    FROM notas n
    INNER JOIN alunos a
      ON a.id = n.aluno_id
    INNER JOIN avaliacoes av
      ON av.id = n.avaliacao_id
    INNER JOIN turma_disciplinas td
      ON td.id = av.turma_disciplina_id
    INNER JOIN disciplinas d
      ON d.id = td.disciplina_id
    ORDER BY a.nome_completo, d.nome
  `).all();

  console.log("\nNOTAS:");
  console.table(notas);

  console.log("\n===== TESTE CONCLUÍDO =====\n");
}

try {
  executarTeste();
} catch (error) {
  console.error("Erro ao testar banco:", error);
  process.exit(1);
}