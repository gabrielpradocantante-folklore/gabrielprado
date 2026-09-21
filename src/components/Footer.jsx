import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-container {
          background-color: #2d1b15;
          color: #d7ccc8;
          padding: 40px 20px 20px 20px;
          text-align: center;
          margin-top: auto;
          width: 100%;
        }
        
        .social-icons {
          display: flex;
          justify-content: center;
          gap: 25px;
          margin-bottom: 25px;
        }
        
        .social-icons a {
          color: #d7ccc8;
          transition: color 0.3s;
        }
        
        .social-icons a:hover {
          color: #d3b88e;
        }

        .social-icons svg {
          width: 34px;
          height: 34px;
        }

        .copy-text {
          margin: 0;
          font-size: 1.1rem;
        }

        .agape-section {
          margin-top: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }

        .agape-subtitle {
          font-size: 1.1rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          opacity: 0.8;
        }

        .agape-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #d3b88e;
        }

        .agape-logo img {
          height: 30px;
          width: auto;
        }

        .agape-logo strong {
          font-size: 1.4em;
          letter-spacing: 2px;
        }

        .admin-link-wrapper {
          margin-top: 10px;
          opacity: 0.4;
          transition: opacity 0.3s;
        }

        .admin-link-wrapper:hover {
          opacity: 1;
        }

        .admin-link {
          color: #d7ccc8;
          font-size: 0.95rem;
          text-decoration: none;
        }

        /* ====== AJUSTES PARA CELULARES Y TABLETS ====== */
        @media (max-width: 768px) {
          .footer-container {
            padding: 30px 15px 15px 15px; /* Reducimos el espacio de arriba */
          }
          
          .social-icons {
            gap: 20px; /* Juntamos un poco más los íconos */
            margin-bottom: 20px;
          }
          
          .social-icons svg {
            width: 26px; /* Achicamos los íconos */
            height: 26px;
          }

          .copy-text {
            font-size: 0.85rem; /* Achicamos el texto de derechos reservados */
          }

          .agape-subtitle {
            font-size: 0.85rem; /* Achicamos el subtítulo */
          }

          .agape-logo img {
            height: 24px; /* Achicamos el logo */
          }

          .agape-logo strong {
            font-size: 1.1em; /* Achicamos el nombre de Código Ágape */
          }
        }
      `}</style>

      <footer className="footer-container">
        
        {/* REDES SOCIALES */}
        <div className="social-icons">
          <a href="https://www.instagram.com/gabrielprado.oficial" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://facebook.com/tu_usuario" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          </a>
          <a href="https://www.youtube.com/@MQTVstream" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>

        <p className="copy-text">
          © {new Date().getFullYear()} Gabriel Prado. Todos los derechos reservados.
        </p>
        
        {/* SECCIÓN CÓDIGO ÁGAPE CON TU IMAGEN */}
        <div className="agape-section">
          <span className="agape-subtitle">
            Desarrollo Web con Propósito
          </span>
          <div className="agape-logo">
            <img src="/logo.png" alt="Logo Código Ágape" />
            <strong>CÓDIGO ÁGAPE</strong>
          </div>
        </div>

        {/* ENLACE OCULTO AL ADMIN */}
        <div className="admin-link-wrapper">
          <Link to="/admin" className="admin-link">Admin</Link>
        </div>

      </footer>
    </>
  )
}