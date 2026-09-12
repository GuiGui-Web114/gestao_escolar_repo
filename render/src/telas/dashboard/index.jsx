import React, { useState } from "react";
import Alunos from "../alunosScrens";
import Matriculas from "../matriculasScreens";
import Turmas from "../TurmasScreens";
import Professores from "../porfessoresScreen";
import Notas from "../notasScreens";
import "./index.css";

// Ícones SVG minimalistas integrados
const Icons = {
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  LogOut: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  ),
  Students: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  FileText: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2"></rect>
      <line x1="12" y1="4" x2="12" y2="20"></line>
    </svg>
  ),
  Teachers: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
    </svg>
  ),
  Grades: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
};

export default function DashboardScreen() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Lista de Notificações Demonstrativas
  const notifications = [
    { id: 1, text: "15 novas matrículas pendentes de validação", time: "Há 10 min" },
    { id: 2, text: "Professor António submeteu as pautas da 10ª A", time: "Há 1 hora" },
    { id: 3, text: "Turma B1 de Informática atingiu limite de alunos", time: "Há 3 horas" },
  ];

  // Renderização Dinâmica de Telas
  const renderContent = () => {
    switch (activeMenu) {
      case "alunos":
        return <Alunos />;
      case "matriculas":
        return <Matriculas />;
      case "turmas":
        return <Turmas />;
      case "professores":
        return <Professores />;
      case "notas":
        return <Notas />;
      case "dashboard":
      default:
        return (
          <>
            {/* CARDS DE KPIS ESTATÍSTICOS */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon blue">
                  <Icons.Students />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Alunos Matriculados</span>
                  <h3 className="kpi-value">1,248</h3>
                  <small className="kpi-subtext positive">+12% em relação ao ano anterior</small>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon green">
                  <Icons.FileText />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Matrículas Novas (Este Mês)</span>
                  <h3 className="kpi-value">142</h3>
                  <small className="kpi-subtext">15 aguardando confirmação</small>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon purple">
                  <Icons.Users />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Turmas Ativas</span>
                  <h3 className="kpi-value">38</h3>
                  <small className="kpi-subtext">Manhã: 20 | Tarde: 18</small>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon orange">
                  <Icons.Teachers />
                </div>
                <div className="kpi-details">
                  <span className="kpi-label">Corpo Docente</span>
                  <h3 className="kpi-value">54</h3>
                  <small className="kpi-subtext">Professores Efetivos</small>
                </div>
              </div>
            </div>

            {/* SEÇÃO INFERIOR DE DADOS */}
            <div className="dashboard-grid">
              {/* DISTRIBUIÇÃO POR NÍVEL DE ENSINO */}
              <div className="panel-card">
                <div className="panel-header">
                  <h3>Distribuição de Alunos por Nível</h3>
                </div>
                <div className="progress-list">
                  <div className="progress-item">
                    <div className="progress-info">
                      <span>Ensino Primário (1ª à 6ª Classe)</span>
                      <strong>520 alunos</strong>
                    </div>
                    <div className="bar-bg">
                      <div className="bar-fill blue" style={{ width: "42%" }}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-info">
                      <span>Ensino Secundário Geral (7ª à 9ª)</span>
                      <strong>410 alunos</strong>
                    </div>
                    <div className="bar-bg">
                      <div className="bar-fill green" style={{ width: "33%" }}></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-info">
                      <span>Técnico Profissional (10ª à 13ª)</span>
                      <strong>318 alunos</strong>
                    </div>
                    <div className="bar-bg">
                      <div className="bar-fill purple" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RECENTES MATRÍCULAS / ENTRADAS */}
              <div className="panel-card">
                <div className="panel-header">
                  <h3>Últimas Matrículas Registadas</h3>
                </div>
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Aluno</th>
                        <th>Classe / Turma</th>
                        <th>Turno</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mateus Silva</td>
                        <td>10ª Classe - TI</td>
                        <td>Manhã</td>
                        <td><span className="status-badge success">Confirmado</span></td>
                      </tr>
                      <tr>
                        <td>Beatriz Santos</td>
                        <td>7ª Classe - A</td>
                        <td>Tarde</td>
                        <td><span className="status-badge warning">Pendente</span></td>
                      </tr>
                      <tr>
                        <td>Carlos Eduardo</td>
                        <td>12ª Classe - Bioquímica</td>
                        <td>Manhã</td>
                        <td><span className="status-badge success">Confirmado</span></td>
                      </tr>
                      <tr>
                        <td>Daniela Costa</td>
                        <td>1ª Classe - B</td>
                        <td>Manhã</td>
                        <td><span className="status-badge success">Confirmado</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      {/* MENU LATERAL (SIDEBAR) */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">GS</div>
          <span className="brand-title">GET-School</span>
        </div>

        <nav className="sidebar-menu">
          <button
            className={`menu-item ${activeMenu === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveMenu("dashboard")}
          >
            <Icons.Dashboard />
            <span>Painel Geral</span>
          </button>

          <button
            className={`menu-item ${activeMenu === "alunos" ? "active" : ""}`}
            onClick={() => setActiveMenu("alunos")}
          >
            <Icons.Students />
            <span>Alunos</span>
          </button>

          <button
            className={`menu-item ${activeMenu === "matriculas" ? "active" : ""}`}
            onClick={() => setActiveMenu("matriculas")}
          >
            <Icons.FileText />
            <span>Matrículas</span>
            <span className="menu-badge">15</span>
          </button>

          <button
            className={`menu-item ${activeMenu === "turmas" ? "active" : ""}`}
            onClick={() => setActiveMenu("turmas")}
          >
            <Icons.Users />
            <span>Turmas</span>
          </button>

          <button
            className={`menu-item ${activeMenu === "professores" ? "active" : ""}`}
            onClick={() => setActiveMenu("professores")}
          >
            <Icons.Teachers />
            <span>Professores</span>
          </button>

          <button
            className={`menu-item ${activeMenu === "notas" ? "active" : ""}`}
            onClick={() => setActiveMenu("notas")}
          >
            <Icons.Grades />
            <span>Notas & Pautas</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <small>Ano Lectivo: <strong>2025/2026</strong></small>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="main-wrapper">
        {/* HEADER */}
        <header className="header">
          <div className="header-title">
            <h1>
              {activeMenu === "dashboard" && "Painel Geral"}
              {activeMenu === "alunos" && "Gestão de Alunos"}
              {activeMenu === "matriculas" && "Gestão de Matrículas"}
              {activeMenu === "turmas" && "Gestão de Turmas"}
              {activeMenu === "professores" && "Gestão de Professores"}
              {activeMenu === "notas" && "Notas & Pautas"}
            </h1>
            <span>Visão académica e estatística da instituição</span>
          </div>

          <div className="header-actions">
            {/* SINO DE NOTIFICAÇÕES */}
            <div className="dropdown-container">
              <button
                className="icon-btn"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
              >
                <Icons.Bell />
                <span className="notification-dot"></span>
              </button>

              {showNotifications && (
                <div className="dropdown-menu notifications-dropdown">
                  <div className="dropdown-header">
                    <strong>Notificações</strong>
                    <span className="badge-count">3 novas</span>
                  </div>
                  <div className="dropdown-body">
                    {notifications.map((n) => (
                      <div key={n.id} className="notification-item">
                        <p>{n.text}</p>
                        <small>{n.time}</small>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* DROPDOWN DE PERFIL */}
            <div className="dropdown-container">
              <button
                className="profile-btn"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
              >
                <div className="avatar">AD</div>
                <div className="user-info">
                  <span className="user-name">Admin Geral</span>
                  <span className="user-role">Secretaria Central</span>
                </div>
              </button>

              {showProfileMenu && (
                <div className="dropdown-menu profile-dropdown">
                  <div className="profile-header-info">
                    <strong>Colégio Agostinho Neto</strong>
                    <small>admin@agostinhoneto.co.ao</small>
                  </div>
                  <hr />
                  <button className="dropdown-link">
                    <Icons.User /> Meu Perfil
                  </button>
                  <button className="dropdown-link">
                    <Icons.Settings /> Configurações
                  </button>
                  <hr />
                  <button className="dropdown-link logout">
                    <Icons.LogOut /> Sair do Sistema
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTEÚDO DINÂMICO */}
        <main className="content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}