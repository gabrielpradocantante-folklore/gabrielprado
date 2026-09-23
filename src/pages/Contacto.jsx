import { useState } from 'react'
import { supabase } from '../services/supabase.js'

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    mail: '', // Ajustado a tu columna 'mail'
    mensaje: ''
  })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Le agregamos la fecha del momento en que envían el mensaje
    const datosAEnviar = {
      ...formData,
      fecha: new Date().toISOString()
    }
    
    // Apuntamos a tu tabla original
    const { error } = await supabase.from('mensajes_contacto').insert([datosAEnviar])
    
    if (error) {
      alert("Error al enviar el mensaje: " + error.message)
    } else {
      setEnviado(true)
      setFormData({ nombre: '', mail: '', mensaje: '' })
      setTimeout(() => setEnviado(false), 5000) 
    }
  }

  return (
    <div style={{ backgroundColor: '#f9f6f0', minHeight: '100vh', padding: '40px 20px', fontFamily: '"Georgia", serif', color: '#3e2723' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Contrataciones
          </h2>
          <div style={{ height: '3px', width: '80px', backgroundColor: '#8b3a3a', margin: '15px auto 0' }}></div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', backgroundColor: '#fffcf9', padding: '40px', borderRadius: '8px', boxShadow: '0 8px 16px rgba(62, 39, 35, 0.05)', border: '1px solid #d7ccc8' }}>
          
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ fontSize: '1.8rem', color: '#8b3a3a', marginTop: '0' }}>Trabajemos Juntos</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#4e342e', marginBottom: '30px' }}>
              Para contrataciones en festivales, peñas o eventos privados, completa el formulario y nuestro equipo se pondrá en contacto.
            </p>
            
            <div style={{ marginBottom: '30px' }}>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>📧 contrataciones@gabrielprado.com</p>
            </div>

            <div style={{ padding: '20px', backgroundColor: '#f4ede4', borderRadius: '8px', borderLeft: '4px solid #3e2723' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#3e2723' }}>Material para Productores</h4>
              <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: '#666' }}>Descarga nuestro rider técnico, requerimientos de escenario y fotos.</p>
              <a href="/presskit.pdf" download style={{ display: 'inline-block', backgroundColor: '#3e2723', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '12px', textTransform: 'uppercase' }}>
                ⬇ Descargar Press Kit
              </a>
            </div>
          </div>

          <div style={{ flex: '1 1 400px' }}>
            {enviado ? (
              <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #c3e6cb' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>¡Mensaje Enviado!</h4>
                <p style={{ margin: '0' }}>Gracias por comunicarte. Te responderemos muy pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: 'sans-serif' }}>
                <input type="text" name="nombre" placeholder="Nombre completo o Productora" value={formData.nombre} onChange={handleChange} required style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px' }} />
                
                <input type="email" name="mail" placeholder="Correo Electrónico" value={formData.mail} onChange={handleChange} required style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px' }} />
                
                <textarea name="mensaje" placeholder="Déjanos tu propuesta..." value={formData.mensaje} onChange={handleChange} required rows="5" style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px', resize: 'vertical' }}></textarea>
                
                <button type="submit" style={{ backgroundColor: '#8b3a3a', color: 'white', padding: '15px', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}