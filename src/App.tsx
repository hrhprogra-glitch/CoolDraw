import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import SobreMi from './sections/SobreMi';
import Galeria from './sections/Galeria';
import Contacto from './sections/Contacto';

export default function App() {
  const [isGaleriaOpen, setIsGaleriaOpen] = useState(false);
  const [selectedObra, setSelectedObra] = useState<any>(null); // Nuevo estado global

  return (
    <div id="top" className="relative min-h-screen selection:bg-[#c5a358]/20 selection:text-[#c5a358]">
      
      {/* FONDO FIJO */}
      <div className="fixed inset-0 -z-10" style={{ backgroundImage: "url('/Galeria/Dibujo13.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-[#fff5f7]/60"></div>
      </div>

      {/* Pasamos los estados al Navbar */}
      <Navbar 
        isGaleriaOpen={isGaleriaOpen} 
        setIsGaleriaOpen={setIsGaleriaOpen} 
        selectedObra={selectedObra}
        setSelectedObra={setSelectedObra}
      />

      <main className="relative z-10 w-full">
        <Hero />
        <SobreMi />

        {/* Pasamos la función de selección a la Galería del carrusel */}
        <Galeria onSelectObra={(obra: any) => setSelectedObra(obra)} />

        <Contacto />

        <footer className="py-20 px-6 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-[#c5a358] bg-transparent">
          <span className="font-bold">CoolDraw © 2026</span>
          <span>Lima / Tokyo</span>
        </footer>
      </main>
    </div>
  );
}