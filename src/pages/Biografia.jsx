export default function Biografia() {
  return (
    <div style={{ backgroundColor: '#f9f6f0', minHeight: '100vh', padding: '40px 20px', fontFamily: '"Georgia", serif', color: '#3e2723' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Biografía
          </h2>
          <div style={{ height: '3px', width: '80px', backgroundColor: '#8b3a3a', margin: '15px auto 0' }}></div>
        </div>

        <div style={{ 
          backgroundColor: '#fffcf9',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 8px 16px rgba(62, 39, 35, 0.05)',
          border: '1px solid #d7ccc8'
        }}>
          
          {/* FOTO ARRIBA (Diseño anterior) */}
          <div style={{ marginBottom: '35px', textAlign: 'center' }}>
            {/* Si tienes la foto en tu carpeta public, pon "/foto-biografia.jpg" */}
            <img 
              src="/gabi1.jpg" // O el nombre exacto de la imagen que estabas usando
              alt="Gabriel Prado cantando" 
              style={{ 
                width: '100%', 
                maxHeight: '450px',
                objectFit: 'cover', // Asegura que no se deforme aunque sea ancha
                borderRadius: '8px'
              }} 
            />
          </div>

          {/* TEXTO ABAJO */}
          <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#4e342e' }}>
            <p style={{ marginTop: '0' }}>
              Nacido en el corazón de nuestra provincia, <strong>Gabriel Prado</strong> creció rodeado de guitarras y bombos legüeros. Desde muy joven, entendió que su destino estaba ligado a mantener vivas las tradiciones de nuestra tierra a través del canto.
            </p>
            <p>
              Con una voz inconfundible y un profundo respeto por los grandes poetas del folklore, ha recorrido peñas, festivales y teatros, llevando consigo un repertorio que abraza la zamba, la chacarera y otras joyas de nuestro cancionero popular.
            </p>
            <p>
              Sus influencias navegan entre los grandes maestros, logrando un estilo propio que respeta las raíces pero abraza sonidos contemporáneos. Cada presentación es un viaje a través de nuestras costumbres, invitando al público a ser parte de una gran peña familiar.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}