"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between border-b-0">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Isotipo: Cuadro con gradiente y destello */}
          <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-brand-600 to-cyan-500 rounded-[0.8rem] flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-brand-500/20">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          {/* Wordmark Corporativo */}
          <div className="flex flex-col justify-center">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-none transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">
              ARIANA<span className="text-brand-500">.</span>
            </span>
            <span className="text-[0.60rem] md:text-xs tracking-[0.25em] text-slate-500 dark:text-slate-400 font-bold uppercase leading-none mt-0.5 md:mt-1">
              Servicios de Limpieza
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="#servicios" className="text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors">Servicios</Link>
          <Link href="#beneficios" className="text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors">Beneficios</Link>
          <Link href="#clientes" className="text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors">Clientes</Link>
          <Link href="#contacto" className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-all shadow-md shadow-brand-500/20 hover:-translate-y-0.5">
            Contactar
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-900 dark:text-white p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <div 
        className={`absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-lg px-6 flex flex-col md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-80 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <Link href="#servicios" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 font-medium py-3 border-b border-slate-100 dark:border-slate-800">Servicios</Link>
        <Link href="#beneficios" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 font-medium py-3 border-b border-slate-100 dark:border-slate-800">Beneficios</Link>
        <Link href="#clientes" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 font-medium py-3">Clientes</Link>
        <Link href="#contacto" onClick={() => setMobileMenuOpen(false)} className="mt-4 w-full text-center px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors">
          Contactar
        </Link>
      </div>
    </header>
  );
}
