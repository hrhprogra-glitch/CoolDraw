import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center px-6 md:px-20 relative overflow-hidden">
      
      {/* Texto de fondo sutil (Ahora en Dorado muy suave) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[30vw] font-black uppercase text-[#c5a358]">CD</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Etiqueta superior en Dorado */}
        <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-[#c5a358] mb-6 block font-bold">
          Creative Illustration / 2026
        </span>
        
        {/* CoolDraw con el punto Dorado */}
        <h1 className="text-[12vw] font-serif uppercase tracking-tighter text-slate-950 leading-none whitespace-nowrap">
          CoolDraw<span className="text-[#c5a358]">.</span>
        </h1>

        {/* Línea divisoria Dorada */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center gap-8 border-t border-[#c5a358]/30 pt-8">
          <p className="max-w-xs font-mono text-[11px] leading-relaxed uppercase text-slate-500">
            Exploración visual a través del dibujo digital y narrativa contemporánea.
          </p>
          
          <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-4"
          >
            {/* Línea animada Dorada */}
            <div className="w-12 h-[1px] bg-[#c5a358]"></div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a358] font-bold">
              Available for projects
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador lateral de scroll tipo Tamori en Dorado */}
      <div className="absolute right-10 bottom-10 hidden md:block">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] vertical-text text-[#c5a358] opacity-60">
          Scroll Down
        </span>
      </div>
    </section>
  );
}