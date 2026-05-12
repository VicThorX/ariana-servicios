"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Coffee, Home, Landmark, Leaf, Trash2, Truck, PackageSearch, TreePine, Building2, Droplets, Sparkles } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Consorcios y Edificios",
      description: "Ofrecemos suplencias y atención constante para el cuidado de espacios comunes, asegurando que tu hogar brille todos los días.",
      icon: <Home className="w-5 h-5 text-teal-600 dark:text-brand-400" />,
      color: "from-teal-100 to-transparent dark:from-brand-900/40",
      image: "/service-condominiums.png",
    },
    {
      title: "Oficinas y Espacios de Trabajo",
      description: "Entornos de trabajo limpios, ordenados y acogedores. Fomentamos la productividad con personal enfocado en el detalle y el buen trato.",
      icon: <Coffee className="w-5 h-5 text-brand-600 dark:text-brand-400" />,
      color: "from-brand-100 to-transparent dark:from-brand-900/40",
      image: "/service-offices.png",
    },
    {
      title: "Entidades y Bancos",
      description: "Rigor organizativo combinado con calidez. Mantenemos tus sucursales relucientes, transmitiendo confianza y profesionalismo a tus clientes.",
      icon: <Landmark className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      color: "from-amber-100 to-transparent dark:from-amber-900/40",
      image: "/service-institutions.png",
    }
  ];

  const additionalServices = [
    { title: "Evaluaciones de Impacto Ambiental", icon: <Leaf className="w-6 h-6 text-emerald-500" /> },
    { title: "Gestión integral de residuos", icon: <Trash2 className="w-6 h-6 text-slate-500" /> },
    { title: "Soluciones de logística", icon: <Truck className="w-6 h-6 text-blue-500" /> },
    { title: "Abastecimiento de productos y elementos de limpieza", icon: <PackageSearch className="w-6 h-6 text-amber-600 dark:text-amber-500" /> },
    { title: "Mantenimiento de espacios verdes", icon: <TreePine className="w-6 h-6 text-green-600 dark:text-green-500" /> },
    { title: "Mantenimiento de frentes", icon: <Building2 className="w-6 h-6 text-indigo-500" /> },
    { title: "Hidrolavados, en paredes y veredas", icon: <Droplets className="w-6 h-6 text-cyan-500" /> },
    { title: "Mantenimiento de lajas, porcelanatos, encerados", icon: <Sparkles className="w-6 h-6 text-yellow-500" /> },
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
            viewport={{ once: true, amount: 0.35 }}
            className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6 font-sans capitalize"
          >
            Espacios cuidados con <span className="text-brand-600 dark:text-brand-400">dedicación</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
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
          viewport={{ once: true, amount: 0.35 }}
          className="grid md:grid-cols-3 gap-8 md:gap-10"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group relative bg-white/80 dark:bg-slate-900 backdrop-blur-md overflow-hidden rounded-[2.5rem] border border-brand-100 dark:border-slate-800 shadow-xl shadow-brand-200/20 dark:shadow-none hover:shadow-2xl hover:border-brand-200 dark:hover:border-brand-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-default"
            >
              <div className="relative h-72 w-full overflow-hidden bg-brand-50/50 dark:bg-slate-800/50">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
                />
              </div>

              <div className="p-8 flex-1 flex flex-col relative z-20">
                <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${service.color} opacity-20 group-hover:opacity-40 group-hover:scale-150 transition-all duration-700 rounded-tl-full -z-10`}></div>
                
                <div className="w-12 h-12 bg-brand-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-5 border border-brand-100 dark:border-slate-700 group-hover:bg-brand-100 dark:group-hover:bg-slate-700 group-hover:scale-110 transition-all duration-500">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Servicios Adicionales --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 pt-16 border-t border-brand-200/60 dark:border-slate-800/60"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white capitalize">
              Cobertura <span className="text-brand-600 dark:text-brand-400">Integral</span>
            </h3>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Extendemos nuestra especialización para cubrir todas las áreas que tu edificio o empresa necesita.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {additionalServices.map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl border border-brand-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-500 transition-all"
              >
                <div className="w-14 h-14 bg-brand-50 dark:bg-slate-800 rounded-[1.25rem] flex items-center justify-center mb-4 transition-transform duration-300">
                  {service.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {service.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
