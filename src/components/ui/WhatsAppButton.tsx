"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Building2, Briefcase, X, MessageSquare, ArrowRight, ShieldAlert } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const phoneNumber = "5492235220338";
  const message = "Hola Ariana! Vengo de la pagina web y me gustaría hacer una consulta comercial de limpieza.";
  const wppLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[340px] sm:w-[360px] bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-brand-100 dark:border-slate-800 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Fondo de adorno */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header del Popover */}
            <div className="flex items-center justify-between mb-4 border-b border-brand-50 dark:border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-850 dark:text-white leading-tight">Canal Directo Ariana</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">¿Cómo te podemos ayudar hoy?</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center transition-colors"
                aria-label="Cerrar ventana"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Opciones de contacto */}
            <div className="space-y-3">
              {/* Opción 1: Comercial / Cotizaciones */}
              <a
                href={wppLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-start gap-3 p-3.5 rounded-2xl bg-teal-50/50 hover:bg-[#25D366]/10 dark:bg-slate-850 dark:hover:bg-[#25D366]/15 border border-[#25D366]/20 transition-all hover:scale-[1.01]"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-[#25D366]/20 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-850 dark:text-white group-hover:text-[#25D366] transition-colors">
                      Consulta Comercial / Cotización
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5 font-medium">
                    Limpieza corporativa, consorcios e insumos.
                  </p>
                </div>
              </a>

              {/* Opción 2: Trabajar con nosotros / Enviar CV */}
              <Link
                href="/trabaja-con-nosotros"
                onClick={() => setIsOpen(false)}
                className="group flex items-start gap-3 p-3.5 rounded-2xl bg-brand-50/50 hover:bg-brand-100/60 dark:bg-slate-850 dark:hover:bg-slate-800 border border-brand-100 dark:border-slate-750 transition-all hover:scale-[1.01]"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-850 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      Quiero Enviar mi CV / Trabajar
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5 font-medium">
                    Ingresar a nuestro portal oficial de Selección.
                  </p>
                </div>
              </Link>
            </div>

            {/* Advertencia o nota aclaratoria */}
            <div className="mt-4 pt-3 border-t border-brand-50 dark:border-slate-800/80 flex items-center gap-2 text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20 px-3 py-2 rounded-xl border border-amber-200/50 dark:border-amber-900/30">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-500" />
              <span>Por disposición institucional, <strong>no se reciben Currículums vía WhatsApp</strong>.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante principal */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-xl text-white transition-all ${
          isOpen
            ? "bg-slate-800 hover:bg-slate-900 shadow-slate-900/40"
            : "bg-[#25D366] hover:bg-[#20bd5a] shadow-[#25D366]/30"
        }`}
        aria-label="Contactar por WhatsApp o Selección"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <svg 
            viewBox="0 0 24 24" 
            width="28" 
            height="28" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        )}
      </motion.button>
    </div>
  );
}

