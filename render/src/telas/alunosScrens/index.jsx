import React, { useState } from "react";
import "./index.css";

export default function Alunos() {
  const [searchTerm, setSearchTerm] = useState("");

  const alunos = [
    { id: "ALU-2026-01", nome: "Mateus Silva", turma: "10ª Classe - TI A", turno: "Manhã", encarregado: "João Silva (+244 923 111 222)", estado: "Activo" },
    { id: "ALU-2026-02", nome: "Beatriz Santos", turma: "7ª Classe - B", turno: "Tarde", encarregado: "Maria Santos (+244 912 333 444)", estado: "Activo" },
    { id: "ALU-2026-03", nome: "Carlos Eduardo", turma: "12ª Classe - Bioquímica", turno: "Manhã", encarregado: "António Eduardo (+244 944 555 666)", estado: "Activo" },
    { id: "ALU-2026-04", nome: "Daniela Costa", turma: "1ª Classe - B", turno: "Manhã", encarregado: "Fernanda Costa (+244 933 777 888)", estado: "Inactivo" },
  ];

  return (
    <div className="page-container">
      <div className="page-action-bar">
        <div className="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            placeholder="Pesquisar por nome ou nº de processo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="action-buttons">
          <button className="btn btn-secondary">Filtrar Turma</button>
          <button className="btn btn-primary">+ Novo Aluno</button>
        </div>
      </div>

      <div className="panel-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nº Processo</th>
                <th>Nome Completo</th>
                <th>Turma / Classe</th>
                <th>Turno</th>
                <th>Encarregado de Educação</th>
                <th>Estado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.id}</strong></td>
                  <td>{item.nome}</td>
                  <td>{item.turma}</td>
                  <td>{item.turno}</td>
                  <td>{item.encarregado}</td>
                  <td>
                    <span className={`status-badge ${item.estado === 'Activo' ? 'success' : 'danger'}`}>
                      {item.estado}
                    </span>
                  </td>
                  <td>
                    <button className="btn-link">Ver Ficha</button>
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