"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-x-clip">
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/15 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-16 text-center max-w-5xl relative z-10 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-semibold tracking-wide border border-brand-200 dark:border-brand-800">
            <Award className="w-4 h-4" />
            Empresa Familiar desde 2003 en Mar del Plata
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight"
        >
          La excelencia e higiene que tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">empresa y ecosistema</span> merecen
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Soluciones corporativas de limpieza integral y mantenimiento para <strong>bancos, oficinas, gimnasios y consorcios</strong>. Aseguramos ambientes pulcros y asépticos asumiendo al 100% las responsabilidades y riesgos laborales por ti.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
        >
          <Link
            href="#contacto"
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all hover:-translate-y-1 active:scale-95 shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
          >
            Solicitar Presupuesto Especializado
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#beneficios"
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-bold transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
          >
            Nuestras Garantías B2B
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
