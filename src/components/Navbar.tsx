import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ isGaleriaOpen, setIsGaleriaOpen, selectedObra, setSelectedObra }: any) {
  const [openRedes, setOpenRedes] = useState(false);

  useEffect(() => {
    if (isGaleriaOpen || openRedes || selectedObra) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isGaleriaOpen, openRedes, selectedObra]);

  const misDibujos = [
    { src: "/Galeria/Dibujo1.jpg", titulo: "Concepto Alpha", tecnica: "Digital", año: "2026", desc: "Exploración de luz cinemática." },
    { src: "/Galeria/Dibujo2.jpg", titulo: "Estudio de Color", tecnica: "Ilustración", año: "2025", desc: "Práctica cromática avanzada." },
    { src: "/Galeria/Dibujo3.jpg", titulo: "Trazo Libre", tecnica: "Sketch", año: "2026", desc: "Fluidez en líneas minimalistas." },
    { src: "/Galeria/Dibujo4.jpg", titulo: "Narrativa V", tecnica: "Concept Art", año: "2026", desc: "Diseño de entorno para historia visual." },
    { src: "/Galeria/Dibujo5.jpg", titulo: "Ecos del Futuro", tecnica: "Digital Paint", año: "2026", desc: "Perspectiva arquitectónica futurista." },
    { src: "/Galeria/Dibujo6.jpg", titulo: "Retrato 01", tecnica: "Digital", año: "2025", desc: "Estudio de expresión facial." },
    { src: "/Galeria/Dibujo7.jpg", titulo: "Luz de Neon", tecnica: "Ilustración", año: "2026", desc: "Práctica con fuentes de luz artificial." },
    { src: "/Galeria/Dibujo8.jpg", titulo: "Boceto Rápido", tecnica: "Ink Digital", año: "2026", desc: "Velocidad y forma en un solo trazo." },
    { src: "/Galeria/Dibujo9.jpg", titulo: "Atardecer", tecnica: "Digital Art", año: "2025", desc: "Gradientes y atmósfera cálida." },
    { src: "/Galeria/Dibujo10.jpg", titulo: "Estructura", tecnica: "Concept Art", año: "2026", desc: "Diseño de maquinaria pesada." },
    { src: "/Galeria/Dibujo11.jpg", titulo: "Fantasía", tecnica: "Ilustración", año: "2026", desc: "Elements de alta fantasía épica." },
    { src: "/Galeria/Dibujo12.jpg", titulo: "Noche Eterna", tecnica: "Digital", año: "2026", desc: "Contraste de azules profundos." },
    { src: "/Galeria/Dibujo13.jpg", titulo: "Obra Final", tecnica: "Masterpiece", año: "2026", desc: "La culminación del portafolio actual." },
  ];

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
        <div className="border-b border-[#c5a358]/30 px-4 md:px-6 py-5 flex justify-between items-center text-slate-900 font-mono text-[11px] font-black uppercase tracking-widest">
          <span className="text-[13px] tracking-[0.4em] select-none">CoolDraw</span>
          <div className="flex gap-4 md:gap-10 items-center">
            <button onClick={() => scrollTo('top')} className="hover:text-[#c5a358] transition-colors">Inicio</button>
            <button onClick={() => scrollTo('historia')} className="hover:text-[#c5a358] transition-colors">Sobre Mí</button>
            <button onClick={() => setIsGaleriaOpen(true)} className="hover:text-[#c5a358] transition-colors border-b border-[#c5a358]/40">Galería</button>
            <button onClick={() => scrollTo('contacto')} className="hover:text-[#c5a358] transition-colors">Contacto</button>
            <button onClick={() => setOpenRedes(true)} className="bg-[#c5a358] text-white px-4 py-2 shadow-md hover:bg-slate-900 transition-all rounded-sm">[ Redes ]</button>
          </div>
        </div>
      </nav>

      {/* --- GALERÍA GRID --- */}
      <AnimatePresence>
        {isGaleriaOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-[#fff5f7] overflow-y-auto pt-24 pb-20">
            <div className="max-w-7xl mx-auto p-8 columns-1 md:columns-3 gap-8 space-y-8">
              {misDibujos.map((obra, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: (i % 3) * 0.1 }}
                >
                  <img 
                    src={obra.src} 
                    onClick={() => setSelectedObra(obra)}
                    className="w-full border-[10px] border-white shadow-lg cursor-zoom-in hover:scale-[1.02] transition-transform duration-500" 
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
            <div className="text-center py-20 opacity-40 font-mono text-[10px] tracking-[0.4em]">Fin de la exhibición</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- VISOR DE OBRA --- */}
      <AnimatePresence>
        {selectedObra && (
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 200 }} className="fixed inset-0 z-[200] bg-[#fff5f7] overflow-y-auto pt-24">
            <button onClick={() => setSelectedObra(null)} className="fixed top-28 right-8 z-[210] bg-[#c5a358] text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center font-bold">✕</button>
            <div className="w-full min-h-[80vh] flex items-center justify-center bg-black/5 p-4">
              <img src={selectedObra.src} className="max-w-full max-h-[85vh] object-contain shadow-2xl border-4 border-white" />
            </div>
            <div className="max-w-4xl mx-auto py-20 px-8 text-center">
              <span className="font-mono text-[10px] text-[#c5a358] font-black uppercase tracking-[0.5em] mb-4 block">Artwork Information</span>
              <h3 className="text-5xl md:text-6xl font-serif font-bold text-slate-950 uppercase tracking-tighter mb-8 leading-none">{selectedObra.titulo}</h3>
              <div className="grid grid-cols-3 gap-4 py-8 border-y border-[#c5a358]/20 font-mono text-[10px] uppercase tracking-widest text-slate-600">
                <div><p className="text-[#c5a358]">Técnica</p><p className="font-black text-slate-950">{selectedObra.tecnica}</p></div>
                <div><p className="text-[#c5a358]">Año</p><p className="font-black text-slate-950">{selectedObra.año}</p></div>
                <div><p className="text-[#c5a358]">Status</p><p className="font-black text-slate-950">Original</p></div>
              </div>
              <p className="mt-12 text-xl font-serif italic text-slate-700 leading-relaxed max-w-2xl mx-auto">"{selectedObra.desc}"</p>
              <button className="mt-16 bg-[#c5a358] text-white px-10 py-5 font-mono text-[11px] font-black uppercase tracking-[0.2em] shadow-lg rounded-sm">Solicitar Información</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- VENTANA REDES --- */}
      <AnimatePresence>
        {openRedes && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpenRedes(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative z-[401] w-full max-w-[360px] bg-[#fff5f7] border border-[#c5a358]/40 shadow-2xl p-10 rounded-[2.5rem] text-center">
              <button onClick={() => setOpenRedes(false)} className="absolute top-6 right-6 bg-[#c5a358] text-white w-8 h-8 rounded-full flex items-center justify-center text-xs">✕</button>
              
              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex items-center justify-center">
                  <img 
                    src="/Galeria/Logo.jpg" 
                    className="w-full h-full object-cover" 
                    style={{ 
                        imageRendering: 'crisp-edges', 
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'translateZ(0) scale(1.01)' 
                    }} 
                  />
                </div>

                <h2 className="text-3xl font-serif font-bold text-slate-950 uppercase tracking-tighter">CoolDraw</h2>
                
                <div className="w-full space-y-3 font-mono text-[11px] font-black uppercase tracking-[0.2em]">
                  <a href="https://www.instagram.com/cooldraw02" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-[#fcd8e0] text-slate-900 hover:bg-[#c5a358] hover:text-white transition-all shadow-sm rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    Instagram
                  </a>

                  <a href="https://www.tiktok.com/@cooldraw02" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-[#fcd8e0] text-slate-900 hover:bg-[#c5a358] hover:text-white transition-all shadow-sm rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                    TikTok
                  </a>

                  {/* Facebook con tu link actualizado */}
                  <a href="https://www.facebook.com/profile.php?id=61587543412431" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-[#fcd8e0] text-slate-900 hover:bg-[#c5a358] hover:text-white transition-all shadow-sm rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    Facebook
                  </a>

                  <a href="https://x.com/CoolDraw02" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-[#fcd8e0] text-slate-900 hover:bg-[#c5a358] hover:text-white transition-all shadow-sm rounded-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                    Twitter / X
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}