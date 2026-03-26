import { motion } from 'framer-motion';

export default function Galeria({ onSelectObra, obras = [] }: any) {
  // Para evitar errores si no hay obras publicadas aún
  if (!obras || obras.length === 0) return null;

  return (
    <section className="bg-transparent border-t border-[#c5a358]/20 py-24 overflow-hidden relative z-20" id="venta">
      <div className="flex">
        
        <motion.div 
          className="flex"
          /* DIRECCIÓN: -50% mueve exactamente un "Bloque" entero hacia la izquierda. */
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 240, repeat: Infinity }}
        >
          {/* ========================================================
              BLOQUE 1: TUS OBRAS ORIGINALES
              "min-w-[100vw]" obliga a este bloque a ser tan ancho como tu pantalla.
              Si hay 1 imagen, el resto es espacio vacío.
          ======================================================== */}
          <div className="flex gap-12 min-w-[100vw] pr-12">
            {obras.map((obra: any, index: number) => (
              <div 
                key={`orig-${index}`} 
                className="flex-shrink-0 w-[300px] md:w-[450px] select-none group cursor-pointer"
                onClick={() => onSelectObra && onSelectObra(obra)} 
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-[#c5a358]/10 bg-[#fdf2f4]/30 rounded-sm">
                  <img 
                    src={obra.img} 
                    alt={obra.titulo}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                    loading="lazy" 
                    decoding="async" 
                  />
                  {/* Nota: Mantuve eliminada la capa negra "bg-black/20" de tu referencia para que tus dibujos mantengan el 100% de su brillo y nitidez original */}
                </div>

                <div className="mt-8 font-mono text-center">
                  <span className="text-[9px] text-[#c5a358] font-black uppercase tracking-[0.4em] block mb-2 opacity-60">
                    {obra.cat}
                  </span>
                  <h3 className="text-sm uppercase tracking-widest text-slate-800 font-black">
                    {obra.titulo}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================================
              BLOQUE 2: EL CLON (El truco de la magia)
              Como el Bloque 1 ocupa toda la pantalla, este Bloque 2 empieza escondido
              fuera de tu monitor a la derecha, esperando entrar como carrusel.
          ======================================================== */}
          <div className="flex gap-12 min-w-[100vw] pr-12">
            {obras.map((obra: any, index: number) => (
              <div 
                key={`clone-${index}`} 
                className="flex-shrink-0 w-[300px] md:w-[450px] select-none group cursor-pointer"
                onClick={() => onSelectObra && onSelectObra(obra)} 
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-[#c5a358]/10 bg-[#fdf2f4]/30 rounded-sm">
                  <img 
                    src={obra.img} 
                    alt={obra.titulo}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                    loading="lazy" 
                    decoding="async" 
                  />
                </div>

                <div className="mt-8 font-mono text-center">
                  <span className="text-[9px] text-[#c5a358] font-black uppercase tracking-[0.4em] block mb-2 opacity-60">
                    {obra.cat}
                  </span>
                  <h3 className="text-sm uppercase tracking-widest text-slate-800 font-black">
                    {obra.titulo}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}