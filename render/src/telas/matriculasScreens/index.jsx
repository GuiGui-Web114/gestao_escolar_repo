import React, { useState } from "react";
import "./index.css";

export default function Matriculas() {
  const [filtro, setFiltro] = useState("todas");

  const matriculas = [
    { ficha: "MAT-9081", candidato: "Anacleto Manuel", nivel: "7ª Classe", data: "10/09/2026", tipo: "Nova Matrícula", estado: "Pendente" },
    { ficha: "MAT-9082", candidato: "Esperança Paulo", nivel: "10ª Classe - TI", data: "09/09/2026", tipo: "Reconfirmação", estado: "Aprovado" },
    { ficha: "MAT-9083", candidato: "Filipe Domingos", nivel: "1ª Classe", data: "08/09/2026", tipo: "Nova Matrícula", estado: "Pendente" },
  ];

  return (
    <div className="page-container">
      <div className="page-action-bar">
        <div className="tabs-bar">
          <button className={`tab-btn ${filtro === 'todas' ? 'active' : ''}`} onClick={() => setFiltro('todas')}>Todas (42)</button>
          <button className={`tab-btn ${filtro === 'pendentes' ? 'active' : ''}`} onClick={() => setFiltro('pendentes')}>Pendentes (15)</button>
          <button className={`tab-btn ${filtro === 'aprovadas' ? 'active' : ''}`} onClick={() => setFiltro('aprovadas')}>Aprovadas (27)</button>
        </div>
        <button className="btn btn-primary">+ Nova Matrícula</button>
      </div>

      <div className="panel-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nº Ficha</th>
                <th>Candidato / Aluno</th>
                <th>Nível Solicitado</th>
                <th>Data Pedido</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Validação</th>
              </tr>
            </thead>
            <tbody>
              {matriculas.map((m) => (
                <tr key={m.ficha}>
                  <td><strong>{m.ficha}</strong></td>
                  <td>{m.candidato}</td>
                  <td>{m.nivel}</td>
                  <td>{m.data}</td>
                  <td><span className="type-tag">{m.tipo}</span></td>
                  <td>
                    <span className={`status-badge ${m.estado === 'Aprovado' ? 'success' : 'warning'}`}>
                      {m.estado}
                    </span>
                  </td>
                  <td>
                    {m.estado === 'Pendente' ? (
                      <div className="table-actions-inline">
                        <button className="btn-table approve">Aprovar</button>
                        <button className="btn-table reject">Rejeitar</button>
                      </div>
                    ) : (
                      <span className="text-muted">Concluído</span>
                    )}
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