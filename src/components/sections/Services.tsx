"use client";

import { motion } from "framer-motion";
import { Building, Briefcase, CalendarCheck } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Amplia Cobertura Operativa",
      description: "Desplegamos nuestros equipos en Consorcios, Oficinas corporativas, Entidades públicas/privadas, Bancos, Clínicas, Gimnasios, Colegios, Paseos de Compras y Restaurantes.",
      icon: <Building className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
    },
    {
      title: "Personal Capacitado e Inédito",
      description: "Valoramos no solo la experiencia previa, sino el buen trato humano y la presencia. Nuestro personal cuenta con instrucción específica para el bienestar del cliente y resolución de emergencias.",
      icon: <Briefcase className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
    },
    {
      title: "Suplencias y Flexibilidad",
      description: "Nos adaptamos a sus ritmos (diario, semanal, mensual o emergencias). Cubrimos todo tipo de suplencias para encargados, auxiliares de pisos y personal de mantenimiento en general.",
      icon: <CalendarCheck className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
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
    <section id="servicios" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Modalidades y <span className="text-brand-600">Áreas de Cobertura</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
          >
            Más allá de nuestra experiencia sólida en administraciones de consorcios, estamos posicionados estratégicamente en el mantenimiento riguroso de todo tipo de entidades corporativas y sanitarias.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
