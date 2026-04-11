"use client";

import { motion } from "framer-motion";
import { Coffee, Home, Landmark } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Consorcios y Edificios",
      description: "Ofrecemos suplencias y atención constante para el cuidado de espacios comunes, asegurando que tu hogar brille todos los días.",
      icon: <Home className="w-8 h-8 text-teal-600 dark:text-brand-400" />,
      color: "from-teal-100 to-transparent dark:from-brand-900/40",
      image: "/service-condominiums.png",
    },
    {
      title: "Oficinas y Espacios de Trabajo",
      description: "Entornos de trabajo limpios, ordenados y acogedores. Fomentamos la productividad con personal enfocado en el detalle y el buen trato.",
      icon: <Coffee className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
      color: "from-brand-100 to-transparent dark:from-brand-900/40",
      image: "/service-offices.png",
    },
    {
      title: "Entidades y Bancos",
      description: "Rigor organizativo combinado con calidez. Mantenemos tus sucursales relucientes, transmitiendo confianza y profesionalismo a tus clientes.",
      icon: <Landmark className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
      color: "from-amber-100 to-transparent dark:from-amber-900/40",
      image: "/service-institutions.png",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="servicios" className="py-24 bg-brand-50 dark:bg-slate-950 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-200/40 dark:bg-brand-500/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-100/40 dark:bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6 font-sans capitalize"
          >
            Espacios cuidados con <span className="text-brand-600 dark:text-brand-400">dedicación</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium"
          >
            Brindamos un servicio especializado donde adaptamos nuestros ritmos a las necesidades únicas de tu entorno, siempre preservando la empatía y la responsabilidad.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
          className="grid md:grid-cols-3 gap-8 md:gap-10"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group relative p-10 rounded-[3rem] bg-white/70 dark:bg-slate-900 backdrop-blur-xl border border-brand-100 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.color} opacity-40 group-hover:scale-150 transition-transform duration-700 rounded-bl-full`}></div>
              
              {/* 
                TODO: Agregar imagen macro de detalle de limpieza por servicio
                (ej. teclados desinfectados, picaportes de bronce pulidos, zócalos de ascensor)
              */}
              <div className="relative w-full h-40 mb-6 rounded-[2rem] overflow-hidden bg-brand-50/50 dark:bg-slate-800/50">
                <img
                  src={service.image}
                  alt={`Detalle de limpieza — ${service.title}`}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                />
              </div>
              
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/90 dark:bg-slate-800 shadow-sm flex items-center justify-center mb-8 relative z-10 border border-brand-50/50 dark:border-slate-700">
                {service.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-4 leading-snug relative z-10">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium relative z-10">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
