const db = require("../connection");

function seed() {
  const transaction = db.transaction(() => {
    // =========================
    // ESCOLA
    // =========================

    const escola = db.prepare(`
      INSERT INTO escola (
        nome,
        nome_curto,
        endereco,
        municipio,
        provincia,
        telefone,
        email,
        diretor_nome
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      "Escola Modelo de Angola",
      "EMA",
      "Luanda",
      "Luanda",
      "Luanda",
      "923000000",
      "info@ema.ao",
      "Carlos Manuel"
    );

    // =========================
    // ANO LETIVO
    // =========================

    const anoLetivo = db.prepare(`
      INSERT INTO anos_letivos (
        nome,
        data_inicio,
        data_fim,
        ativo
      )
      VALUES (?, ?, ?, ?)
    `).run(
      "2026/2027",
      "2026-09-01",
      "2027-07-31",
      1
    );

    // =========================
    // CONFIGURAÇÕES
    // =========================

    db.prepare(`
      INSERT INTO configuracoes_escola (
        escola_id,
        ano_letivo_padrao_id,
        periodo_atual,
        media_minima,
        faltas_maximas
      )
      VALUES (?, ?, ?, ?, ?)
    `).run(
      escola.lastInsertRowid,
      anoLetivo.lastInsertRowid,
      "I_TRIMESTRE",
      10,
      15
    );

    // =========================
    // CLASSES
    // =========================

    const criarClasse = db.prepare(`
      INSERT INTO classes (
        nome,
        nivel,
        ordem
      )
      VALUES (?, ?, ?)
    `);

    const classe10 = criarClasse.run(
      "10ª Classe",
      10,
      10
    );

    const classe11 = criarClasse.run(
      "11ª Classe",
      11,
      11
    );

    // =========================
    // TURMAS
    // =========================

    const criarTurma = db.prepare(`
      INSERT INTO turmas (
        nome,
        classe_id,
        ano_letivo_id,
        sala,
        turno,
        limite_alunos
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const turmaA = criarTurma.run(
      "A",
      classe10.lastInsertRowid,
      anoLetivo.lastInsertRowid,
      "Sala 10",
      "MANHA",
      35
    );

    criarTurma.run(
      "B",
      classe10.lastInsertRowid,
      anoLetivo.lastInsertRowid,
      "Sala 11",
      "MANHA",
      35
    );

    criarTurma.run(
      "A",
      classe11.lastInsertRowid,
      anoLetivo.lastInsertRowid,
      "Sala 20",
      "TARDE",
      30
    );

    // =========================
    // PROFESSORES
    // =========================

    const criarProfessor = db.prepare(`
      INSERT INTO professores (
        codigo,
        nome_completo,
        sexo,
        telefone,
        email,
        especialidade
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const professorMat = criarProfessor.run(
      "PROF-0001",
      "João Manuel",
      "M",
      "923111111",
      "joao@ema.ao",
      "Matemática"
    );

    const professorPort = criarProfessor.run(
      "PROF-0002",
      "Maria José",
      "F",
      "923222222",
      "maria@ema.ao",
      "Língua Portuguesa"
    );

    const professorIng = criarProfessor.run(
      "PROF-0003",
      "Carlos Pedro",
      "M",
      "923333333",
      "carlos@ema.ao",
      "Inglês"
    );

    // =========================
    // DISCIPLINAS
    // =========================

    const criarDisciplina = db.prepare(`
      INSERT INTO disciplinas (
        nome,
        codigo,
        carga_horaria
      )
      VALUES (?, ?, ?)
    `);

    const matematica = criarDisciplina.run(
      "Matemática",
      "MAT",
      4
    );

    const portugues = criarDisciplina.run(
      "Língua Portuguesa",
      "POR",
      4
    );

    const ingles = criarDisciplina.run(
      "Inglês",
      "ING",
      3
    );

    // =========================
    // ALUNOS
    // =========================

    const criarAluno = db.prepare(`
      INSERT INTO alunos (
        codigo,
        nome_completo,
        data_nascimento,
        sexo,
        telefone,
        nacionalidade
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const aluno1 = criarAluno.run(
      "ALUNO-0001",
      "João Bernardo",
      "2010-03-22",
      "M",
      "923444444",
      "Angolana"
    );

    const aluno2 = criarAluno.run(
      "ALUNO-0002",
      "Ana Maria",
      "2010-08-15",
      "F",
      "923555555",
      "Angolana"
    );

    // =========================
    // ENCARREGADOS
    // =========================

    const criarEncarregado = db.prepare(`
      INSERT INTO encarregados (
        nome_completo,
        parentesco,
        telefone,
        profissao,
        morada
      )
      VALUES (?, ?, ?, ?, ?)
    `);

    const encarregado1 = criarEncarregado.run(
      "António Bernardo",
      "Pai",
      "923666666",
      "Engenheiro",
      "Luanda"
    );

    const encarregado2 = criarEncarregado.run(
      "Maria Bernardo",
      "Mãe",
      "923777777",
      "Professora",
      "Luanda"
    );

    // =========================
    // ALUNO ↔ ENCARREGADO
    // =========================

    const relacionar = db.prepare(`
      INSERT INTO aluno_encarregado (
        aluno_id,
        encarregado_id,
        principal
      )
      VALUES (?, ?, ?)
    `);

    relacionar.run(
      aluno1.lastInsertRowid,
      encarregado1.lastInsertRowid,
      1
    );

    relacionar.run(
      aluno1.lastInsertRowid,
      encarregado2.lastInsertRowid,
      0
    );

    relacionar.run(
      aluno2.lastInsertRowid,
      encarregado2.lastInsertRowid,
      1
    );

    // =========================
    // MATRÍCULAS
    // =========================

    const matricular = db.prepare(`
      INSERT INTO matriculas (
        aluno_id,
        ano_letivo_id,
        classe_id,
        turma_id,
        numero_matricula
      )
      VALUES (?, ?, ?, ?, ?)
    `);

    matricular.run(
      aluno1.lastInsertRowid,
      anoLetivo.lastInsertRowid,
      classe10.lastInsertRowid,
      turmaA.lastInsertRowid,
      "MAT-2026-0001"
    );

    matricular.run(
      aluno2.lastInsertRowid,
      anoLetivo.lastInsertRowid,
      classe10.lastInsertRowid,
      turmaA.lastInsertRowid,
      "MAT-2026-0002"
    );

    // =========================
    // TURMA ↔ DISCIPLINA
    // =========================

    const adicionarDisciplina = db.prepare(`
      INSERT INTO turma_disciplinas (
        turma_id,
        disciplina_id,
        professor_id,
        carga_horaria
      )
      VALUES (?, ?, ?, ?)
    `);

    const turmaDisciplinaMat = adicionarDisciplina.run(
      turmaA.lastInsertRowid,
      matematica.lastInsertRowid,
      professorMat.lastInsertRowid,
      4
    );

    const turmaDisciplinaPort = adicionarDisciplina.run(
      turmaA.lastInsertRowid,
      portugues.lastInsertRowid,
      professorPort.lastInsertRowid,
      4
    );

    const turmaDisciplinaIng = adicionarDisciplina.run(
      turmaA.lastInsertRowid,
      ingles.lastInsertRowid,
      professorIng.lastInsertRowid,
      3
    );

    // =========================
    // AVALIAÇÕES
    // =========================

    const criarAvaliacao = db.prepare(`
      INSERT INTO avaliacoes (
        turma_disciplina_id,
        nome,
        tipo,
        periodo,
        data_avaliacao,
        peso,
        nota_maxima
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const nppMat = criarAvaliacao.run(
      turmaDisciplinaMat.lastInsertRowid,
      "NPP Matemática",
      "NPP",
      "I_TRIMESTRE",
      "2026-10-10",
      1,
      20
    );

    const ptMat = criarAvaliacao.run(
      turmaDisciplinaMat.lastInsertRowid,
      "PT Matemática",
      "PT",
      "I_TRIMESTRE",
      "2026-11-10",
      1,
      20
    );

    // =========================
    // NOTAS
    // =========================

    const criarNota = db.prepare(`
      INSERT INTO notas (
        aluno_id,
        avaliacao_id,
        valor
      )
      VALUES (?, ?, ?)
    `);

    criarNota.run(
      aluno1.lastInsertRowid,
      nppMat.lastInsertRowid,
      14
    );

    criarNota.run(
      aluno1.lastInsertRowid,
      ptMat.lastInsertRowid,
      16
    );

    criarNota.run(
      aluno2.lastInsertRowid,
      nppMat.lastInsertRowid,
      12
    );

    criarNota.run(
      aluno2.lastInsertRowid,
      ptMat.lastInsertRowid,
      15
    );

    // =========================
    // PRESENÇAS
    // =========================

    const criarPresenca = db.prepare(`
      INSERT INTO presencas (
        aluno_id,
        turma_disciplina_id,
        data,
        estado
      )
      VALUES (?, ?, ?, ?)
    `);

    criarPresenca.run(
      aluno1.lastInsertRowid,
      turmaDisciplinaMat.lastInsertRowid,
      "2026-09-10",
      "PRESENTE"
    );

    criarPresenca.run(
      aluno2.lastInsertRowid,
      turmaDisciplinaMat.lastInsertRowid,
      "2026-09-10",
      "FALTA"
    );
  });

  transaction();

  console.log("[SEED] Dados de teste inseridos.");
}

try {
  seed();
} catch (error) {
  console.error("[SEED] Erro:", error);
  process.exit(1);
}