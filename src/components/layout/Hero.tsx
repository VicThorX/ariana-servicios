"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-x-clip rounded-b-[4rem] md:rounded-b-[6rem] overflow-hidden -mt-2">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-warm.png" 
          alt="Ambiente cálido y limpio" 
          fill 
          priority 
          className="object-cover object-center" 
          sizes="100vw"
        />
        {/* Soft overlay to ensure readability while maintaining warmth */}
        <div className="absolute inset-0 bg-white/60 dark:bg-brand-950/70 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-50 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 text-center max-w-4xl relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/30 backdrop-blur-md text-brand-700 text-sm font-bold tracking-wide border border-white/60 shadow-sm">
            <Leaf className="w-4 h-4 text-teal-400" />
            Cuidado y limpieza humana desde 2003
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-800 dark:text-brand-50 mb-8 leading-tight"
        >
          La limpieza que tus espacios <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-teal-500">merecen sentir</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-700 dark:text-brand-200 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Brindamos soluciones integrales de mantenimiento para <strong>bancos, oficinas, y consorcios</strong> en Mar del Plata. Ambientes relucientes con el toque humano y la seguridad que buscas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2"
        >
          <Link
            href="#contacto"
            className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-[2rem] font-bold text-lg transition-all hover:-translate-y-1 active:scale-95 shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2"
          >
            Siente la diferencia
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#beneficios"
            className="w-full sm:w-auto px-8 py-4 bg-white/30 hover:bg-white/50 text-brand-800 border border-white/60 shadow-sm rounded-[2rem] font-bold text-lg transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            Nuestras Garantías
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
