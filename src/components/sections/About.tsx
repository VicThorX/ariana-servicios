"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Award, HandHeart, Sparkle, Heart } from "lucide-react";

const values = [
  {
    title: "Misión y Objetivos",
    description: "Asegurar el bienestar absoluto y comodidad de nuestra cartera de clientes en consorcios y corporaciones, brindándoles diariamente un ambiente confortable, aséptico e higiénico.",
    icon: <Target className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
    ribbon: "bg-brand-500",
  },
  {
    title: "Empatía y Confianza",
    description: "Nuestro fin no es solo limpiar, sino generar lazos de confianza. Llevamos a cabo cada tarea protegiéndote de los riesgos laborales cotidianos con responsabilidad total.",
    icon: <HandHeart className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    ribbon: "bg-teal-500",
  },
  {
    title: "Confiabilidad Legal",
    description: "Sabemos que en el mundo B2B reducir al mínimo el riesgo es indispensable. Operamos bajo las más estrictas normativas y seguros a nivel nacional.",
    icon: <ShieldCheck className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
    ribbon: "bg-cyan-500",
  },
  {
    title: "Seguridad e Higiene",
    description: "Creemos en hacer bien las pequeñas cosas de todos los días. Con supervisiones preventivas y pertenencia, mantenemos altos estándares de higiene.",
    icon: <Sparkle className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    ribbon: "bg-amber-500",
  },
];

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-white/40 dark:bg-slate-900 border-t border-brand-100 dark:border-slate-800 overflow-x-clip relative">
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-teal-200/30 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-200/20 dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* ═══ Columna Izquierda: Identidad + Estadística ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 dark:bg-slate-800/50 backdrop-blur-sm border border-brand-200/50 dark:border-slate-700 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
              <Heart className="w-3.5 h-3.5" />
              Nuestra Esencia
            </div>

            {/* "20+" Grande */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-8xl md:text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-brand-600 to-teal-400 dark:from-brand-500 dark:to-cyan-400 pr-1 md:pr-2 pb-2">
                20
              </span>
              <span className="text-6xl md:text-7xl font-bold text-brand-500">+</span>
            </div>

            {/* Heading emocional */}
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white leading-tight mb-6">
              Años cuidando tu lugar <br className="hidden md:block" />
              como <span className="text-brand-500">nuestra casa.</span>
            </h3>

            {/* Historia */}
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-5 font-medium">
              Desde el año 2003, entendimos que detrás de cada pasillo, oficina o consorcio hay personas que merecen habitar espacios de absoluta pulcritud.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium">
              Somos una familia dedicada a aliviar las responsabilidades operativas de nuestros clientes mediante un equipo confiable, atento y verdaderamente comprometido, forjado en Mar del Plata.
            </p>

            {/* Badge Prestigio */}
            <div className="mt-8 flex items-center gap-4 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              <Award className="w-6 h-6 text-brand-500" />
              Prestigio en Mar del Plata
            </div>
          </motion.div>

          {/* ═══ Columna Derecha: Grilla 2×2 de Valores ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-brand-50/80 dark:bg-slate-800/50 rounded-[2rem] p-6 border border-white dark:border-slate-800 shadow-lg shadow-brand-200/15 dark:shadow-none hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Ribbon lateral */}
                <div className={`absolute top-0 left-0 w-1 h-full ${val.ribbon} transition-all duration-300 group-hover:w-1.5`}></div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-[1.2rem] shadow-sm border border-brand-100 dark:border-slate-700 w-fit mb-4">
                  {val.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-snug">{val.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{val.description}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
