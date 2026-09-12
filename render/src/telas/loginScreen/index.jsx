import React, { useState } from "react";
import "./index.css";

function LoginScreen() {
    const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ phone, password });
  };

  return (
    <div className="login-container">
      {/* Lado Esquerdo: Imagem com Informações */}
      <div className="login-visual-side">
        <div className="visual-overlay">
          <div className="brand-header">
            <div className="logo-badge"><img src=""/> </div>
            <span className="brand-name">GET-School</span>
          </div>

          <div className="visual-content">
            <span className="badge-tag">GET-School</span>
            <h2>Sistema de gestão escolar.</h2>
            <p>
              tenha o controle da sua instituição na palma da mão.
            </p>

        
          </div> 
        </div>
      </div>

      {/* Lado Direito: Formulário */}
      <div className="login-form-side">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>LOGIN</h2>
            <p>Insira as suas credenciais para aceder ao sistema.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="phone">Número de Telefone</label>
              <input
                id="phone"
                type="tel"
                placeholder="+244 923 000 000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Palavra-passe</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <label className="remember-me">
                <input type="checkbox" /> Lembrar neste dispositivo
              </label>
              <a href="#forgot" className="forgot-link">
                Esqueceu a palavra-passe?
              </a>
            </div>

            <button type="submit" className="submit-btn">
              Entrar na Conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;