import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export default function Admin() {
  // === ESTADO DE SESIÓN (SEGURIDAD) ===
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // === ESTADOS PARA CRUD ===
  const [videos, setVideos] = useState([])
  const [tituloVideo, setTituloVideo] = useState('')
  const [url, setUrl] = useState('')
  const [tipo, setTipo] = useState('youtube')
  const [editandoVideoId, setEditandoVideoId] = useState(null)

  const [eventos, setEventos] = useState([])
  const [tituloEvento, setTituloEvento] = useState('')
  const [fechaEvento, setFechaEvento] = useState('')
  const [ciudadEvento, setCiudadEvento] = useState('')
  const [linkEntradas, setLinkEntradas] = useState('')
  const [editandoEventoId, setEditandoEventoId] = useState(null)

  const [mensajes, setMensajes] = useState([])
  const [resenas, setResenas] = useState([])

  useEffect(() => {
    // 1. Verificamos si ya hay alguien logueado al entrar a la página
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // 2. Escuchamos si el usuario inicia o cierra sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Solo cargar datos si el usuario está logueado
  useEffect(() => {
    if (session) {
      fetchVideos()
      fetchEventos()
      fetchMensajes()
      fetchResenas()
    }
  }, [session])

  // --- LÓGICA DE LOGIN / LOGOUT ---
  async function handleLogin(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert("Error al iniciar sesión: " + error.message)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  // --- LÓGICA DE VIDEOS ---
  async function fetchVideos() {
    const { data, error } = await supabase.from('videos').select('*')
    if (!error) setVideos(data || [])
  }

  async function handleSubmitVideo(e) {
    e.preventDefault()
    if (editandoVideoId) {
      const { error } = await supabase.from('videos').update({ titulo: tituloVideo, url, tipo }).eq('id', editandoVideoId)
      if (!error) { alert("¡Video actualizado!"); cancelarEdicionVideo(); fetchVideos(); }
    } else {
      const { error } = await supabase.from('videos').insert([{ titulo: tituloVideo, url, tipo }])
      if (!error) { alert("¡Video guardado!"); cancelarEdicionVideo(); fetchVideos(); }
    }
  }

  function iniciarEdicionVideo(video) {
    setTituloVideo(video.titulo); setUrl(video.url); setTipo(video.tipo); setEditandoVideoId(video.id);
  }

  function cancelarEdicionVideo() {
    setTituloVideo(''); setUrl(''); setTipo('youtube'); setEditandoVideoId(null);
  }

  async function eliminarVideo(id) {
    if (window.confirm("¿Eliminar este video?")) {
      await supabase.from('videos').delete().eq('id', id)
      fetchVideos()
    }
  }

  // --- FUNCIONES DEL CRUD DE RESEÑAS ---
  async function fetchResenas() {
    const { data, error } = await supabase.from('resenas').select('*').order('created_at', { ascending: false })
    if (!error) setResenas(data || [])
  }

  async function toggleAprobarResena(id, estadoActual) {
    const { error } = await supabase.from('resenas').update({ aprobada: !estadoActual }).eq('id', id)
    if (!error) fetchResenas()
    else alert("Error al actualizar la reseña")
  }

  async function eliminarResena(id) {
    if (window.confirm("¿Seguro que quieres borrar este mensaje del Fogón?")) {
      const { error } = await supabase.from('resenas').delete().eq('id', id)
      if (!error) fetchResenas()
    }
  }

  // --- LÓGICA DE EVENTOS ---
  async function fetchEventos() {
    const { data, error } = await supabase.from('eventos').select('*').order('fecha', { ascending: true })
    if (!error) setEventos(data || [])
  }

  async function handleSubmitEvento(e) {
    e.preventDefault()
    const payload = { titulo: tituloEvento, fecha: fechaEvento || null, ciudad: ciudadEvento, link_entradas: linkEntradas }
    if (editandoEventoId) {
      const { error } = await supabase.from('eventos').update(payload).eq('id', editandoEventoId)
      if (error) alert("Error: " + error.message)
      else { alert("¡Evento actualizado!"); cancelarEdicionEvento(); fetchEventos(); }
    } else {
      const { error } = await supabase.from('eventos').insert([payload])
      if (error) alert("Error: " + error.message)
      else { alert("¡Evento guardado!"); cancelarEdicionEvento(); fetchEventos(); }
    }
  }

  function iniciarEdicionEvento(evento) {
    setTituloEvento(evento.titulo); setFechaEvento(evento.fecha ? evento.fecha : ''); setCiudadEvento(evento.ciudad || ''); setLinkEntradas(evento.link_entradas || ''); setEditandoEventoId(evento.id);
  }

  function cancelarEdicionEvento() {
    setTituloEvento(''); setFechaEvento(''); setCiudadEvento(''); setLinkEntradas(''); setEditandoEventoId(null);
  }

  async function eliminarEvento(id) {
    if (window.confirm("¿Eliminar este evento?")) {
      await supabase.from('eventos').delete().eq('id', id)
      fetchEventos()
    }
  }

  // --- LÓGICA DE MENSAJES (Contacto) ---
  async function fetchMensajes() {
    const { data, error } = await supabase.from('mensajes_contacto').select('*').order('fecha', { ascending: false })
    if (!error) setMensajes(data || [])
  }

  async function eliminarMensaje(id) {
    if (window.confirm("¿Estás seguro de que quieres borrar este mensaje?")) {
      await supabase.from('mensajes_contacto').delete().eq('id', id)
      fetchMensajes()
    }
  }

  // ==========================================
  // RENDERIZADO CONDICIONAL DE PANTALLAS
  // ==========================================

  // SI NO HAY SESIÓN: MUESTRA EL LOGIN
  if (!session) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f6f0' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', borderTop: '4px solid #8b3a3a', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ color: '#3e2723', marginBottom: '10px' }}>Acceso Restringido</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>Panel de Administración</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input 
              type="email" placeholder="Correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
            <input 
              type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
            <button type="submit" style={{ backgroundColor: '#8b3a3a', color: 'white', padding: '15px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}>
              INGRESAR
            </button>
          </form>
        </div>
      </div>
    )
  }

  // SI HAY SESIÓN: MUESTRA TU CRUD
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ccc', paddingBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ margin: 0 }}>Panel de Administración</h2>
        <button onClick={handleLogout} style={{ backgroundColor: '#3e2723', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>
      
      {/* SECCIÓN VIDEOS */}
      <h3 style={{ marginTop: '40px', color: '#8b3a3a' }}>🎬 Gestión de Videos</h3>
      <div style={{ backgroundColor: editandoVideoId ? '#fff3cd' : '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h4>{editandoVideoId ? '✏️ Editando Video' : 'Cargar Nuevo Video'}</h4>
        <form onSubmit={handleSubmitVideo} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Título" value={tituloVideo} onChange={(e) => setTituloVideo(e.target.value)} required style={{ padding: '10px' }} />
          <input type="url" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required style={{ padding: '10px' }} />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ padding: '10px' }}>
            <option value="youtube">YouTube</option>
            <option value="exclusivo">Exclusivo Web</option>
          </select>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#333', color: 'white', cursor: 'pointer' }}>Guardar</button>
            {editandoVideoId && <button type="button" onClick={cancelarEdicionVideo} style={{ padding: '12px' }}>Cancelar</button>}
          </div>
        </form>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {videos.map(v => (
          <li key={v.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', border: '1px solid #ddd', marginBottom: '5px' }}>
            <span>{v.titulo}</span>
            <div>
              <button onClick={() => iniciarEdicionVideo(v)} style={{ marginRight: '10px' }}>Editar</button>
              <button onClick={() => eliminarVideo(v.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {/* SECCIÓN EVENTOS */}
      <h3 style={{ marginTop: '60px', color: '#8b3a3a', borderTop: '2px dashed #ccc', paddingTop: '30px' }}>🎸 Gestión de Shows</h3>
      <div style={{ backgroundColor: editandoEventoId ? '#e8f4f8' : '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h4>{editandoEventoId ? '✏️ Editando Show' : 'Cargar Nuevo Show'}</h4>
        <form onSubmit={handleSubmitEvento} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Título (Ej: Gran Rex)" value={tituloEvento} onChange={(e) => setTituloEvento(e.target.value)} required style={{ padding: '10px' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="date" value={fechaEvento} onChange={(e) => setFechaEvento(e.target.value)} style={{ padding: '10px', flex: 1 }} />
            <input type="text" placeholder="Ciudad" value={ciudadEvento} onChange={(e) => setCiudadEvento(e.target.value)} style={{ padding: '10px', flex: 1 }} />
          </div>
          <input type="url" placeholder="Link de Entradas (Opcional)" value={linkEntradas} onChange={(e) => setLinkEntradas(e.target.value)} style={{ padding: '10px' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#3e2723', color: 'white', cursor: 'pointer' }}>Guardar</button>
            {editandoEventoId && <button type="button" onClick={cancelarEdicionEvento} style={{ padding: '12px' }}>Cancelar</button>}
          </div>
        </form>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {eventos.map(e => (
          <li key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', border: '1px solid #ddd', marginBottom: '5px' }}>
            <span>{e.titulo} ({e.fecha})</span>
            <div>
              <button onClick={() => iniciarEdicionEvento(e)} style={{ marginRight: '10px' }}>Editar</button>
              <button onClick={() => eliminarEvento(e.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {/* SECCIÓN MENSAJES (BANDEJA DE ENTRADA) */}
      <h3 style={{ marginTop: '60px', color: '#8b3a3a', borderTop: '2px dashed #ccc', paddingTop: '30px' }}>✉️ Bandeja de Entrada</h3>
      
      {mensajes.length === 0 ? (
        <p>No tienes mensajes nuevos.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {mensajes.map(msg => (
            <div key={msg.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem' }}>{msg.nombre}</strong>
                  <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.9rem' }}>📧 {msg.mail}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: '#999' }}>{new Date(msg.fecha).toLocaleDateString()}</span>
                  <br />
                  <button onClick={() => eliminarMensaje(msg.id)} style={{ marginTop: '5px', backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Borrar Mensaje</button>
                </div>
              </div>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{msg.mensaje}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* SECCIÓN: GESTIÓN DEL FOGÓN (RESEÑAS) */}
      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px dashed #ccc', paddingBottom: '40px' }}>
        <h3 style={{ color: '#8b3a3a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🔥 Gestión del Fogón (Reseñas)
        </h3>
        
        {resenas.length === 0 ? (
          <p>No hay mensajes para moderar todavía.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {resenas.map(resena => (
              <li key={resena.id} style={{ 
                backgroundColor: '#fff', padding: '20px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px',
                borderLeft: resena.aprobada ? '5px solid #27ae60' : '5px solid #f39c12', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}>
                <p style={{ fontStyle: 'italic', margin: '0 0 15px 0', fontSize: '1.1rem' }}>"{resena.comentario}"</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <strong style={{ color: '#333' }}>— {resena.nombre}</strong>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => toggleAprobarResena(resena.id, resena.aprobada)}
                      style={{ padding: '8px 15px', cursor: 'pointer', border: 'none', borderRadius: '4px', color: 'white', fontWeight: 'bold', backgroundColor: resena.aprobada ? '#f39c12' : '#27ae60' }}
                    >
                      {resena.aprobada ? 'Ocultar' : 'Aprobar'}
                    </button>
                    
                    <button 
                      onClick={() => eliminarResena(resena.id)}
                      style={{ padding: '8px 15px', cursor: 'pointer', border: 'none', borderRadius: '4px', backgroundColor: '#e74c3c', color: 'white', fontWeight: 'bold' }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}