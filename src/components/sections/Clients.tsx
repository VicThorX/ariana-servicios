"use client";

import { clientList } from "@/data/clients";
import { motion } from "framer-motion";
import { Building2, HeartHandshake } from "lucide-react";

export default function Clients() {
  const marqueeItems = [...clientList, ...clientList, ...clientList];

  return (
    <section id="clientes" className="py-20 bg-brand-50/50 dark:bg-brand-950/80 overflow-x-clip border-y border-brand-100 dark:border-brand-900">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-brand-50 flex items-center justify-center gap-3">
          <HeartHandshake className="w-7 h-7 text-teal-600 dark:text-teal-400" />
          Nos confían sus espacios diariamente
        </h3>
        <p className="text-sm md:text-base text-slate-600 dark:text-brand-300 mt-3 max-w-2xl mx-auto font-medium">
          Sabemos la importancia de cada rincón. Varias de las entidades más estrictas y exigentes de la región eligen y mantienen sus puertas abiertas junto a nosotros.
        </p>
      </div>

      <div className="relative flex overflow-hidden group py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[15%] md:w-1/4 bg-gradient-to-r from-brand-50/50 dark:from-brand-950/80 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[15%] md:w-1/4 bg-gradient-to-l from-brand-50/50 dark:from-brand-950/80 to-transparent z-10"></div>
        
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
              className="px-8 py-4 rounded-[2rem] bg-white/70 dark:bg-brand-900/40 backdrop-blur-md border border-brand-100 dark:border-brand-800 shadow-sm text-slate-700 dark:text-brand-200 font-bold text-sm md:text-base flex-shrink-0 flex items-center gap-4 transition-all hover:scale-105 hover:border-teal-300 dark:hover:border-teal-700 hover:text-teal-700 dark:hover:text-teal-300 hover:bg-white dark:hover:bg-brand-800/80 cursor-default"
            >
              <div className="w-2 h-2 bg-brand-500 rounded-full" />
              {client}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
