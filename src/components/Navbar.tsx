import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Definimos la estructura de la obra para TypeScript
interface Obra {
  src: string;
  titulo: string;
  tecnica: string;
  año: string;
  desc: string;
  cat?: string;
}

export default function Navbar({ isGaleriaOpen, setIsGaleriaOpen, selectedObra, setSelectedObra, obras = [], perfilUrl = "/Galeria/Logo.jpg" }: any) {
  const [openRedes, setOpenRedes] = useState(false);

  useEffect(() => {
    if (isGaleriaOpen || openRedes || selectedObra) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isGaleriaOpen, openRedes, selectedObra]);

  // Usamos las obras que vienen por props desde App.tsx
  const misDibujos = obras;

  const scrollTo = (id: string) => {
    setIsGaleriaOpen(false);
    setSelectedObra(null);
    setOpenRedes(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[300] bg-[#fff5f7]/95 backdrop-blur-md shadow-sm">
        <div className="border-b border-[#c5a358]/30 px-4 md:px-6 py-4 md:py-5 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
          <span className="text-[13px] font-mono font-black uppercase tracking-[0.4em] select-none text-slate-900">CoolDraw</span>
          <div className="flex gap-5 md:gap-10 items-center overflow-x-auto w-full md:w-auto justify-center pb-2 md:pb-0 px-4 no-scrollbar">
            <button onClick={() => scrollTo('top')} className="text-[10px] md:text-[11px] font-mono font-black uppercase tracking-widest text-slate-700 hover:text-[#c5a358] active:scale-95 transition-all flex-shrink-0">Inicio</button>
            <button onClick={() => scrollTo('historia')} className="text-[10px] md:text-[11px] font-mono font-black uppercase tracking-widest text-slate-700 hover:text-[#c5a358] active:scale-95 transition-all flex-shrink-0">Sobre Mí</button>
            <button onClick={() => setIsGaleriaOpen(true)} className="text-[10px] md:text-[11px] font-mono font-black uppercase tracking-widest text-slate-700 hover:text-[#c5a358] border-b border-[#c5a358]/40 active:scale-95 transition-all flex-shrink-0">Galería</button>
            <button onClick={() => scrollTo('contacto')} className="text-[10px] md:text-[11px] font-mono font-black uppercase tracking-widest text-slate-700 hover:text-[#c5a358] active:scale-95 transition-all flex-shrink-0">Contacto</button>
            <button onClick={() => setOpenRedes(true)} className="bg-[#c5a358] text-white px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-[11px] font-mono font-black shadow-md hover:bg-slate-900 active:scale-90 transition-all rounded-sm flex-shrink-0">[ Redes ]</button>
          </div>
        </div>
      </nav>

      {/* --- GALERÍA GRID CON ANIMACIÓN DE SCROLL --- */}
      <AnimatePresence>
        {isGaleriaOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-[#fff5f7] overflow-y-auto pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 columns-2 md:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
              {misDibujos.map((obra: Obra, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }} // Se activa un poco antes de entrar a vista
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeOut", 
                    delay: (i % 3) * 0.1 // Efecto cascada por columnas
                  }}
                >
                  <img 
                    src={obra.src} 
                    onClick={() => setSelectedObra(obra)}
                    className="w-full border-4 md:border-[10px] border-white shadow-md cursor-zoom-in hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300" 
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
            <button onClick={() => setIsGaleriaOpen(false)} className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-3 rounded-full font-mono text-[10px] uppercase tracking-widest shadow-2xl hover:bg-[#c5a358] active:scale-90 transition-all z-[120]">Cerrar Galería</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedObra && (
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 200 }} className="fixed inset-0 z-[200] bg-[#fff5f7] overflow-y-auto pt-20">
            <button onClick={() => setSelectedObra(null)} className="fixed top-24 right-4 md:right-8 z-[210] bg-[#c5a358] text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center font-bold hover:bg-slate-900 hover:rotate-90 active:scale-75 transition-all duration-300">✕</button>
            <div className="w-full flex items-center justify-center bg-black/5 p-2 md:p-4 min-h-[50vh] md:min-h-[80vh]">
              <img src={selectedObra.src} className="max-w-full h-auto md:max-h-[85vh] object-contain shadow-2xl border-4 border-white" />
            </div>
            <div className="max-w-4xl mx-auto py-10 md:py-20 px-6 md:px-8 text-center">
              <span className="font-mono text-[9px] text-[#c5a358] font-black uppercase tracking-[0.5em] mb-4 block">Artwork Information</span>
              <h3 className="text-3xl md:text-6xl font-serif font-bold text-slate-950 uppercase tracking-tighter mb-6 md:mb-8 leading-none">{selectedObra.titulo}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6 border-y border-[#c5a358]/20 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-slate-600">
                <div><p className="text-[#c5a358]">Técnica</p><p className="font-black text-slate-950">{selectedObra.tecnica}</p></div>
                <div><p className="text-[#c5a358]">Año</p><p className="font-black text-slate-950">{selectedObra.año}</p></div>
                <div className="col-span-2 md:col-span-1"><p className="text-[#c5a358]">Status</p><p className="font-black text-slate-950">Original</p></div>
              </div>
              <p className="mt-8 md:mt-12 text-lg md:text-xl font-serif italic text-slate-700 leading-relaxed max-w-2xl mx-auto">"{selectedObra.desc}"</p>
              <button className="mt-10 md:mt-16 w-full md:w-auto bg-[#c5a358] text-white px-10 py-4 md:py-5 font-mono text-[11px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-slate-900 active:scale-95 transition-all rounded-sm">Solicitar Información</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openRedes && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpenRedes(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative z-[401] w-full max-w-[360px] bg-[#fff5f7] border border-[#c5a358]/40 shadow-2xl p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-center">
              <button onClick={() => setOpenRedes(false)} className="absolute top-4 right-4 bg-[#c5a358] text-white w-8 h-8 rounded-full flex items-center justify-center text-xs hover:bg-slate-900 hover:rotate-90 active:scale-75 transition-all duration-300">✕</button>
              <div className="flex flex-col items-center gap-5 md:gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex items-center justify-center">
                  <img src={perfilUrl} className="w-full h-full object-cover" style={{ transform: 'translateZ(0) scale(1.01)' }} />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 uppercase tracking-tighter">CoolDraw</h2>
                <div className="w-full space-y-2 md:space-y-3 font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">
                  <a href="https://www.instagram.com/cooldraw02" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-3 md:py-4 bg-white border border-[#fcd8e0] text-slate-900 hover:bg-[#c5a358] hover:text-white active:scale-95 transition-all shadow-sm rounded-sm">Instagram</a>
                  <a href="https://www.tiktok.com/@cooldraw02" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-3 md:py-4 bg-white border border-[#fcd8e0] text-slate-900 hover:bg-[#c5a358] hover:text-white active:scale-95 transition-all shadow-sm rounded-sm">TikTok</a>
                  <a href="https://www.facebook.com/profile.php?id=61587543412431" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-3 md:py-4 bg-white border border-[#fcd8e0] text-slate-900 hover:bg-[#c5a358] hover:text-white active:scale-95 transition-all shadow-sm rounded-sm">Facebook</a>
                  <a href="https://x.com/CoolDraw02" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-3 md:py-4 bg-white border border-[#fcd8e0] text-slate-900 hover:bg-[#c5a358] hover:text-white active:scale-95 transition-all shadow-sm rounded-sm">Twitter / X</a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}