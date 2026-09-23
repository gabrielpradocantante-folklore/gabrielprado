import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient.js'

export default function Inicio() {
  const polaroids = [
    { id: 1, src: '/gabi1.jpg', rotacion: '-8deg', top: '10%', left: '5%' },
    { id: 2, src: '/gabi2.jpg', rotacion: '12deg', top: '15%', right: '5%' },
    { id: 3, src: '/gabi3.jpg', rotacion: '-15deg', bottom: '15%', left: '10%' },
    { id: 4, src: '/gabi4.jpg', rotacion: '7deg', bottom: '10%', right: '10%' },
    { id: 5, src: '/gabi5.jpg', rotacion: '0deg', bottom: '05%', right: '40%' },
    { id: 6, src: '/gabi6.jpg', rotacion: '0deg', top: '05%', right: '40%' },
  ]

  // --- ESTADOS ---
  const [nombreEscrito, setNombreEscrito] = useState('')
  const nombreCompleto = "Gabriel Prado"
  
  // Estados para las reseñas
  const [resenas, setResenas] = useState([])
  const [nuevaResena, setNuevaResena] = useState({ nombre: '', comentario: '' })
  const [resenaEnviada, setResenaEnviada] = useState(false)

  useEffect(() => {
    // 1. LÓGICA MÁQUINA DE ESCRIBIR
    let timeoutId;
    let intervaloId;

    const escribirNombre = () => {
      setNombreEscrito('');
      let i = 0;
      intervaloId = setInterval(() => {
        setNombreEscrito(nombreCompleto.slice(0, i + 1));
        i++;
        if (i === nombreCompleto.length) {
          clearInterval(intervaloId); 
        }
      }, 150); 
    };

    escribirNombre();
    const repeticionId = setInterval(() => {
      escribirNombre();
    }, 10000); 

    // 2. LÓGICA DE RESEÑAS
    fetchResenas();

    return () => {
      clearInterval(intervaloId);
      clearInterval(repeticionId);
      clearTimeout(timeoutId);
    };
  }, []);

  // --- FUNCIONES DE SUPABASE ---
  async function fetchResenas() {
    // Traemos solo las aprobadas para mostrarlas
    const { data } = await supabase
      .from('resenas')
      .select('*')
      .eq('aprobada', true)
      .order('created_at', { ascending: false })
    if (data) setResenas(data)
  }

  async function handleEnviarResena(e) {
    e.preventDefault()
    const { error } = await supabase.from('resenas').insert([nuevaResena])
    if (!error) {
      setResenaEnviada(true)
      setNuevaResena({ nombre: '', comentario: '' })
      setTimeout(() => setResenaEnviada(false), 5000)
    } else {
      alert("Hubo un error al enviar el mensaje.")
    }
  }

  return (
    <div>
      {/* SECCIÓN 1: HERO (Tu diseño personalizado) */}
      <div style={{ 
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#2d1b15',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Georgia", serif'
      }}>
        
        <style>
          {`
            @keyframes titilar {
              0% { opacity: 1; }
              50% { opacity: 0; }
              100% { opacity: 1; }
            }
            .cursor-maquina {
              animation: titilar 1s infinite;
              font-weight: normal;
              color: #d4af37;
              margin-left: 5px;
            }
          `}
        </style>

        {/* FONDO POLAROIDS */}
        {polaroids.map(polaroid => (
          <div key={polaroid.id} style={{
            position: 'absolute',
            top: polaroid.top, bottom: polaroid.bottom, left: polaroid.left, right: polaroid.right,
            transform: `rotate(${polaroid.rotacion})`,
            backgroundColor: '#fff',
            padding: '10px 10px 30px 10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            borderRadius: '2px',
            zIndex: 1,
            width: '200px',
            transition: 'transform 0.3s ease'
          }}>
            <img 
              src={polaroid.src} 
              alt="Momento folklórico" 
              style={{ width: '100%', height: 'auto', objectFit: 'cover', filter: 'sepia(30%)' }} 
            />
          </div>
        ))}

        {/* OVERLAY OSCURO */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(45, 27, 21, 0.6)',
          zIndex: 2
        }}></div>

        {/* CONTENIDO PRINCIPAL */}
        <div style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '40px',
          maxWidth: '800px'
        }}>
          
          <h1 style={{ 
            fontSize: '5rem', 
            color: '#f9f6f0', 
            margin: '0 0 10px 0',
            fontFamily: '"Brush Script MT", "Lucida Handwriting", cursive',
            textShadow: '2px 4px 8px rgba(0,0,0,0.6)',
            height: '90px', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {nombreEscrito}
            <span className="cursor-maquina">|</span>
          </h1>
          
          <h2 style={{ 
            fontSize: '1.8rem', 
            color: '#d4af37',
            fontStyle: 'italic',
            margin: '0 0 30px 0',
            textShadow: '1px 2px 4px rgba(0,0,0,0.8)'
          }}>
            La voz de nuestras raíces
          </h2>

          <div style={{ height: '2px', width: '100px', backgroundColor: '#8b3a3a', margin: '0 auto 30px auto' }}></div>

          <p style={{ 
            fontSize: '1.2rem', 
            color: '#f9f6f0', 
            lineHeight: '1.8',
            marginBottom: '40px',
            textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
          }}>
            La música de nuestra tierra, llevada a cada rincón. Acompañame en este viaje por las raíces de nuestro folklore, con la guitarra en mano y el corazón puesto en cada zamba, chacarera y chamamé.
          </p>

          {/* BOTONES */}
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/videos" style={{
              backgroundColor: '#8b3a3a', color: 'white', textDecoration: 'none', padding: '15px 30px', fontSize: '1rem', fontWeight: 'bold', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', border: '2px solid #8b3a3a'
            }}>
              Ver Videografía
            </Link>
            
            <Link to="/eventos" style={{
              backgroundColor: 'transparent', color: '#f9f6f0', textDecoration: 'none', padding: '15px 30px', fontSize: '1rem', fontWeight: 'bold', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '4px', border: '2px solid #f9f6f0'
            }}>
              Próximos Shows
            </Link>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: LIBRO DE VISITAS / RESEÑAS */}
      <div style={{ backgroundColor: '#f9f6f0', padding: '60px 20px', fontFamily: '"Georgia", serif', color: '#3e2723' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', margin: '0', textTransform: 'uppercase', letterSpacing: '2px' }}>El Fogón</h2>
            <p style={{ fontStyle: 'italic', color: '#666' }}>Mensajes de quienes nos acompañan en el camino</p>
            <div style={{ height: '3px', width: '60px', backgroundColor: '#8b3a3a', margin: '15px auto 0' }}></div>
          </div>

          {/* Carrusel de mensajes aprobados */}
          {resenas.length > 0 && (
            <div style={{ 
              display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px', 
              scrollbarWidth: 'thin', scrollbarColor: '#8b3a3a #e0e0e0', marginBottom: '40px'
            }}>
              {resenas.map(resena => (
                <div key={resena.id} style={{
                  minWidth: '280px', backgroundColor: '#fffcf9', padding: '25px', borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '1px solid #d7ccc8', borderTop: '4px solid #8b3a3a'
                }}>
                  <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '15px' }}>"{resena.comentario}"</p>
                  <p style={{ margin: 0, fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '13px', color: '#8b3a3a', textTransform: 'uppercase' }}>— {resena.nombre}</p>
                </div>
              ))}
            </div>
          )}

          {/* Formulario para dejar un mensaje */}
          <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fffcf9', padding: '30px', borderRadius: '8px', border: '1px solid #d7ccc8', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0, textAlign: 'center', color: '#3e2723' }}>Dejá tu mensaje</h3>
            {resenaEnviada ? (
               <p style={{ textAlign: 'center', color: '#155724', backgroundColor: '#d4edda', padding: '15px', borderRadius: '4px', border: '1px solid #c3e6cb' }}>¡Gracias! Tu mensaje fue enviado y está pendiente de moderación.</p>
            ) : (
              <form onSubmit={handleEnviarResena} style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: 'sans-serif' }}>
                <input type="text" placeholder="Tu Nombre o Apodo" required value={nuevaResena.nombre} onChange={(e) => setNuevaResena({...nuevaResena, nombre: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
                <textarea placeholder="Escribe un mensaje cortito..." required rows="3" maxLength="150" value={nuevaResena.comentario} onChange={(e) => setNuevaResena({...nuevaResena, comentario: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', resize: 'none' }}></textarea>
                <button type="submit" style={{ backgroundColor: '#2d1b15', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '1px' }}>Sumarme al fogón</button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  )
}