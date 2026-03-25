import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SobreMi({ perfilUrl = "/Galeria/Logo.jpg" }: any) {
  // Lógica para el efecto Lupa
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    /* 1. Cambiamos bg-[#fffafb]/80 por bg-transparent para que se vea el rosa del fondo global */
    <section className="py-32 px-6 md:px-20 bg-transparent backdrop-blur-sm border-t border-[#c5a358]/20" id="historia">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
        
        {/* LADO TEXTO / DATOS */}
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#c5a358] block mb-4 font-bold">01 / Profile</span>
            <h2 className="text-4xl font-serif text-slate-900 leading-tight normal-case tracking-normal">
              CoolDraw es la firma creativa de una artista enfocada en la <span className="text-[#c5a358] italic">estética contemporánea</span> y el color.
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="pt-10 border-t border-[#c5a358]/20"
          >
            <span className="text-[#c5a358] block mb-4 font-bold">02 / Experience</span>
            <p className="text-slate-500 leading-loose max-w-sm normal-case font-sans">
              Especializada en ilustración digital, su trabajo es una mezcla de trazos orgánicos con una paleta de colores vibrante. Cada pieza busca contar una historia emocional detrás de lo visual.
            </p>
          </motion.div>
        </div>

        {/* LADO VISUAL / FOTO CON EFECTO LUPA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          /* 2. Cambiamos bg-white/50 por un tono rosado muy leve o transparente */
          className="relative aspect-square border border-[#c5a358]/30 p-4 bg-[#fff5f7]/20 group"
        >
          <div 
            className="w-full h-full overflow-hidden relative cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.img 
              src={perfilUrl}
              alt="CoolDraw Artist"
              className="w-full h-full object-cover transition-transform duration-200 ease-out will-change-transform"
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: isHovering ? 'scale(2.5)' : 'scale(1)'
              }}
            />

            {!isHovering && (
              <div className="absolute inset-0 bg-[#c5a358]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {/* 3. Cambiamos bg-white/90 por el tono rosa de fondo para el botón de ayuda */}
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#c5a358] bg-[#fff5f7] px-3 py-1.5 shadow-sm">Explorar Detalle</span>
              </div>
            )}
          </div>
          
          {/* Badge Dorado Flotante */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -bottom-4 -right-4 bg-[#c5a358] text-white p-6 font-mono text-[9px] uppercase tracking-[0.4em] shadow-2xl z-10 pointer-events-none"
          >
            Concept Artist
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}