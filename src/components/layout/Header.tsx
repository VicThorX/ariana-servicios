"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const showBanner = pathname === "/productos";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper para generar enlaces relativos inteligentes
  const getLinkHref = (hash: string) => {
    return pathname === "/" ? hash : `/${hash}`;
  };

  return (
    <>
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white text-center py-2 px-4 text-[10px] md:text-xs font-bold flex items-center justify-center gap-2 shadow-sm select-none">
          <span>🚧 <strong>Sitio en Desarrollo:</strong> Algunas funcionalidades de cotización y carrito están operando en modo de simulación y pruebas.</span>
        </div>
      )}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? `glass shadow-sm py-3 ${showBanner ? "top-8" : "top-0"}`
            : `bg-transparent py-5 ${showBanner ? "top-8" : "top-0"}`
        }`}
      >
      <div className="container mx-auto px-6 flex items-center justify-between border-b-0">
        {/* Logo Section */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 font-medium text-sm lg:text-base">
          <Link href={getLinkHref("#nosotros")} className="text-slate-650 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors duration-300">Nosotros</Link>
          <Link href={getLinkHref("#servicios")} className="text-slate-650 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors duration-300">Servicios</Link>
          <Link href="/productos" className={`text-slate-650 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors duration-300 ${pathname === "/productos" ? "text-brand-600 dark:text-brand-400 font-bold" : ""}`}>Insumos y Tienda</Link>
          <Link href="/trabaja-con-nosotros" className={`text-slate-650 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors duration-300 ${pathname === "/trabaja-con-nosotros" ? "text-brand-600 dark:text-brand-400 font-bold" : ""}`}>Trabajá con Nosotros</Link>
          <ThemeToggle />
          <Link href={getLinkHref("#contacto")} className="px-4 py-2 lg:px-6 lg:py-2.5 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white rounded-[2rem] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 font-bold">
            Cotizar
          </Link>
        </nav>

        {/* Mobile: Theme Toggle + Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button 
            className="text-slate-800 dark:text-white p-2 hover:bg-brand-100/50 dark:hover:bg-slate-800 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <div 
        className={`absolute top-full left-0 right-0 bg-brand-50 dark:bg-slate-900 border-b border-brand-100 dark:border-slate-800 shadow-xl px-6 flex flex-col md:hidden transition-all duration-400 overflow-hidden rounded-b-3xl ${
          mobileMenuOpen ? "max-h-96 py-6 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <Link href={getLinkHref("#nosotros")} onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium py-3 border-b border-white/50 dark:border-slate-800">Nosotros</Link>
        <Link href={getLinkHref("#servicios")} onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium py-3 border-b border-white/50 dark:border-slate-800">Servicios Integraes</Link>
        <Link href="/productos" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium py-3 border-b border-white/50 dark:border-slate-800">Insumos y Tienda</Link>
        <Link href="/trabaja-con-nosotros" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium py-3 border-b border-white/50 dark:border-slate-800">Trabajá con Nosotros</Link>
        <Link href={getLinkHref("#contacto")} onClick={() => setMobileMenuOpen(false)} className="mt-4 w-full text-center px-5 py-3 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white font-medium rounded-full transition-colors">
          Cotizar Servicio
        </Link>
      </div>
    </header>
    </>
  );
}
