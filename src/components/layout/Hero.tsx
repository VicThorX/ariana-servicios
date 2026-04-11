"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-x-clip rounded-b-[4rem] md:rounded-b-[6rem] overflow-hidden -mt-2">
      {/* Background — Placeholder for hero imagery */}
      <div className="absolute inset-0 z-0">
        {/* 
          TODO: Reemplazar con imágenes macro de detalles de limpieza 
          (ej. teclados desinfectados, picaportes de bronce pulidos, zócalos de ascensor) 
        */}
        <img
          src="/hero-cleaning.png"
          alt="Lobby corporativo impecable — limpieza profesional de espacios"
          className="w-full h-full object-cover object-center"
        />
        {/* Light mode overlay */}
        <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/80 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-50 dark:from-slate-950 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 text-center max-w-4xl relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/30 dark:bg-slate-800/50 backdrop-blur-md text-brand-700 dark:text-brand-300 text-sm font-bold tracking-wide border border-white/60 dark:border-slate-700 shadow-sm">
            <Leaf className="w-4 h-4 text-teal-400 dark:text-emerald-400" />
            Dedicación y limpieza profesional desde 2003
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-8 leading-tight"
        >
          La limpieza que tus espacios <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-teal-500 dark:from-brand-400 dark:to-cyan-400">merecen sentir</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-700 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Brindamos soluciones integrales de mantenimiento para <strong>oficinas comerciales, públicas y privadas, comercios, instituciones educativas, de salud, financieras, gimnasios, consorcios</strong> y espacios en general. Ambientes relucientes con la calidez y seguridad que buscas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2"
        >
          {/* CTA principal: WhatsApp */}
          <a
            href="https://wa.me/5492235220338?text=Hola%20Ariana!%20Vengo%20de%20la%20pagina%20web%20y%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20institucional."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-[2rem] font-bold text-lg transition-all hover:-translate-y-1 active:scale-95 shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Escribinos por WhatsApp
            <ArrowRight className="w-5 h-5" />
          </a>
          <Link
            href="#beneficios"
            className="w-full sm:w-auto px-8 py-4 bg-white/30 dark:bg-slate-800 hover:bg-white/50 dark:hover:bg-slate-700 text-brand-800 dark:text-white border border-white/60 dark:border-slate-700 shadow-sm rounded-[2rem] font-bold text-lg transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            Nuestras Garantías
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
