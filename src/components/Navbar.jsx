import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; background: #2d1b15; display: flex; align-items: center; padding: 15px 30px; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .nav-links {
          display: flex; gap: 20px; width: 100%; justify-content: center;
        }
        .nav-item {
          color: #f9f6f0; text-decoration: none; font-weight: bold; letter-spacing: 1px; transition: color 0.3s;
        }
        .nav-item:hover { color: #d3b88e; }
        .menu-toggle {
          display: none; flex-direction: column; gap: 6px; background: transparent; border: none; cursor: pointer; margin-left: auto;
        }
        .menu-toggle span { width: 28px; height: 3px; background: #f9f6f0; border-radius: 2px; transition: all 0.3s ease-in-out; }

        @media (max-width: 768px) {
          .navbar { padding: 15px 20px; }
          .menu-toggle { display: flex; }
          .nav-links {
            position: absolute; top: 55px; left: 0; right: 0; background: #2d1b15; flex-direction: column; gap: 20px; padding: 0; height: 0; overflow: hidden; transition: height 0.3s ease-in-out; box-shadow: 0 10px 10px rgba(0,0,0,0.3); align-items: center;
          }
          .nav-links.abierto { height: 260px; padding: 25px 0; }
          .nav-item { font-size: 1.1rem; width: 100%; text-align: center; }
        }
      `}</style>

      <nav className="navbar">
        <div style={{ color: '#d3b88e', fontWeight: 'bold', letterSpacing: '2px', display: window.innerWidth <= 768 ? 'block' : 'none' }} className="mobile-logo">
          GABRIEL PRADO
        </div>

        <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)}>
          <span style={{ transform: menuAbierto ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0)' }}></span>
          <span style={{ opacity: menuAbierto ? 0 : 1 }}></span>
          <span style={{ transform: menuAbierto ? 'rotate(-45deg) translate(6px, -7px)' : 'rotate(0)' }}></span>
        </button>

        <div className={`nav-links ${menuAbierto ? 'abierto' : ''}`}>
          <Link to="/" className="nav-item" onClick={cerrarMenu}>INICIO</Link>
          <Link to="/biografia" className="nav-item" onClick={cerrarMenu}>BIOGRAFÍA</Link>
          <Link to="/videos" className="nav-item" onClick={cerrarMenu}>VIDEOS</Link>
          <Link to="/eventos" className="nav-item" onClick={cerrarMenu}>EVENTOS</Link>
          <Link to="/contacto" className="nav-item" onClick={cerrarMenu}>CONTACTO</Link>
        </div>
      </nav>
    </>
  )
}