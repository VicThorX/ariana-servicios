import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-24 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-cyan-500 rounded-[0.8rem] flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-brand-500/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-3xl font-extrabold tracking-tighter text-white transition-colors group-hover:text-brand-400">
                  ARIANA<span className="text-brand-500">.</span>
                </span>
              </div>
              <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase leading-none text-slate-500 mt-2 block">
                Servicios de Limpieza
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Proveedores integrales de limpieza y soluciones para administraciones de consorcios con el más alto nivel de confiabilidad legal y operativa.
            </p>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Navegación</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#nosotros" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> Quiénes Somos</Link></li>
              <li><Link href="#servicios" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> Servicios Especializados</Link></li>
              <li><Link href="#beneficios" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> Beneficios</Link></li>
              <li><Link href="#contacto" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> Solicitar Presupuesto</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-brand-400 border border-slate-800 shrink-0">📞</span>
                <div>
                  <span className="block text-[0.65rem] uppercase text-slate-500">Teléfono Corporativo 1</span>
                  <span className="font-bold text-slate-200">+54 223 522-0338</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-brand-400 border border-slate-800 shrink-0">📞</span>
                <div>
                  <span className="block text-[0.65rem] uppercase text-slate-500">Teléfono Corporativo 2</span>
                  <span className="font-bold text-slate-200">+54 223 522-0582</span>
                </div>
              </li>
              <li className="flex items-center gap-3 pt-2 text-brand-400">
                <span className="w-8 h-8 rounded-full bg-brand-900/30 flex items-center justify-center border border-brand-800/50">✉️</span>
                <a href="mailto:arianaservicios@hotmail.com" className="hover:underline font-medium">
                  arianaservicios@hotmail.com
                </a>
              </li>
              <li className="flex justify-start gap-4 pt-4 mt-2 border-t border-slate-800/80">
                {/* NOTA: Cambiar o rellenar el atributo href="#" con el link real de instagram cuando la clienta lo provea */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 border border-slate-800 shadow-md transition-all hover:scale-110" aria-label="Nuestro Instagram corporativo">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 text-xs text-slate-500">
          <p>&copy; {currentYear} Ariana Servicios. Mar del Plata.</p>
          <p className="mt-2 md:mt-0 font-medium">B2B Facility Management & Limpieza.</p>
        </div>
      </div>
    </footer>
  );
}
