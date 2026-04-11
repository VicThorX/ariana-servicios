import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // WhatsApp link
  const wppLink = "https://wa.me/5492235220338?text=Hola%20Ariana!%20Vengo%20de%20la%20pagina%20web%20y%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20institucional.";

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-24 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Logo isDark />
            <p className="text-sm leading-relaxed max-w-sm">
              Cuidamos y mantenemos espacios con el más alto nivel de confiabilidad, porque tu tranquilidad es nuestro motor.
            </p>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Navegación</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#nosotros" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> Quiénes Somos</Link></li>
              <li><Link href="#clientes" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> Nuestros Clientes</Link></li>
              <li><Link href="#servicios" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> Servicios Integrales</Link></li>
              <li><Link href="#productos" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> Insumos y Productos</Link></li>
              <li><Link href="#beneficios" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> Garantía de Confianza</Link></li>
            </ul>
          </div>

          {/* Contact Col — WhatsApp only (no phone numbers) */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Contacto</h4>
            <ul className="space-y-4 text-sm">
              {/* WhatsApp — Canal principal */}
              <li className="flex items-center gap-3">
                <a
                  href={wppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] border border-[#25D366]/20 shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-all group-hover:scale-110 shadow-md">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </span>
                  <span className="font-bold text-slate-200 group-hover:text-[#25D366] transition-colors">
                    WhatsApp Ariana
                  </span>
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3 pt-2 text-brand-400">
                <span className="w-8 h-8 rounded-full bg-brand-900/30 flex items-center justify-center border border-brand-800/50 shrink-0">✉️</span>
                <a href="mailto:arianaservicios@hotmail.com" className="hover:underline font-medium">
                  arianaservicios@hotmail.com
                </a>
              </li>

              {/* Instagram */}
              <li className="pt-4 mt-2 border-t border-slate-800/80">
                {/* NOTA: Cambiar href="#" con el link real de instagram cuando la clienta lo provea */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 group" aria-label="Nuestro Instagram corporativo">
                  <span className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 border border-slate-800 shadow-md transition-all group-hover:scale-110">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </span>
                  <span className="font-bold tracking-wide text-slate-400 group-hover:text-white transition-colors">
                    @SomosAriana
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 text-xs text-slate-500">
          <p>&copy; {currentYear} Somos Ariana Limpieza. Mar del Plata.</p>
          <p className="mt-2 md:mt-0 font-medium">B2B Facility Management & Limpieza.</p>
        </div>
      </div>
    </footer>
  );
}
