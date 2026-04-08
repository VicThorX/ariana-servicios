"use client";

import { clientList } from "@/data/clients";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export default function Clients() {
  // Duplicamos el array para lograr una marquesina (marquee) infinita en Framer Motion
  const marqueeItems = [...clientList, ...clientList, ...clientList];

  return (
    <section id="clientes" className="py-20 bg-slate-50 dark:bg-slate-900 overflow-x-clip border-y border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
          <Building2 className="w-6 h-6 text-brand-600" />
          Nos confían sus instalaciones diariamente
        </h3>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
          Gran cantidad de administraciones y entidades de renombre en Mar del Plata nos respaldan y delegan sus responsabilidades de forma sostenida a lo largo de estos años.
        </p>
      </div>

      <div className="relative flex overflow-hidden group py-4">
        {/* Gradients de desvanecimiento a los lados para disimular la entrada y salida de los ítems */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[15%] md:w-1/4 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[15%] md:w-1/4 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10"></div>
        
        {/* Cinta animada */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap gap-6 md:gap-10 items-center justify-start hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((client, idx) => (
            <div 
              key={idx} 
              className="glass px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300 font-semibold text-sm md:text-base flex-shrink-0 flex items-center gap-3 transition-colors hover:border-brand-300 dark:hover:border-brand-700 hover:text-brand-700 dark:hover:text-brand-300"
            >
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
              {client}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
