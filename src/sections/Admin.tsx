import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);

  // NUEVOS ESTADOS: Para listar obras y saber si estamos editando
  const [obrasList, setObrasList] = useState<any[]>([]);
  const [obraEditando, setObraEditando] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingAuth(false);
      if (session) cargarObras(); // Carga la lista al iniciar sesión
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) cargarObras();
    });
    return () => subscription.unsubscribe();
  }, []);

  // FUNCIÓN PARA OBTENER TODAS LAS OBRAS DE LA BASE DE DATOS
  const cargarObras = async () => {
    const { data } = await supabase.from('obras').select('*').order('id', { ascending: false });
    if (data) setObrasList(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Error de acceso: " + error.message);
  };

  // FUNCIÓN MODIFICADA: CREA NUEVAS O ACTUALIZA EXISTENTES
  const handleUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    const form = e.currentTarget;
    const file = (form.imagen as HTMLInputElement).files?.[0];

    // Si es nueva, la imagen es obligatoria. Si estamos editando, es opcional.
    if (!file && !obraEditando) { 
      alert("Por favor selecciona una imagen"); 
      setUploading(false); 
      return; 
    }

    try {
      let publicUrl = obraEditando?.url_imagen; // Si editas pero no subes foto, mantiene la vieja

      if (file) {
        // 1. Borramos la imagen vieja ANTES de subir la nueva para evitar que se quede pegada en pantalla
        if (obraEditando && obraEditando.url_imagen) {
          const oldFilename = obraEditando.url_imagen.split('/').pop();
          if (oldFilename) await supabase.storage.from('dibujos').remove([oldFilename]);
        }

        // 2. Subimos la nueva imagen asegurando un ID único
        const filePath = `obra_${Date.now()}.${file.name.split('.').pop()}`;
        const { error: uploadError } = await supabase.storage.from('dibujos').upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('dibujos').getPublicUrl(filePath);
        publicUrl = data.publicUrl;
      }

      const obraData = {
        titulo: (form.titulo as HTMLInputElement).value,
        tecnica: (form.tecnica as HTMLInputElement).value,
        año: (form.año as HTMLInputElement).value,
        descripcion: (form.descripcion as HTMLTextAreaElement).value,
        categoria: (form.categoria as HTMLInputElement).value,
        destino: (form.destino as HTMLSelectElement).value,
        url_imagen: publicUrl
      };

      if (obraEditando) {
        // ACTUALIZAR OBRA
        const { error: dbError } = await supabase.from('obras').update(obraData).eq('id', obraEditando.id);
        if (dbError) throw dbError;
        alert("¡Obra actualizada con éxito!");
        setObraEditando(null); // Sale del modo edición
      } else {
        // CREAR NUEVA OBRA
        const { error: dbError } = await supabase.from('obras').insert([obraData]);
        if (dbError) throw dbError;
        alert("¡Obra publicada con éxito!");
      }

      form.reset();
      cargarObras(); // Refresca la galería
    } catch (error: any) { alert("Error: " + error.message); } 
    finally { setUploading(false); }
  };

  // FUNCIÓN PARA RELLENAR EL FORMULARIO AL EDITAR
  const cargarDatosEdicion = (obra: any) => {
    setObraEditando(obra);
    const form = document.getElementById('form-obras') as HTMLFormElement;
    if(form) {
      form.titulo.value = obra.titulo;
      form.tecnica.value = obra.tecnica;
      form.año.value = obra.año;
      form.descripcion.value = obra.descripcion;
      form.categoria.value = obra.categoria;
      form.destino.value = obra.destino;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Te sube al formulario
  };

  // CANCELAR LA EDICIÓN
  const cancelarEdicion = () => {
    setObraEditando(null);
    const form = document.getElementById('form-obras') as HTMLFormElement;
    if(form) form.reset();
  };

  // FUNCIÓN BULK PARA ELIMINAR CATEGORÍA (Mueve dibujos a "Sin Categoría")
  const handleEliminarCategoria = async (categoriaTarget: string) => {
    if(!window.confirm(`¿Estás seguro de borrar la categoría "${categoriaTarget}"? Todos los dibujos en esta categoría pasarán a "Sin Categoría".`)) return;
    
    try {
      setUploading(true);
      // Actualiza masivamente todas las obras que tengan esta categoría
      const { error } = await supabase.from('obras').update({ categoria: 'Sin Categoría' }).eq('categoria', categoriaTarget);
      if (error) throw error;
      
      alert(`Categoría "${categoriaTarget}" eliminada con éxito.`);
      cargarObras(); // Refresca la lista de obras y categorías
    } catch (error: any) {
      alert("Error al eliminar categoría: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // FUNCIÓN PARA ELIMINAR OBRA TOTALMENTE
  const handleEliminarObra = async (id: number, url_imagen: string) => {
    if(!window.confirm("¿Estás seguro de que deseas eliminar esta obra permanentemente?")) return;

    try {
      // 1. Borra de la tabla de la Base de Datos
      const { error: dbError } = await supabase.from('obras').delete().eq('id', id);
      if (dbError) throw dbError;

      // 2. Borra la imagen del Storage para no ocupar espacio basura
      const filename = url_imagen.split('/').pop();
      if(filename) {
        await supabase.storage.from('dibujos').remove([filename]);
      }

      cargarObras(); // Refresca la galería
    } catch (error: any) {
      alert("Error al eliminar: " + error.message);
    }
  };

  // Actualizar Fondo o Perfil (Sin cambios en tu lógica original)
  const handleUpdateConfig = async (e: React.FormEvent<HTMLFormElement>, configId: 'fondo' | 'perfil') => {
    e.preventDefault();
    setUploading(true);
    const form = e.currentTarget;
    const file = (form.imagen as HTMLInputElement).files?.[0];

    if (!file) { alert("Selecciona una imagen"); setUploading(false); return; }

    try {
      const filePath = `config_${configId}_${Date.now()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('dibujos').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('dibujos').getPublicUrl(filePath);

      const { error: dbError } = await supabase.from('web_config').upsert({ id: configId, url_imagen: publicUrl });
      if (dbError) throw dbError;

      alert(`¡${configId.toUpperCase()} actualizado con éxito! Recarga la página para ver los cambios.`);
      form.reset();
    } catch (error: any) { alert("Error: " + error.message); } 
    finally { setUploading(false); }
  };

  if (loadingAuth) return <div className="min-h-screen pt-32 px-6 bg-[#fff5f7] flex justify-center items-start text-[#c5a358] font-mono text-xs uppercase tracking-widest">Verificando credenciales...</div>;

  if (!session) {
    return (
      <div className="min-h-screen pt-32 px-6 bg-[#fff5f7] flex justify-center items-start z-[500] relative">
        <div className="w-full max-w-md bg-white p-8 border border-[#c5a358]/30 shadow-2xl relative">
          <h2 className="text-2xl font-serif text-slate-900 mb-6 border-b border-[#c5a358]/20 pb-4 text-center">Acceso Restringido</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 font-mono text-[11px] uppercase tracking-widest text-slate-800">
            <input type="email" placeholder="Email Admin" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="username" className="p-3 border border-[#c5a358]/40 normal-case outline-none focus:border-[#c5a358]" />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" className="p-3 border border-[#c5a358]/40 normal-case outline-none focus:border-[#c5a358]" />
            <button type="submit" className="mt-4 bg-slate-900 text-[#c5a358] py-4 uppercase font-black hover:bg-[#c5a358] hover:text-white transition-all">Ingresar al Sistema</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6 bg-[#fff5f7] flex justify-center items-start z-[500] relative pb-20">
      <div className="w-full max-w-6xl bg-white p-6 md:p-10 border border-[#c5a358]/30 shadow-2xl relative grid md:grid-cols-5 gap-10">
        
        <button onClick={async () => { await supabase.auth.signOut(); window.location.hash = ''; }} className="absolute top-6 right-6 text-[10px] font-mono uppercase tracking-widest font-bold text-red-400 hover:text-red-700 transition-colors z-10">
          [ Salir ]
        </button>

        {/* COLUMNA IZQUIERDA: GESTOR DE OBRAS */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-serif text-slate-900 mb-6 border-b border-[#c5a358]/20 pb-4">
            {obraEditando ? (
              <span className="text-blue-600">Modo Edición: {obraEditando.titulo}</span>
            ) : "Gestor de Obras"}
          </h2>
          
          <form id="form-obras" onSubmit={handleUploadSubmit} className="flex flex-col gap-4 font-mono text-[11px] uppercase tracking-widest text-slate-800">
            
            <div className="flex flex-col gap-2">
              <label className="text-[#c5a358] font-bold">¿Dónde mostrar esta obra? *</label>
              <select required name="destino" className="p-3 border border-[#c5a358]/40 normal-case outline-none bg-white font-bold text-slate-900">
                <option value="Ambos">En la Galería y en el Carrusel</option>
                <option value="Galeria">Solo en la Galería (Cuadrícula)</option>
                <option value="Carrusel">Solo en el Carrusel de Inicio</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#c5a358] font-bold">
                Imagen de la Obra {obraEditando ? <span className="text-slate-500">(Opcional: Solo si deseas cambiarla)</span> : '*'}
              </label>
              <input name="imagen" type="file" accept="image/*" className="p-2 border border-[#c5a358]/40" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[#c5a358] font-bold">Título *</label>
                <input required name="titulo" type="text" className="p-3 border border-[#c5a358]/40 normal-case" />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-[#c5a358] font-bold">Categoría *</label>
                <input 
                  required 
                  name="categoria" 
                  list="lista-categorias" 
                  placeholder="Selecciona o escribe una nueva..." 
                  autoComplete="off"
                  className="p-3 border border-[#c5a358]/40 normal-case outline-none focus:border-[#c5a358] bg-white cursor-text" 
                />
                <datalist id="lista-categorias">
                  {/* Extrae las categorías únicas directamente de la DB sin repetir */}
                  {Array.from(new Set(obrasList.map(o => o.categoria))).filter(Boolean).map(cat => (
                    <option key={cat as string} value={cat as string} />
                  ))}
                </datalist>
                <span className="text-[9px] text-slate-400 font-mono tracking-widest leading-tight mt-1">
                  * TIP: Despliega para elegir o escribe para crear. Las categorías sin obras se borran solas.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[#c5a358] font-bold">Técnica *</label>
                <input required name="tecnica" type="text" className="p-3 border border-[#c5a358]/40 normal-case" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#c5a358] font-bold">Año *</label>
                <input required name="año" type="text" defaultValue="2026" className="p-3 border border-[#c5a358]/40 normal-case" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#c5a358] font-bold">Descripción *</label>
              <textarea required name="descripcion" rows={2} className="p-3 border border-[#c5a358]/40 normal-case resize-none"></textarea>
            </div>

            <div className="flex gap-4 mt-2">
              <button type="submit" disabled={uploading} className="flex-1 bg-slate-900 text-[#c5a358] py-4 uppercase font-black hover:bg-[#c5a358] hover:text-white transition-all disabled:opacity-50">
                {uploading ? 'PROCESANDO...' : (obraEditando ? 'GUARDAR CAMBIOS' : 'PUBLICAR OBRA')}
              </button>
              {obraEditando && (
                <button type="button" onClick={cancelarEdicion} className="bg-red-50 text-red-600 px-6 uppercase font-black hover:bg-red-600 hover:text-white transition-all border border-red-200">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* COLUMNA DERECHA: PERSONALIZACIÓN WEB */}
        <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-[#c5a358]/20 pt-8 md:pt-0 md:pl-8">
          <h2 className="text-2xl font-serif text-slate-900 mb-6 border-b border-[#c5a358]/20 pb-4">Apariencia Web</h2>
          
          <form onSubmit={(e) => handleUpdateConfig(e, 'fondo')} className="flex flex-col gap-3 mb-8 bg-slate-50 p-4 border border-[#c5a358]/10">
            <label className="text-[#c5a358] font-bold text-[10px] font-mono uppercase tracking-widest">Fondo de Pantalla</label>
            <input required name="imagen" type="file" accept="image/*" className="text-[10px]" />
            <button type="submit" disabled={uploading} className="bg-slate-200 text-slate-800 px-4 py-2 uppercase font-black text-[10px] hover:bg-[#c5a358] hover:text-white transition-all disabled:opacity-50">Actualizar Fondo</button>
          </form>

          <form onSubmit={(e) => handleUpdateConfig(e, 'perfil')} className="flex flex-col gap-3 bg-slate-50 p-4 border border-[#c5a358]/10">
            <label className="text-[#c5a358] font-bold text-[10px] font-mono uppercase tracking-widest">Foto de Perfil</label>
            <input required name="imagen" type="file" accept="image/*" className="text-[10px]" />
            <button type="submit" disabled={uploading} className="bg-slate-200 text-slate-800 px-4 py-2 uppercase font-black text-[10px] hover:bg-[#c5a358] hover:text-white transition-all disabled:opacity-50">Actualizar Perfil</button>
          </form>

          {/* GESTOR DE CATEGORÍAS */}
          <div className="mt-8 border-t border-[#c5a358]/20 pt-8">
            <h2 className="text-xl font-serif text-slate-900 mb-4 border-b border-[#c5a358]/20 pb-2">Gestor de Categorías</h2>
            <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto scrollbar-gold pr-3 pb-2">
              {Array.from(new Set(obrasList.map(o => o.categoria))).filter(c => c && c !== 'Sin Categoría').map((cat) => (
                <div key={cat as string} className="flex justify-between items-center bg-white p-3 border border-[#c5a358]/30 shadow-sm">
                  <span className="font-mono text-[11px] font-black text-slate-800 uppercase tracking-widest truncate mr-2">{cat as string}</span>
                  <button 
                    onClick={() => handleEliminarCategoria(cat as string)} 
                    disabled={uploading}
                    className="text-[9px] uppercase font-black text-red-500 hover:text-white hover:bg-red-500 border border-red-500 px-3 py-1 transition-all rounded-sm disabled:opacity-50"
                  >
                    Borrar
                  </button>
                </div>
              ))}
              {Array.from(new Set(obrasList.map(o => o.categoria))).filter(c => c && c !== 'Sin Categoría').length === 0 && (
                <p className="text-[10px] text-slate-500 font-mono text-center py-4">No hay categorías creadas aún.</p>
              )}
            </div>
            <p className="text-[9px] text-slate-400 font-mono mt-3 leading-tight">
              * TIP: Para crear una nueva, escríbela al publicar o editar una obra.
            </p>
          </div>

        </div>

        {/* =========================================
            NUEVA SECCIÓN: LISTA VISUAL DE TUS OBRAS
        ========================================= */}
        <div className="md:col-span-5 border-t border-[#c5a358]/20 pt-10 mt-6">
          <h2 className="text-2xl font-serif text-slate-900 mb-6 border-b border-[#c5a358]/20 pb-4">Obras Publicadas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {obrasList.map(obra => (
              <div key={obra.id} className="border border-[#c5a358]/20 bg-slate-50 p-2 flex flex-col gap-3 relative group transition-all hover:border-[#c5a358]">
                <img src={obra.url_imagen} alt={obra.titulo} className="w-full aspect-square object-cover" />
                
                <div className="flex flex-col flex-1 px-1">
                  <span className="font-mono text-[9px] text-[#c5a358] font-bold uppercase truncate">{obra.categoria}</span>
                  <span className="font-mono text-xs font-black text-slate-800 truncate">{obra.titulo}</span>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => cargarDatosEdicion(obra)} className="flex-1 bg-slate-200 text-slate-800 border border-slate-300 text-[10px] py-2 uppercase font-black hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors cursor-pointer">
                    Editar
                  </button>
                  <button onClick={() => handleEliminarObra(obra.id, obra.url_imagen)} className="flex-1 bg-red-50 text-red-600 border border-red-200 text-[10px] py-2 uppercase font-black hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                    Borrar
                  </button>
                </div>
              </div>
            ))}
            
            {obrasList.length === 0 && (
               <p className="font-mono text-xs text-slate-500 col-span-full py-10 text-center border border-dashed border-[#c5a358]/40">
                 No hay obras publicadas aún. Usa el formulario de arriba para añadir tu primer arte.
               </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}