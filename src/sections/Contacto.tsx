import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contacto() {
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mnjzzzwn", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <section className="py-24 px-6 md:px-20" id="contacto">
      <div className="max-w-3xl mx-auto">
        
        {/* Encabezado Dorado */}
        <div className="text-center mb-16">
          <span className="font-mono text-[12px] uppercase tracking-[0.6em] text-[#c5a358] mb-4 block font-black">
            Project Inquiry
          </span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight bg-gradient-to-b from-[#c5a358] via-[#a68a4a] to-[#c5a358] bg-clip-text text-transparent italic px-4">
            Contáctame
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-16 h-[1px] bg-[#c5a358]/40"></div>
            <div className="w-2 h-2 rounded-full bg-[#c5a358] shadow-[0_0_8px_#c5a358]"></div>
            <div className="w-16 h-[1px] bg-[#c5a358]/40"></div>
          </div>
        </div>

        {status === "SUCCESS" ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white/30 border border-[#c5a358]/30 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-serif text-slate-900 mb-4 italic">¡Mensaje Enviado!</h3>
            <p className="font-mono text-[11px] uppercase tracking-widest text-slate-600 mb-8">
              Gracias por escribirnos. CoolDraw se pondrá en contacto contigo pronto.
            </p>
            <button 
              onClick={() => setStatus("IDLE")}
              className="text-[#c5a358] font-black uppercase text-[10px] tracking-widest border-b border-[#c5a358]"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 font-mono text-[11px] uppercase tracking-widest text-slate-800"
          >
            {/* Nombre o Empresa */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <label className="text-[#a68a4a] font-black border-l-2 border-[#c5a358] pl-2 text-xs">Nombre o Empresa *</label>
              <input required name="nombre_o_empresa" type="text" placeholder="Tu nombre o marca" className="bg-white/50 border border-[#c5a358]/40 p-3 outline-none focus:border-[#c5a358] focus:bg-white transition-all text-slate-900 normal-case text-sm font-sans shadow-sm" />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <label className="text-[#a68a4a] font-black border-l-2 border-[#c5a358] pl-2 text-xs">Email *</label>
              <input required name="email" type="email" className="bg-white/50 border border-[#c5a358]/40 p-3 outline-none focus:border-[#c5a358] transition-all text-slate-900 normal-case text-sm font-sans" />
            </div>

            {/* Teléfono */}
            <div className="flex flex-col gap-3">
              <label className="text-[#a68a4a] font-black border-l-2 border-[#c5a358] pl-2 text-xs">Teléfono</label>
              <input name="telefono" type="tel" className="bg-white/50 border border-[#c5a358]/40 p-3 outline-none focus:border-[#c5a358] transition-all text-slate-900 normal-case text-sm font-sans" />
            </div>

            {/* Presupuesto */}
            <div className="flex flex-col gap-3">
              <label className="text-[#a68a4a] font-black border-l-2 border-[#c5a358] pl-2 text-xs">Presupuesto (S/)</label>
              <input name="presupuesto" type="text" placeholder="Ej: A convenir" className="bg-white/50 border border-[#c5a358]/40 p-3 outline-none focus:border-[#c5a358] transition-all text-slate-900 normal-case text-sm font-sans" />
            </div>

            {/* Entrega */}
            <div className="flex flex-col gap-3">
              <label className="text-[#a68a4a] font-black border-l-2 border-[#c5a358] pl-2 text-xs">Entrega deseada</label>
              <input name="deadline" type="text" placeholder="Ej: 2 semanas" className="bg-white/50 border border-[#c5a358]/40 p-3 outline-none focus:border-[#c5a358] transition-all text-slate-900 normal-case text-sm font-sans" />
            </div>

            {/* Mensaje */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <label className="text-[#a68a4a] font-black border-l-2 border-[#c5a358] pl-2 text-xs">Detalles del proyecto *</label>
              <textarea required name="mensaje" rows={5} className="bg-white/50 border border-[#c5a358]/40 p-4 outline-none focus:border-[#c5a358] transition-all text-slate-900 normal-case text-sm font-sans resize-none"></textarea>
            </div>

            {/* Checkbox */}
            <div className="md:col-span-2 flex items-start gap-4 pt-4">
              <input required type="checkbox" name="permiso" id="permiso" className="mt-1 w-5 h-5 accent-[#c5a358] cursor-pointer" />
              <label htmlFor="permiso" className="normal-case text-[11px] leading-relaxed text-slate-800 font-medium">
                Acepto la publicación en el portafolio de <span className="text-[#c5a358] font-bold">CoolDraw</span>.
              </label>
            </div>

            {/* Botón */}
            <div className="md:col-span-2 flex flex-col items-center gap-4 pt-10">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={status === "SENDING"}
                className="bg-[#c5a358] text-white px-20 py-5 uppercase font-black tracking-[0.4em] transition-all shadow-2xl text-[12px] disabled:opacity-50"
              >
                {status === "SENDING" ? "Enviando..." : "Solicitar Mensaje"}
              </motion.button>
              {status === "ERROR" && <p className="text-red-500 text-[10px]">Hubo un error, intenta de nuevo.</p>}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}