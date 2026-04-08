"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Eye } from "lucide-react";
import Image from "next/image";

export default function Benefits() {
  const benefits = [
    {
      title: "Seguridad Legal Absoluta",
      description: "Asumimos el 100% de las responsabilidades vigentes. Todo el equipo humano opera bajo la estricta Ley de Contrato de Trabajo, protegidos con ART y Seguro de Vida obligatorio para anular el riesgo de su empresa.",
      icon: <ShieldCheck className="w-6 h-6 text-brand-600 dark:text-brand-400" />
    },
    {
      title: "Calidez Humana y Trato Directo",
      description: "Evite intermediarios burocráticos. Fomentamos un trato directo, personalizado y cálido directamente con los dueños fundadores de la empresa para brindar una respuesta ejecutiva y rápida.",
      icon: <UserCheck className="w-6 h-6 text-brand-600 dark:text-brand-400" />
    },
    {
      title: "Supervisión Zonal Preventiva Diaria",
      description: "No abandonamos las instalaciones a su suerte. Los Socios Gerentes y Supervisores de Zona realizan auditorías presenciales in-situ garantizando y manteniendo nuestros altos estándares higiénicos.",
      icon: <Eye className="w-6 h-6 text-brand-600 dark:text-brand-400" />
    }
  ];

  return (
    <section id="beneficios" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-x-clip relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <span className="text-brand-600 dark:text-brand-400 font-bold tracking-widest uppercase text-xs">
                Propuesta de Valor Competitiva
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 mb-6 leading-tight">
                Delegue con total seguridad. Nosotros absorbemos el riesgo.
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Llevamos desde 2003 entendiendo que la clave del entorno de su empresa o entidad es la minimización de problemas y contingencias. Ariana actúa como un escudo legal y operativo.
              </p>
            </div>

            <div className="space-y-8 mt-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Graphic Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 relative min-h-[600px] flex justify-center items-center"
          >
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl border border-white/10">
              <Image 
                src="/building.png"
                alt="Instalaciones Corporativas Limpias"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-70 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900 to-brand-500/20 mix-blend-multiply"></div>
              
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="glass rounded-2xl p-8 border border-white/20">
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-emerald-500/20 rounded-xl backdrop-blur-md">
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-xl mb-1">Cero Contingencias para el Empleador</p>
                      <p className="text-slate-200 text-sm leading-relaxed">Garantía estricta de cumplimiento gremial y normativo. Mantenemos el focus exclusivo en limpieza para que su empresa opere fluidamente.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-400 rounded-full blur-[80px] opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400 rounded-full blur-[80px] opacity-40"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
