import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop' 
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Metricas from './components/Metricas'
import Inicio from './pages/Inicio'
import Videos from './pages/Videos'
import Admin from './pages/Admin'
import Biografia from './pages/Biografia'
import Eventos from './pages/Eventos'
import Contacto from './pages/Contacto' 

export default function App() {
  return (
    <>
      <ScrollToTop /> 
      <Navbar />
      
      {/* 
        La etiqueta main usa flexGrow: 1. 
        Esto obliga al contenido a expandirse y empujar el footer siempre hacia abajo.
      */}
      <main style={{ flexGrow: 1, paddingTop: '80px', paddingBottom: '40px', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/biografia" element={<Biografia />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/admin" element={<Admin />} /> 
        </Routes>
      </main>

      <Footer />
      <Metricas /> 
    </>
  )
}