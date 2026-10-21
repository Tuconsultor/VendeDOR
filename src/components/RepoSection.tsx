import { useEffect, useRef, useState } from 'react';
import { repositoryUrl, resourceFolders, resourceUrl } from '../lib/resources';

export default function RepoSection() {
  const [activeFolder, setActiveFolder] = useState(0);
  const [document, setDocument] = useState<{ path: string; content: string } | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const request = useRef<AbortController | null>(null);
  const reader = useRef<HTMLDivElement>(null);
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => { if (document) reader.current?.focus(); }, [document]);

  async function load(path: string, copy = false) {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setError(''); setMessage(''); setLoading(true);
    try {
      const response = await fetch(resourceUrl(path), { signal: controller.signal });
      if (!response.ok || response.headers.get('content-type')?.includes('text/html')) {
        throw new Error('No se pudo cargar el archivo. Prueba a abrirlo en GitHub.');
      }
      const content = await response.text();
      if (controller.signal.aborted) return;
      setDocument({ path, content });
      if (copy) {
        try {
          await navigator.clipboard.writeText(content);
          setMessage(`Contenido de ${path} copiado.`);
        } catch {
          setError('El navegador no permitió copiar. Puedes seleccionar el texto del lector o descargar el archivo.');
        }
      }
    } catch (cause) {
      if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'No se pudo abrir el recurso.');
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  const folder = resourceFolders[activeFolder];
  return (
    <section id="repo" className="scroll-mt-20 py-20 px-4 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Recursos para ponerlo en marcha</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Lee la guía, practica con datos ficticios y adapta los prompts a tu negocio. Cada archivo se puede abrir, copiar completo o descargar.</p>
          <a className="inline-block mt-4 text-violet-300 underline" href={`${repositoryUrl}/archive/refs/heads/main.zip`}>Descargar todo el repositorio (.zip)</a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <nav aria-label="Carpetas de recursos" className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            {resourceFolders.map((item, index) => (
              <button key={item.name} aria-pressed={index === activeFolder} onClick={() => setActiveFolder(index)}
                className={`block w-full text-left px-3 py-3 rounded-lg ${index === activeFolder ? 'bg-violet-900/40 text-violet-200' : 'text-gray-400 hover:bg-gray-800'}`}>{item.name}/</button>
            ))}
            <a className="block px-3 py-3 text-sm text-gray-300 underline" href={`${repositoryUrl}/tree/main/public/repo`}>Ver recursos en GitHub ↗</a>
          </nav>
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="font-mono text-lg text-violet-300">{folder.name}/</h3>
            <p className="text-gray-400 text-sm mt-2 mb-5">{folder.description}</p>
            <ul className="space-y-3">
              {folder.files.map(([name, description]) => {
                const path = `${folder.name}/${name}`;
                return <li key={path} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <h4 className="font-mono break-all">{name}</h4>
                  <p className="text-sm text-gray-400 my-2">{description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-violet-200">
                    <button className="underline" onClick={() => load(path)} aria-label={`Abrir ${name}`}>Abrir</button>
                    <button className="underline" onClick={() => load(path, true)} aria-label={`Copiar contenido de ${name}`}>Copiar contenido</button>
                    <a className="underline" href={resourceUrl(path)} download={name}>Descargar</a>
                  </div>
                </li>;
              })}
            </ul>
          </div>
        </div>
        <p role="status" aria-live="polite" className="mt-4 text-emerald-300">{loading ? 'Cargando recurso…' : message}</p>
        {error && <p role="alert" className="mt-3 text-amber-200">{error}</p>}
        {document && <div ref={reader} tabIndex={-1} aria-label={`Contenido de ${document.path}`} className="mt-6 bg-gray-900 border border-violet-700 rounded-xl p-5 focus:outline-violet-400">
          <div className="flex flex-wrap justify-between gap-4 mb-4">
            <h3 className="font-mono break-all text-violet-200">{document.path}</h3>
            <button className="text-gray-300 underline" onClick={() => setDocument(null)}>Cerrar lector</button>
          </div>
          <pre className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-200 max-h-[36rem] overflow-auto">{document.content}</pre>
        </div>}
      </div>
    </section>
  );
}
