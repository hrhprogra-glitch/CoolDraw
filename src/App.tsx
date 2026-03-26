import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import SobreMi from './sections/SobreMi';
import Galeria from './sections/Galeria';
import Contacto from './sections/Contacto';
import Admin from './sections/Admin'; // <-- Importamos el panel
import { supabase } from './supabaseClient'; 

export default function App() {
  const [isGaleriaOpen, setIsGaleriaOpen] = useState(false);
  const [selectedObra, setSelectedObra] = useState<any>(null);
  
  // Nuevos estados segmentados para el CMS
  const [obrasGaleria, setObrasGaleria] = useState<any[]>([]); 
  const [obrasCarrusel, setObrasCarrusel] = useState<any[]>([]);
  const [fondoUrl, setFondoUrl] = useState('');
  const [perfilUrl, setPerfilUrl] = useState('/Galeria/Logo.jpg'); // Fallback por defecto

  // Función asíncrona para obtener datos
  useEffect(() => {
    const fetchData = async () => {
      // 1. Cargar configuración web (Fondo y Perfil)
      const { data: configData } = await supabase.from('web_config').select('*');
      if (configData) {
        const fondo = configData.find(c => c.id === 'fondo');
        const perfil = configData.find(c => c.id === 'perfil');
        if (fondo?.url_imagen) setFondoUrl(fondo.url_imagen);
        if (perfil?.url_imagen) setPerfilUrl(perfil.url_imagen);
      }

      // 2. Cargar Obras y segmentarlas
      const { data, error } = await supabase
        .from('obras')
        .select('*')
        .order('id', { ascending: false }); // Las más nuevas primero

      if (error) {
        console.error("Error cargando obras:", error);
      } else if (data) {
        // Mapeamos los datos de la DB al formato que espera tu frontend
        const obrasFormateadas = data.map((item: any) => ({
          src: item.url_imagen,
          img: item.url_imagen,
          titulo: item.titulo,
          tecnica: item.tecnica,
          año: item.año,
          desc: item.descripcion,
          cat: item.categoria || 'Sin Categoría',
          destino: item.destino || 'Ambos'
        }));
        
        // Filtramos según la decisión tomada en el panel admin
        setObrasGaleria(obrasFormateadas.filter(o => o.destino === 'Galeria' || o.destino === 'Ambos'));
        setObrasCarrusel(obrasFormateadas.filter(o => o.destino === 'Carrusel' || o.destino === 'Ambos'));
      }
    };

    fetchData();
  }, []);

  // Routing ultra-ligero para panel admin
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => {
      // Si el usuario sale del panel Admin, recargamos toda la página automáticamente
      // para obligar a la Galería y al Carrusel a descargar los datos y fotos nuevas.
      if (window.location.hash !== '#admin') {
        window.location.reload(); 
      } else {
        setIsAdminRoute(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminRoute) {
    return <Admin />;
  }

  return (
    <div id="top" className="relative min-h-screen selection:bg-[#c5a358]/20 selection:text-[#c5a358]">
      
      {/* FONDO FIJO DINÁMICO */}
      <div 
        className="fixed inset-0 -z-10" 
        style={fondoUrl ? { 
          backgroundImage: `url('${fondoUrl}')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundAttachment: 'fixed' 
        } : {}}
      >
        <div className="absolute inset-0 bg-[#fff5f7]/60"></div>
      </div>

      {/* Pasamos los estados segmentados al Navbar (Galeria y Perfil) */}
      <Navbar 
        isGaleriaOpen={isGaleriaOpen} 
        setIsGaleriaOpen={setIsGaleriaOpen} 
        selectedObra={selectedObra}
        setSelectedObra={setSelectedObra}
        obras={obrasGaleria}
        perfilUrl={perfilUrl}
      />

      <main className="relative z-10 w-full">
        <Hero />
        
        {/* Pasamos la foto de perfil actualizada a SobreMi */}
        <SobreMi perfilUrl={perfilUrl} />

        {/* Galería conectada al estado segmentado (Carrusel) */}
        <Galeria obras={obrasCarrusel} onSelectObra={(obra: any) => setSelectedObra(obra)} />

        <Contacto />

        <footer className="py-20 px-6 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-[#c5a358] bg-transparent">
          <span className="font-bold">CoolDraw © 2026</span>
          <span>Lima / Tokyo</span>
        </footer>
      </main>
    </div>
  );
}