import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase.js'

export default function Metricas() {
  const [metricas, setMetricas] = useState({ visitas: 0, me_gusta: 0 })
  const [likeDado, setLikeDado] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('dio_like')) setLikeDado(true)
    registrarVisita()
  }, [])

  async function registrarVisita() {
    const { data, error } = await supabase.from('metricas').select('*').eq('id', 1).single()
    
    if (data) {
      const nuevasVisitas = data.visitas + 1
      setMetricas({ visitas: nuevasVisitas, me_gusta: data.me_gusta })
      await supabase.from('metricas').update({ visitas: nuevasVisitas }).eq('id', 1)
    } else {
      console.error("Error al registrar visita:", error)
    }
  }

  async function handleLike() {
    if (likeDado) return
    
    const nuevosLikes = metricas.me_gusta + 1
    setMetricas({ ...metricas, me_gusta: nuevosLikes })
    setLikeDado(true)
    localStorage.setItem('dio_like', 'true') 

    await supabase.from('metricas').update({ me_gusta: nuevosLikes }).eq('id', 1)
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#2d1b15',
      color: '#f9f6f0',
      padding: '10px 18px',
      borderRadius: '30px',
      display: 'flex',
      gap: '15px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
      zIndex: 9999, // Super alto para que flote por encima de todo
      fontFamily: 'sans-serif',
      fontSize: '14px',
      border: '1px solid #d4af37'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>👁️</span> 
        <strong>{metricas.visitas}</strong>
      </div>
      <div style={{ width: '1px', backgroundColor: '#5d4037' }}></div>
      <button 
        onClick={handleLike} 
        style={{ 
          background: 'none', border: 'none', color: likeDado ? '#e57373' : '#f9f6f0', 
          cursor: likeDado ? 'default' : 'pointer', 
          display: 'flex', alignItems: 'center', gap: '6px', padding: 0,
          fontWeight: 'bold', fontSize: '14px',
        }}
      >
        <span>{likeDado ? '❤️' : '🤍'}</span> 
        {metricas.me_gusta}
      </button>
    </div>
  )
}