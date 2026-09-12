import React from "react";
import "./index.css";

export default function Turmas() {
  const turmas = [
    { id: 1, nome: "10ª Classe - TI A", turno: "Manhã", director: "Prof. António Varela", ocupacao: 32, max: 35, sala: "Sala 04" },
    { id: 2, nome: "7ª Classe - B", turno: "Tarde", director: "Profa. Maria Fernandes", ocupacao: 35, max: 35, sala: "Sala 12" },
    { id: 3, nome: "12ª Classe - Bioquímica", turno: "Manhã", director: "Prof. Gabriel Kiala", ocupacao: 28, max: 30, sala: "Lab 02" },
    { id: 4, nome: "1ª Classe - B", turno: "Manhã", director: "Profa. Teresa Bento", ocupacao: 20, max: 25, sala: "Sala 01" },
  ];

  return (
    <div className="page-container">
      <div className="page-action-bar">
        <h2>Gestão de Turmas e Salões</h2>
        <button className="btn btn-primary">+ Criar Nova Turma</button>
      </div>

      <div className="cards-grid">
        {turmas.map((t) => (
          <div key={t.id} className="panel-card class-card">
            <div className="class-card-header">
              <h3>{t.nome}</h3>
              <span className="shift-badge">{t.turno}</span>
            </div>
            <div className="class-card-body">
              <p><strong>Director de Turma:</strong> {t.director}</p>
              <p><strong>Sala Atribuída:</strong> {t.sala}</p>

              <div className="occupancy-section">
                <div className="occupancy-label">
                  <span>Lotação de Alunos</span>
                  <strong>{t.ocupacao} / {t.max}</strong>
                </div>
                <div className="bar-bg">
                  <div
                    className={`bar-fill ${t.ocupacao === t.max ? 'purple' : 'blue'}`}
                    style={{ width: `${(t.ocupacao / t.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="class-card-footer">
              <button className="btn-link">Gerir Alunos</button>
              <button className="btn-link">Ver Pauta</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}