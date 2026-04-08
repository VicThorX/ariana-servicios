"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
        <Link href="/" className="flex items-end gap-2 group">
          <span 
            className="text-4xl xl:text-5xl drop-shadow-sm transition-transform duration-300 group-hover:scale-105" 
            style={{ 
              fontFamily: "'Harrington', 'Gabriela', cursive, serif",
              color: "#8ab4d7" // Color celeste extraído de la tarjeta
            }}
          >
            ARIANA
          </span>
          <div className={`flex flex-col pb-1 transition-colors duration-300 ${scrolled ? 'text-slate-500 dark:text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase leading-none">Servicios</span>
            <span className="text-[0.55rem] tracking-widest uppercase leading-none mt-0.5 opacity-80">de Limpieza</span>
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
