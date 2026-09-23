import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient.js'

export default function Eventos() {
  const [eventos, setEventos] = useState([])

  useEffect(() => {
    fetchEventos()
  }, [])

  async function fetchEventos() {
    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .order('fecha', { ascending: true })

    if (error) {
      console.error("Error cargando eventos:", error)
    } else {
      // Agregamos (data || []) por seguridad, para que nunca sea "null" y rompa el map
      setEventos(data || []) 
    }
  }

  // Función mejorada a prueba de errores
  const formatearFecha = (fechaString) => {
    if (!fechaString) return 'Fecha a confirmar';
    
    try {
      // Separamos el año, mes y día (Supabase guarda las fechas como YYYY-MM-DD)
      const partes = fechaString.split('-');
      if (partes.length !== 3) return fechaString; // Si no tiene ese formato, mostramos lo que haya
      
      // Armamos la fecha localmente para evitar errores de zona horaria
      const fecha = new Date(partes[0], partes[1] - 1, partes[2]);
      
      // Si la fecha es inválida, devolvemos un texto por defecto en lugar de romper la página
      if (isNaN(fecha.getTime())) return 'Fecha a confirmar';

      const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return fecha.toLocaleDateString('es-ES', opciones);
    } catch (e) {
      return 'Fecha a confirmar';
    }
  }

  return (
    <div style={{ backgroundColor: '#f9f6f0', minHeight: '100vh', padding: '40px 20px', fontFamily: '"Georgia", serif', color: '#3e2723' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Próximos Shows
          </h2>
          <div style={{ height: '3px', width: '80px', backgroundColor: '#8b3a3a', margin: '15px auto 0' }}></div>
        </div>

        {eventos.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', fontStyle: 'italic', color: '#666' }}>
            Pronto anunciaremos nuevas fechas...
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {eventos.map(evento => (
              <div key={evento.id} style={{ 
                backgroundColor: '#fffcf9', 
                borderLeft: '5px solid #8b3a3a', 
                padding: '25px', 
                borderRadius: '4px',
                boxShadow: '0 4px 10px rgba(62, 39, 35, 0.08)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '20px'
              }}>
                
                {/* Contenedor de Texto y Mapa */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#8b3a3a', textTransform: 'capitalize', fontFamily: 'sans-serif', fontSize: '14px', letterSpacing: '1px' }}>
                    {formatearFecha(evento.fecha)}
                  </p>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '1.6rem', color: '#3e2723' }}>{evento.titulo}</h3>
                  <p style={{ margin: '0 0 15px 0', color: '#666', fontStyle: 'italic', fontSize: '1.1rem' }}>📍 {evento.ciudad || 'Lugar a confirmar'}</p>
                  
                  {/* Mapa de Google integrado */}
                  {evento.ciudad && (
                    <div style={{ width: '100%', maxWidth: '400px', height: '150px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                      <iframe 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        loading="lazy" 
                        allowFullScreen 
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(evento.ciudad)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      ></iframe>
                    </div>
                  )}
                </div>
                
                {/* Botón de Entradas */}
                {evento.link_entradas && (
                  <a 
                    href={evento.link_entradas} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      backgroundColor: '#3e2723',
                      color: 'white',
                      padding: '12px 25px',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontFamily: 'sans-serif',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      border: '2px solid transparent',
                      marginTop: '5px'
                    }}
                  >
                    Comprar Entradas
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}