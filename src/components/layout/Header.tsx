"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between border-b-0">
        {/* Logo Section */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 font-medium text-sm lg:text-base">
          <Link href="#nosotros" className="text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors duration-300">Nosotros</Link>
          <Link href="#clientes" className="text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors duration-300">Clientes</Link>
          <Link href="#servicios" className="text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors duration-300">Servicios</Link>
          <Link href="#productos" className="text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors duration-300">Insumos</Link>
          <Link href="#beneficios" className="text-slate-600 hover:text-teal-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors duration-300">Confianza</Link>
          <ThemeToggle />
          <Link href="#contacto" className="px-4 py-2 lg:px-6 lg:py-2.5 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white rounded-[2rem] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Contactar
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
        <Link href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium py-3 border-b border-white/50 dark:border-slate-800">Nosotros</Link>
        <Link href="#clientes" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium py-3 border-b border-white/50 dark:border-slate-800">Clientes</Link>
        <Link href="#servicios" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium py-3 border-b border-white/50 dark:border-slate-800">Servicios</Link>
        <Link href="#productos" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium py-3 border-b border-white/50 dark:border-slate-800">Nuestros Insumos</Link>
        <Link href="#beneficios" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium py-3 border-b border-white/50 dark:border-slate-800">Confianza</Link>
        <Link href="#contacto" onClick={() => setMobileMenuOpen(false)} className="mt-4 w-full text-center px-5 py-3 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white font-medium rounded-full transition-colors">
          Contactar
        </Link>
      </div>
    </header>
  );
}
