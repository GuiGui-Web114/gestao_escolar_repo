import React, { useState } from "react";
import "./index.css";

function CadastroEscolarScreens() {
  const [nomeEscola, setNomeEscola] = useState("");
  const [ensino, setEnsino] = useState("");
  const [email, setEmail] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);

  // Manipulação de Upload da Logo da Escola
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nomeEscola,
      ensino,
      email,
      phone,
      password,
      logoPreview,
    });
  };

  return (
    <div className="login-container">
      {/* Lado Esquerdo: Área Administrativa & Institucional */}
      <div className="login-visual-side">
        <div className="visual-overlay">
          <div className="brand-header">
            <div className="logo-badge">GS</div>
            <span className="brand-name">GET-School</span>
          </div>

          <div className="visual-content">
            <span className="badge-tag">Módulo Administrativo</span>
            <h2>Configure a sua instituição no GET-School</h2>
            <p>
              Centralize a gestão académica, secretaria, corpo docente e controlo
              financeiro num único painel institucional.
            </p>

            <div className="admin-features">
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Gestão de pautas e turmas automatizada</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Emissão de faturas, recibos e propinas</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Relatórios de desempenho e retenção</span>
              </div>
            </div>
          </div>

          <div className="security-footer">
            <small> Ambiente protegido. Dados encriptados de nível institucional.</small>
          </div>
        </div>
      </div>

      {/* Lado Direito: Formulário de Registo */}
      <div className="login-form-side">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>CADASTRO ESCOLAR</h2>
            <p>Insira os dados da sua instituição para criar o acesso.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Upload da Logo */}
            <div className="input-group">
              <label>Logo da Instituição</label>
              <div className="logo-upload-wrapper">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="logo-preview-img" />
                ) : (
                  <div className="logo-placeholder">Carregar Logo</div>
                )}
                <input
                  id="imglogoEscolar"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="file-input"
                />
              </div>
            </div>

            {/* Nome da Escola */}
            <div className="input-group">
              <label htmlFor="nomeEscola">Nome da Instituição</label>
              <input
                id="nomeEscola"
                type="text"
                placeholder="Ex: Colégio Agostinho Neto"
                value={nomeEscola}
                onChange={(e) => setNomeEscola(e.target.value)}
                required
              />
            </div>

            {/* Nível de Ensino */}
            <div className="input-group">
              <label htmlFor="ensino">Nível de Ensino</label>
              <select
                id="ensino"
                value={ensino}
                onChange={(e) => setEnsino(e.target.value)}
                required
              >
                <option value="">Selecione o nível...</option>
                <option value="primario">Ensino Primário</option>
                <option value="secundario">Ensino Secundário / IGB</option>
                <option value="tecnico">Ensino Técnico Profissional</option>
                <option value="superior">Ensino Superior</option>
                <option value="geral">Geral (Todos os Níveis)</option>
              </select>
            </div>

            {/* Linha Dupla: Email e Telefone */}
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="email">E-mail Institucional</label>
                <input
                  id="email"
                  type="email"
                  placeholder="secretaria@escola.co.ao"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Cadastrar Instituição
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroEscolarScreens;