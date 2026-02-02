import { motion } from 'framer-motion';

// Lista de las 18 obras corregida para el carrusel infinito
const obras = [
  { id: 1, titulo: "Concepto Alpha", img: "/Galeria/Dibujo1.jpg", src: "/Galeria/Dibujo1.jpg", cat: "Digital", tecnica: "Pintura Digital", año: "2026", desc: "Exploración de luz cinemática." },
  { id: 2, titulo: "Estudio de Color", img: "/Galeria/Dibujo2.jpg", src: "/Galeria/Dibujo2.jpg", cat: "Ilustración", tecnica: "Ilustración", año: "2025", desc: "Práctica cromática avanzada." },
  { id: 3, titulo: "Trazo Libre", img: "/Galeria/Dibujo3.jpg", src: "/Galeria/Dibujo3.jpg", cat: "Sketch", tecnica: "Sketching", año: "2026", desc: "Fluidez en líneas minimalistas." },
  { id: 4, titulo: "Narrativa Visual", img: "/Galeria/Dibujo4.jpg", src: "/Galeria/Dibujo4.jpg", cat: "Concept", tecnica: "Concept Art", año: "2026", desc: "Diseño de entorno visual." },
  { id: 5, titulo: "Ecos del Futuro", img: "/Galeria/Dibujo5.jpg", src: "/Galeria/Dibujo5.jpg", cat: "Digital", tecnica: "Digital Paint", año: "2026", desc: "Perspectiva arquitectónica futurista." },
  { id: 6, titulo: "Retrato 01", img: "/Galeria/Dibujo6.jpg", src: "/Galeria/Dibujo6.jpg", cat: "Digital", tecnica: "Digital Art", año: "2025", desc: "Estudio de expresión facial." },
  { id: 7, titulo: "Luz de Neon", img: "/Galeria/Dibujo7.jpg", src: "/Galeria/Dibujo7.jpg", cat: "Ilustración", tecnica: "Ilustración", año: "2026", desc: "Práctica con luz artificial." },
  { id: 8, titulo: "Boceto Rápido", img: "/Galeria/Dibujo8.jpg", src: "/Galeria/Dibujo8.jpg", cat: "Sketch", tecnica: "Ink Digital", año: "2026", desc: "Velocidad y forma." },
  { id: 9, titulo: "Atardecer", img: "/Galeria/Dibujo9.jpg", src: "/Galeria/Dibujo9.jpg", cat: "Digital", tecnica: "Digital Art", año: "2025", desc: "Gradientes y atmósfera cálida." },
  { id: 10, titulo: "Estructura", img: "/Galeria/Dibujo10.jpg", src: "/Galeria/Dibujo10.jpg", cat: "Concept", tecnica: "Concept Art", año: "2026", desc: "Diseño de maquinaria." },
  { id: 11, titulo: "Fantasía", img: "/Galeria/Dibujo11.jpg", src: "/Galeria/Dibujo11.jpg", cat: "Ilustración", tecnica: "Ilustración", año: "2026", desc: "Elementos de alta fantasía." },
  { id: 12, titulo: "Noche Eterna", img: "/Galeria/Dibujo12.jpg", src: "/Galeria/Dibujo12.jpg", cat: "Digital", tecnica: "Digital Art", año: "2026", desc: "Contraste de azules profundos." },
  { id: 13, titulo: "Obra Final", img: "/Galeria/Dibujo13.jpg", src: "/Galeria/Dibujo13.jpg", cat: "Masterpiece", tecnica: "Masterpiece", año: "2026", desc: "Culminación del portafolio." },
  { id: 14, titulo: "Vanguardia", img: "/Galeria/Dibujo14.jpg", src: "/Galeria/Dibujo14.jpg", cat: "Digital", tecnica: "Digital Paint", año: "2026", desc: "Nuevas formas de expresión." },
  { id: 15, titulo: "Fragmentos", img: "/Galeria/Dibujo15.jpg", src: "/Galeria/Dibujo15.jpg", cat: "Mixed Media", tecnica: "Mixed Media", año: "2026", desc: "Composición abstracta." },
  { id: 16, titulo: "Espejo", img: "/Galeria/Dibujo16.jpg", src: "/Galeria/Dibujo16.jpg", cat: "Digital", tecnica: "Digital Art", año: "2026", desc: "Simetría visual." },
  { id: 17, titulo: "Origen", img: "/Galeria/Dibujo17.jpg", src: "/Galeria/Dibujo17.jpg", cat: "Concept", tecnica: "Concept Art", año: "2026", desc: "Bocetos de mundo." },
  { id: 18, titulo: "Sinfonía", img: "/Galeria/Dibujo18.jpg", src: "/Galeria/Dibujo18.jpg", cat: "Digital", tecnica: "Digital Paint", año: "2026", desc: "Ritmo en el color." },
];

export default function Galeria({ onSelectObra }: any) {
  const duplicadoObras = [...obras, ...obras]; 

  return (
    <section className="bg-transparent border-t border-[#c5a358]/20 py-24 overflow-hidden relative z-20" id="venta">
      <div className="flex">
        <motion.div 
          className="flex gap-12"
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ 
            ease: "linear", 
            duration: 200, 
            repeat: Infinity 
          }}
        >
          {duplicadoObras.map((obra, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[300px] md:w-[450px] select-none group cursor-pointer"
              onClick={() => onSelectObra && onSelectObra(obra)} 
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-[#c5a358]/10 bg-[#fdf2f4]/30 rounded-sm">
                <img 
                  src={obra.img} 
                  alt={obra.titulo}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
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
        </motion.div>
      </div>
    </section>
  );
}