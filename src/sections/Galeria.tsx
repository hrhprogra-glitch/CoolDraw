import { motion } from 'framer-motion';

// Definimos las obras con los datos que espera el visor detallado del Navbar
const obras = [
  { id: 1, titulo: "Concepto Alpha", img: "/Galeria/Dibujo7.jpg", src: "/Galeria/Dibujo7.jpg", cat: "Digital", tecnica: "Pintura Digital", año: "2026", desc: "Exploración de luz cinemática y entornos futuristas." },
  { id: 2, titulo: "Estudio de Color", img: "/Galeria/Dibujo9.jpg", src: "/Galeria/Dibujo9.jpg", cat: "Ilustración", tecnica: "Ilustración", año: "2025", desc: "Práctica enfocada en armonías cromáticas avanzadas." },
  { id: 3, titulo: "Trazo Libre", img: "/Galeria/Dibujo10.jpg", src: "/Galeria/Dibujo10.jpg", cat: "Sketch", tecnica: "Sketching", año: "2026", desc: "La esencia del movimiento capturada en una sola sesión." },
  { id: 4, titulo: "Narrativa Visual", img: "/Galeria/Dibujo1.jpg", src: "/Galeria/Dibujo1.jpg", cat: "Concept", tecnica: "Concept Art", año: "2026", desc: "Diseño de entorno para narrativa cinematográfica." },
];

// Recibimos la función onSelectObra desde App.tsx
export default function Galeria({ onSelectObra }: any) {
  const duplicadoObras = [...obras, ...obras];

  return (
    <section className="bg-transparent border-t border-[#c5a358]/20 py-24 overflow-hidden" id="venta">
      <div className="flex">
        <motion.div 
          className="flex gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 120, 
            repeat: Infinity 
          }}
        >
          {duplicadoObras.map((obra, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[300px] md:w-[450px] select-none group cursor-pointer"
              onClick={() => onSelectObra(obra)} // <--- ESTO activa el visor detallado directamente
            >
              {/* Contenedor de Imagen con el oscurecimiento que pediste */}
              <div className="relative aspect-[4/5] overflow-hidden border border-[#c5a358]/10 bg-[#fdf2f4]/30">
                <img 
                  src={obra.img} 
                  alt={obra.titulo}
                  className="w-full h-full object-cover transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              </div>

              {/* Información de la Obra */}
              <div className="mt-8 font-mono text-center">
                <span className="text-[9px] text-[#c5a358] uppercase tracking-[0.4em] font-bold block mb-2 opacity-60">
                  {obra.cat}
                </span>
                <h3 className="text-sm uppercase tracking-widest text-slate-800">
                  {obra.titulo}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}