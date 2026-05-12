"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Eye, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Benefits() {
  const benefits = [
    {
      title: "Tranquilidad y Respaldo",
      description: "Nuestro equipo trabaja 100% bajo normativas vigentes. Eliminamos los riesgos de contingencia para que descanses sabiendo que tus espacios están seguros y en regla.",
      icon: <ShieldCheck className="w-6 h-6 text-brand-600 dark:text-brand-400" />
    },
    {
      title: "Trato Cálido y Directo",
      description: "Aquí no eres un número. Tratamos directo de dueño a dueño, buscando entender exactamente cómo te gusta y necesitas que se cuiden tus espacios.",
      icon: <UserCheck className="w-6 h-6 text-brand-600 dark:text-brand-400" />
    },
    {
      title: "Cuidamos los Detalles",
      description: "Recorremos nuestros espacios constantemente porque nos importa. Las auditorías no son un control corporativo, sino una forma de asegurarnos de que todo brille.",
      icon: <Eye className="w-6 h-6 text-brand-600 dark:text-brand-400" />
    }
  ];

  return (
    <section id="beneficios" className="py-24 bg-white/40 dark:bg-slate-900 overflow-x-clip relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-teal-700 dark:text-brand-400 font-bold tracking-widest uppercase text-xs mb-4">
                <Sparkles className="w-4 h-4" />
                Cuidado Integral
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mt-2 mb-6 leading-tight">
                Delega en nosotros y respira <span className="text-brand-500">tranquilo.</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                Sabemos que administrar tu tiempo es fundamental. En Ariana, nos convertimos en tus aliados estratégicos y operativos, asumiendo los riesgos mientras mantenemos tu entorno en perfecto estado.
              </p>
            </div>

            <div className="space-y-8 mt-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-5 items-start group">
                  <div className="shrink-0 w-14 h-14 rounded-[1.2rem] bg-brand-50 dark:bg-slate-800 shadow-sm border border-brand-100 dark:border-slate-700 flex items-center justify-center group-hover:bg-brand-100 dark:group-hover:bg-slate-700 transition-colors">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{benefit.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Graphic Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 relative min-h-[600px] flex justify-center items-center"
          >
            <div className="absolute inset-0 rounded-[4rem] overflow-hidden bg-brand-900 dark:bg-slate-900 shadow-2xl border-4 border-white dark:border-slate-800">
              <Image 
                src="/building.png"
                alt="Instalaciones Corporativas Limpias"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-80 dark:opacity-70 mix-blend-luminosity hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-300/40 dark:from-brand-900 via-transparent to-brand-100/10 dark:to-brand-500/20 mix-blend-overlay dark:mix-blend-multiply"></div>
              
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-20">
                <div className="bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] dark:rounded-2xl p-6 sm:p-8 border border-white/30 dark:border-white/20 shadow-2xl">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                    <div className="p-3 bg-teal-500/20 dark:bg-emerald-500/20 rounded-[1rem] backdrop-blur-md shrink-0">
                      <ShieldCheck className="w-8 h-8 text-teal-300 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-xl mb-1">Cero Contingencias</p>
                      <p className="text-slate-100 dark:text-slate-200 text-sm leading-relaxed font-medium">Garantía estricta de cumplimiento gremial. Nos cuidamos entre nosotros para cuidarte a ti.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-300 dark:bg-brand-400 rounded-full blur-[80px] opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-300 dark:bg-cyan-400 rounded-full blur-[80px] opacity-40"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
