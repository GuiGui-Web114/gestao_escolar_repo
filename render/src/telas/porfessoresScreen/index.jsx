import React from "react";
import "./index.css";
export default function Professores() {
  const professores = [
    { id: "DOC-01", nome: "António Varela", disciplina: "Matemática & Física", turmas: "10ª TI A, 12ª Bioq", contacto: "+244 923 000 111", estado: "Efectivo" },
    { id: "DOC-02", nome: "Maria Fernandes", disciplina: "Língua Portuguesa", turmas: "7ª B, 8ª A", contacto: "+244 912 000 222", estado: "Efectivo" },
    { id: "DOC-03", nome: "Gabriel Kiala", disciplina: "Química Orgânica", turmas: "12ª Bioq", contacto: "+244 944 000 333", estado: "Licença" },
  ];

  return (
    <div className="page-container">
      <div className="page-action-bar">
        <div className="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Pesquisar docente ou disciplina..." />
        </div>
        <button className="btn btn-primary">+ Adicionar Professor</button>
      </div>

      <div className="panel-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Cód. Docente</th>
                <th>Nome do Professor</th>
                <th>Disciplinas</th>
                <th>Turmas Atribuídas</th>
                <th>Contacto</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {professores.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.id}</strong></td>
                  <td>{p.nome}</td>
                  <td>{p.disciplina}</td>
                  <td>{p.turmas}</td>
                  <td>{p.contacto}</td>
                  <td>
                    <span className={`status-badge ${p.estado === 'Efectivo' ? 'success' : 'warning'}`}>
                      {p.estado}
                    </span>
                  </td>
                  <td>
                    <button className="btn-link">Atribuir Turmas</button>
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