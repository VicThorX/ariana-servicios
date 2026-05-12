"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Scale, FileCheck } from "lucide-react";

export default function LegalSecurity() {
  return (
    <section
      id="tranquilidad-legal"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Background — Dramatic dark gradient for visual dominance */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-brand-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>

      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/8 dark:bg-cyan-500/8 blur-[120px] rounded-full pointer-events-none translate-y-1/3" />

      {/* Pattern overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-brand-300 dark:text-brand-400 text-sm font-bold tracking-wide border border-white/10">
              <Scale className="w-4 h-4" />
              Argumento B2B Principal
            </span>
          </div>

          {/* Main Shield Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-10"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] bg-gradient-to-br from-brand-500/20 to-teal-500/20 dark:from-brand-500/15 dark:to-cyan-500/15 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-2xl shadow-brand-500/20">
              <ShieldCheck className="w-12 h-12 md:w-14 md:h-14 text-brand-400 dark:text-brand-300" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight"
          >
            Tranquilidad legal<span className="text-brand-400">.</span>
          </motion.h2>

          {/* Body Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-slate-300 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Garantizamos a nuestros clientes la cobertura legal de nuestro capital humano, bajo las normas del Sindicato de Maestranza (ente regulador), y Ministerio de Trabajo. Brindando transparencia en la documentación del personal, y todos sus aportes correspondientes.
          </motion.p>

          {/* Accent bottom indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14"
          >
            <div className="flex items-center gap-3 text-sm font-bold text-slate-400 uppercase tracking-wider">
              <FileCheck className="w-5 h-5 text-brand-400" />
              ART y Seguro de Vida
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
            <div className="flex items-center gap-3 text-sm font-bold text-slate-400 uppercase tracking-wider">
              <Scale className="w-5 h-5 text-brand-400" />
              Sindicato de Maestranza
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
            <div className="flex items-center gap-3 text-sm font-bold text-slate-400 uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5 text-brand-400" />
              Ministerio de Trabajo
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
