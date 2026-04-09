"use client";

import { motion } from "framer-motion";
import { HandHeart, Sparkle, Heart } from "lucide-react";

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-white/40 dark:bg-brand-950 border-t border-brand-100 dark:border-brand-900 overflow-x-clip relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Columna Izquierda: Mensaje cercano */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-5/12 relative"
          >
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-teal-200/30 dark:bg-teal-900/20 rounded-full blur-3xl -z-10"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-sm border border-brand-200/50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <Heart className="w-3.5 h-3.5" />
              Nuestra Esencia
            </div>
            
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-brand-50 leading-tight mb-8">
              Cuidamos tu lugar <br className="hidden md:block" />
              como <span className="text-brand-500">nuestra casa.</span>
            </h3>
            
            <p className="text-slate-600 dark:text-brand-200 text-lg leading-relaxed mb-6 font-medium">
              Desde el año 2003, entendimos que detrás de cada pasillo, oficina o consorcio hay personas que merecen habitar espacios de absoluta pulcritud. 
            </p>
            <p className="text-slate-600 dark:text-brand-200 text-lg leading-relaxed font-medium">
              Somos una familia dedicada a aliviar las responsabilidades operativas de nuestros clientes mediante un equipo confiable, atento y verdaderamente comprometido, forjado en Mar del Plata.
            </p>
          </motion.div>
          
          {/* Columna Derecha: Valores Humanos */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-7/12 space-y-6"
          >
            {/* Tarjeta Empatía */}
            <div className="bg-brand-50/80 dark:bg-brand-900/30 rounded-[2.5rem] p-8 border border-white dark:border-brand-800 shadow-xl shadow-brand-200/20 dark:shadow-none hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="p-4 bg-white dark:bg-brand-800 rounded-[1.5rem] shadow-sm border border-brand-100 dark:border-brand-700 shrink-0">
                  <HandHeart className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-800 dark:text-brand-50 mb-3">Empatía y Confianza</h4>
                  <p className="text-slate-600 dark:text-brand-200 leading-relaxed font-medium">
                    Nuestro fin no es solo limpiar, sino generar lazos de confianza. Llevamos a cabo cada tarea asegurando el bienestar del entorno y protegiéndote de los riesgos laborales cotidianos con responsabilidad total.
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta Excelencia */}
            <div className="bg-brand-50/80 dark:bg-brand-900/30 rounded-[2.5rem] p-8 border border-white dark:border-brand-800 shadow-xl shadow-brand-200/20 dark:shadow-none hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="p-4 bg-white dark:bg-brand-800 rounded-[1.5rem] shadow-sm border border-brand-100 dark:border-brand-700 shrink-0">
                  <Sparkle className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-800 dark:text-brand-50 mb-3">Excelencia Cotidiana</h4>
                  <p className="text-slate-600 dark:text-brand-200 leading-relaxed font-medium">
                    Creemos en hacer bien las pequeñas cosas de todos los días. Con supervisiones preventivas y un equipo que siente pertenencia, mantenemos altos estándares de higiene para que puedas vivir con tranquilidad.
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
