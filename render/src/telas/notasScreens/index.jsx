import React from "react";
import "./index.css";
export default function Notas() {
  const pauta = [
    { id: 1, aluno: "Mateus Silva", mac: 14, npp: 15, npt: 16, media: 15, resultado: "Aprovado" },
    { id: 2, aluno: "Beatriz Santos", mac: 9, npp: 10, npt: 8, media: 9, resultado: "Recurso" },
    { id: 3, aluno: "Carlos Eduardo", mac: 18, npp: 17, npt: 19, media: 18, resultado: "Aprovado" },
  ];

  return (
    <div className="page-container">
      {/* Filtros de Pauta */}
      <div className="panel-card filter-card">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Selecione a Turma</label>
            <select defaultValue="10A"><option value="10A">10ª Classe - TI A</option></select>
          </div>
          <div className="filter-group">
            <label>Disciplina</label>
            <select defaultValue="mat"><option value="mat">Matemática</option></select>
          </div>
          <div className="filter-group">
            <label>Trimestre</label>
            <select defaultValue="1"><option value="1">1º Trimestre</option></select>
          </div>
          <div className="filter-group btn-align">
            <button className="btn btn-secondary">Exportar Pauta PDF</button>
          </div>
        </div>
      </div>

      {/* Tabela de Lançamento de Notas */}
      <div className="panel-card">
        <div className="panel-header flex-between">
          <h3>Lançamento de Avaliações Contínuas</h3>
          <button className="btn btn-primary">Guardar Notas</button>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome do Aluno</th>
                <th>MAC (Contínua)</th>
                <th>NPP (Provas)</th>
                <th>NPT (Trimestral)</th>
                <th>Média Final</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {pauta.map((n) => (
                <tr key={n.id}>
                  <td><strong>{n.aluno}</strong></td>
                  <td><input type="number" className="grade-input" defaultValue={n.mac} /></td>
                  <td><input type="number" className="grade-input" defaultValue={n.npp} /></td>
                  <td><input type="number" className="grade-input" defaultValue={n.npt} /></td>
                  <td><strong>{n.media} Valores</strong></td>
                  <td>
                    <span className={`status-badge ${n.resultado === 'Aprovado' ? 'success' : 'danger'}`}>
                      {n.resultado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}