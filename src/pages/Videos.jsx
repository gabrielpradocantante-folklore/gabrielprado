import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient.js'

export default function Videos() {
  const [videos, setVideos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

  async function fetchVideos() {
    try {
      const { data, error } = await supabase.from('videos').select('*')
      if (error) throw error
      setVideos(data || [])
    } catch (error) {
      console.error("Error cargando videos:", error)
    } finally {
      setCargando(false)
    }
  }

  function obtenerIdYouTube(url) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%', minHeight: '80vh' }}>
      <h2 style={{ color: '#2d1b15', borderBottom: '2px solid #d4af37', paddingBottom: '10px', marginBottom: '20px' }}>
        Videos del Artista
      </h2>

      {cargando ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Cargando contenido...</p>
      ) : videos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#fdfbf7', borderRadius: '8px', border: '1px dashed #d4af37' }}>
          <p style={{ color: '#5d4037', fontSize: '16px' }}>No hay videos cargados todavía.</p>
          <p style={{ color: '#888', fontSize: '14px' }}>Usa el Panel Admin para cargar el primer video.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {videos.map(video => {
            const youtubeId = obtenerIdYouTube(video.url);
            return (
              <div key={video.id} style={{ 
                background: '#fff', 
                border: '1px solid #e0d8c5', 
                borderRadius: '8px', 
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '20px'
              }}>
                <div style={{ padding: '15px 15px 10px 15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    textTransform: 'uppercase', 
                    backgroundColor: video.tipo === 'exclusivo' ? '#2e7d32' : '#1976d2', 
                    color: '#fff', 
                    padding: '3px 8px', 
                    borderRadius: '4px', 
                    alignSelf: 'flex-start',
                    fontWeight: 'bold'
                  }}>
                    {video.tipo === 'exclusivo' ? '🔒 Exclusivo Web' : 'YouTube'}
                  </span>
                  
                  <h3 style={{ fontSize: '18px', color: '#2d1b15', margin: 0 }}>{video.titulo}</h3>
                </div>

                {youtubeId ? (
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, width: '100%' }}>
                    <iframe 
                      src={`https://www.youtube.com/embed/${youtubeId}`} 
                      title={video.titulo}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div style={{ padding: '20px', background: '#eee', textAlign: 'center' }}>
                    <a href={video.url} target="_blank" rel="noreferrer" style={{ color: '#d4af37', fontWeight: 'bold', textDecoration: 'none' }}>
                      Ver contenido externo &rarr;
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}