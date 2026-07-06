"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle, Quote } from "lucide-react";
import { googleReviews } from "@/data/reviews";

export default function Reviews() {
  // Iniciales del autor
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section id="opiniones" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Círculo decorativo */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-100/30 dark:bg-purple-950/10 blur-[130px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/50 dark:bg-slate-800 text-brand-700 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-100 dark:border-slate-700"
          >
            <Star className="w-3.5 h-3.5 fill-current" /> Google Maps Reviews
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }}
            className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-6"
          >
            Qué dicen de <span className="text-brand-600 dark:text-brand-400">Nosotros</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium"
          >
            La satisfacción de quienes nos confían sus espacios es nuestro mayor aval de calidad. Conocé la opinión de administradores y gerentes locales.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {googleReviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-brand-50/30 dark:bg-slate-950/40 p-8 rounded-[2.5rem] border border-brand-100 dark:border-slate-800/80 shadow-md relative hover:shadow-xl hover:border-brand-200 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Icono de comillas */}
              <div className="absolute top-6 right-8 text-brand-200/50 dark:text-slate-800 group-hover:text-brand-300 dark:group-hover:text-slate-700 transition-colors pointer-events-none">
                <Quote className="w-12 h-12" />
              </div>

              <div>
                {/* Estrellas y Fecha */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">{review.date}</span>
                </div>

                {/* Texto */}
                <p className="text-slate-700 dark:text-slate-350 leading-relaxed font-medium mb-8 text-sm md:text-base italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Perfil de Usuario */}
              <div className="flex items-center gap-4 border-t border-brand-100 dark:border-slate-800/60 pt-5">
                {/* Avatar */}
                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold shadow-md shadow-brand-500/20 text-sm">
                  {getInitials(review.author)}
                </div>
                {/* Datos */}
                <div>
                  <h4 className="font-bold text-slate-850 dark:text-white text-base flex items-center gap-2">
                    {review.author}
                    {review.verified && (
                      <span className="inline-flex text-teal-600 dark:text-brand-400" title="Opinión Verificada">
                        <CheckCircle className="w-4 h-4 fill-current text-white dark:text-slate-900 stroke-[3]" />
                      </span>
                    )}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-tight mt-1">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Maps CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <a
            href="https://maps.app.goo.gl/CzCxd89dTciy9me79"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 border border-brand-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 text-slate-700 dark:text-slate-300 font-bold rounded-[2rem] text-sm md:text-base transition-all hover:scale-105 hover:shadow-lg"
          >
            {/* Google G Logo */}
            <svg viewBox="0 0 24 24" width="20" height="20" className="w-5 h-5">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.78-2.4 3.63v3.02h3.87c2.26-2.08 3.58-5.14 3.58-8.5z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.06 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.11C3.18 21.88 7.39 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.32 14.27a7.22 7.22 0 0 1 0-4.54V6.62H1.21a11.96 11.96 0 0 0 0 10.76l4.11-3.11z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 6.62l4.11 3.11c.94-2.85 3.57-4.98 6.68-4.98z"
              />
            </svg>
            Ver más opiniones en Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}
