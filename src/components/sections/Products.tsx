"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Droplets, ShieldCheck, Leaf } from "lucide-react";

export default function Products() {
  const products = [
    {
      title: "Limpiadores Activos",
      description: "Químicos y multisuperficies de rápida acción. Fórmulas especiales que garantizan disolver grasas y suciedades sin ser invasivos.",
      image: "/product-spray.png",
      icon: <Droplets className="w-5 h-5 text-brand-600 dark:text-brand-400" />
    },
    {
      title: "Insumos Corporativos",
      description: "Provisión de alta densidad para consorcios e industrias. Desde bidones de cera para pisos hasta lavandina en bloque y derivados.",
      image: "/product-gallon.png",
      icon: <ShieldCheck className="w-5 h-5 text-brand-600 dark:text-brand-400" />
    },
    {
      title: "Línea Ecológica y Aromas",
      description: "Ambientadores y desodorizantes lavanda orientados a no ser reactivos. Porque un verdadero espacio limpio, se respira en un ambiente aséptico y no tóxico.",
      image: "/product-eco.png",
      icon: <Leaf className="w-5 h-5 text-brand-600 dark:text-brand-400" />
    }
  ];

  return (
    <section id="productos" className="py-24 bg-brand-50/20 dark:bg-slate-900/50 overflow-x-clip relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-200/20 dark:bg-brand-500/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/3" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6 font-sans capitalize"
          >
            Servicios y <span className="text-brand-600 dark:text-brand-400">Productos</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium"
          >
            No solo mantenemos tus espacios limpios; también te proveemos de los insumos y químicos profesionales que aseguran calidad contínua a gran escala.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group bg-white/80 dark:bg-slate-900 backdrop-blur-md overflow-hidden rounded-[2.5rem] border border-brand-100 dark:border-slate-800 shadow-xl shadow-brand-200/20 dark:shadow-none hover:shadow-2xl hover:border-brand-200 dark:hover:border-brand-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-default"
            >
              <div className="relative h-72 w-full overflow-hidden bg-brand-50 dark:bg-slate-950/50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col relative z-20">
                <div className="w-12 h-12 bg-brand-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-5 border border-brand-100 dark:border-slate-700 group-hover:bg-brand-100 dark:group-hover:bg-slate-700 group-hover:scale-110 transition-all duration-500">
                  {product.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{product.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
