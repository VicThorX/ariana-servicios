"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Award } from "lucide-react";

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-x-clip relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Columna Izquierda: Años de Experiencia (Estilo B2B Gigante) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decoración geométrica sutil */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl -z-10"></div>
            
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-8xl md:text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-brand-600 to-cyan-400 pr-1 md:pr-2 pb-2">
                20
              </span>
              <span className="text-6xl md:text-7xl font-bold text-brand-500">+</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white leading-tight mb-6">
              Años garantizando <br className="hidden md:block" />
              la higiene y el confort.
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
              Desde el año 2003 nos desenvolvemos como proveedores integrales en el mercado, forjando un prestigio intachable basado en la confianza, el rigor institucional y la excelencia operativa.
            </p>
            
            <div className="mt-8 flex items-center gap-4 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              <Award className="w-6 h-6 text-brand-500" />
              Prestigio en Mar del Plata
            </div>
          </motion.div>
          
          {/* Columna Derecha: Misión y Objetivos corporativos */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Tarjeta Misión */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              {/* Ribbon decorativo lateral */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-500 transition-all duration-300 group-hover:w-2"></div>
              
              <div className="flex items-start gap-5">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 shrink-0">
                  <Target className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Misión y Objetivos</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Asegurar el bienestar absoluto y comodidad de nuestra cartera de clientes en consorcios y corporaciones, brindándoles diariamente un ambiente estructural confortable, aséptico e higiénico.
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta Confiabilidad */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500 transition-all duration-300 group-hover:w-2"></div>
              
              <div className="flex items-start gap-5">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Confiabilidad Legal</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Sabemos que en el mundo B2B reducir al mínimo el riesgo es indispensable. Protegemos al consorcio operando bajo las más estrictas normativas y seguros a nivel nacional.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
