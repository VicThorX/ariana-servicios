import Link from "next/link";
import { Heart } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-brand-100 via-white to-teal-100 text-brand-900 py-16 border-t border-brand-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/50 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/30 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-24 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Logo />
            <p className="text-base leading-relaxed max-w-sm font-medium text-brand-800">
              Cuidamos y mantenemos espacios con el más alto nivel de confiabilidad, porque tu tranquilidad es nuestro motor.
            </p>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-brand-900 font-bold mb-6 tracking-wider uppercase text-sm flex items-center gap-2">
              <Heart className="w-4 h-4 text-teal-500" /> Explorar
            </h4>
            <ul className="space-y-4 text-sm font-bold text-brand-800">
              <li><Link href="#nosotros" className="hover:text-teal-600 transition-colors flex items-center gap-2">Quiénes Somos</Link></li>
              <li><Link href="#clientes" className="hover:text-teal-600 transition-colors flex items-center gap-2">Nuestros Clientes</Link></li>
              <li><Link href="#servicios" className="hover:text-teal-600 transition-colors flex items-center gap-2">Servicios Integrales</Link></li>
              <li><Link href="#productos" className="hover:text-teal-600 transition-colors flex items-center gap-2">Insumos y Productos</Link></li>
              <li><Link href="#beneficios" className="hover:text-teal-600 transition-colors flex items-center gap-2">Garantía de Confianza</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-brand-900 font-bold mb-6 tracking-wide uppercase text-sm">Contacto</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-teal-600 border border-white/50 shrink-0 shadow-sm">📞</span>
                <div>
                  <span className="block text-[0.65rem] uppercase text-brand-600 font-bold">Atención Personalizada 1</span>
                  <span className="font-extrabold text-brand-900">+54 223 522-0338</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-teal-600 border border-white/50 shrink-0 shadow-sm">📞</span>
                <div>
                  <span className="block text-[0.65rem] uppercase text-brand-600 font-bold">Atención Personalizada 2</span>
                  <span className="font-extrabold text-brand-900">+54 223 522-0582</span>
                </div>
              </li>
              <li className="flex items-center gap-3 pt-2 text-brand-800 font-bold">
                <span className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center border border-white/50 shrink-0 text-teal-600 shadow-sm">✉️</span>
                <a href="mailto:arianaservicios@hotmail.com" className="hover:text-teal-700 transition-colors break-all">
                  arianaservicios@hotmail.com
                </a>
              </li>
              <li className="pt-5 mt-3 border-t border-brand-200/80">
                <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 group" aria-label="Nuestro Instagram">
                  <span className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-teal-500 group-hover:text-white group-hover:bg-teal-500 border border-white/50 shadow-md transition-all group-hover:scale-110">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </span>
                  <span className="font-bold tracking-wide text-brand-800 group-hover:text-teal-600 transition-colors">
                    @SomosAriana
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-brand-200 text-xs text-brand-600 font-bold">
          <p>&copy; {currentYear} Somos Ariana Limpieza. Mar del Plata.</p>
          <p className="mt-2 md:mt-0">Con amor por nuestros espacios.</p>
        </div>
      </div>
    </footer>
  );
}
