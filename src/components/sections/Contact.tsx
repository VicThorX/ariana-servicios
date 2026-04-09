"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: null, message: '' });
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const requestData = {
      name: (formData.get("name") as string).trim(),
      phone: (formData.get("phone") as string).trim(),
      email: (formData.get("email") as string).trim(),
      address: (formData.get("address") as string).trim(),
      message: (formData.get("message") as string).trim(),
    };

    // FrontEnd UI Validations
    const newErrors: Record<string, string> = {};
    if (!requestData.name) {
      newErrors.name = "Por favor, indícanos cómo te llamas o el nombre de tu lugar.";
    }
    if (!requestData.email) {
      newErrors.email = "Necesitamos tu email para poder reponderte.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestData.email)) {
      newErrors.email = "Este formato de correo no parece correcto.";
    }
    if (!requestData.message) {
      newErrors.message = "Cuéntanos un poco sobre qué necesitas.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const response = await submitContactForm(requestData);

    setIsSubmitting(false);
    if (response.success) {
      setFeedback({ type: 'success', message: response.message });
      form.reset();
      setTimeout(() => setFeedback({ type: null, message: '' }), 8000);
    } else {
      setFeedback({ type: 'error', message: response.message });
    }
  }

  return (
    <section id="contacto" className="py-24 bg-brand-50 dark:bg-brand-950 relative overflow-x-clip">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-200/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-brand-50 mb-6"
          >
            Estamos para <span className="text-teal-600 dark:text-teal-400">escucharte</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-brand-200 max-w-2xl mx-auto font-medium"
          >
            Queremos conocer en detalle tus necesidades para ofrecerte la solución de limpieza que tus consorcios u oficinas merecen, con presupuesto cerrado y claro.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="space-y-8"
          >
            <div className="bg-white/80 dark:bg-brand-900/40 p-8 md:p-10 rounded-[3rem] border border-brand-100 dark:border-brand-800 shadow-xl shadow-brand-200/20 dark:shadow-none backdrop-blur-md">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-brand-50 mb-8">Nuestros Canales</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-teal-50 dark:bg-brand-800/80 flex items-center justify-center text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-brand-700 group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="mt-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-brand-300 mb-1">Para vos que preferís hablar</p>
                    <a href="tel:2235220338" className="block text-xl font-bold text-slate-800 dark:text-brand-50 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">+54 223 522-0338</a>
                    <a href="tel:2235220582" className="block text-xl font-bold text-slate-800 dark:text-brand-50 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">+54 223 522-0582</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-brand-50 dark:bg-brand-800/80 flex items-center justify-center text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-700 group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="mt-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-brand-300 mb-1">O si prefieres escribirnos</p>
                    <a href="mailto:arianaservicios@hotmail.com" className="text-lg font-bold text-slate-800 dark:text-brand-50 hover:text-brand-600 dark:hover:text-brand-400 transition-colors break-all">
                      arianaservicios@hotmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-amber-50 dark:bg-brand-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-brand-700 group-hover:scale-105 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="mt-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-brand-300 mb-1">Tu zona es nuestra zona</p>
                    <p className="text-lg font-bold text-slate-800 dark:text-brand-50 leading-tight">Todo Mar del Plata</p>
                    <p className="text-[0.80rem] text-brand-600 dark:text-brand-200 mt-2 font-medium">Atendemos peticiones LUN a VIE (10 a 18 hs). <br/>Y ante urgencias, cubrimos a nuestros clientes 365 días.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="p-8 lg:p-10 bg-white dark:bg-brand-900 rounded-[3rem] border border-brand-100 dark:border-brand-800 shadow-xl relative"
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-brand-50 mb-6">Contanos qué buscás</h3>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-brand-200">Nombre / Consorcio *</label>
                  <input
                    name="name"
                    type="text"
                    className={`w-full px-5 py-4 rounded-[1.5rem] border bg-brand-50/50 dark:bg-brand-950/50 text-slate-800 dark:text-brand-50 outline-none transition-all disabled:opacity-50 ${errors.name ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-brand-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500'}`}
                    placeholder="¿Quién nos contacta?"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-brand-200">Tu teléfono</label>
                  <input
                    name="phone"
                    type="text"
                    className="w-full px-5 py-4 rounded-[1.5rem] border border-brand-100 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-950/50 text-slate-800 dark:text-brand-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all disabled:opacity-50"
                    placeholder="Ej. 223 5123456"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-brand-200">Un correo o email *</label>
                <input
                  name="email"
                  type="email"
                  className={`w-full px-5 py-4 rounded-[1.5rem] border bg-brand-50/50 dark:bg-brand-950/50 text-slate-800 dark:text-brand-50 outline-none transition-all disabled:opacity-50 ${errors.email ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-brand-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500'}`}
                  placeholder="Aquí te responderemos"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-brand-200">Ubicación a limpiar (Opcional)</label>
                <input
                  name="address"
                  type="text"
                  className="w-full px-5 py-4 rounded-[1.5rem] border border-brand-100 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-950/50 text-slate-800 dark:text-brand-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all disabled:opacity-50"
                  placeholder="Tu banco o edificio"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-brand-200">¿Qué podemos hacer por ti? *</label>
                <textarea
                  name="message"
                  rows={4}
                  className={`w-full px-5 py-4 rounded-[1.5rem] border bg-brand-50/50 dark:bg-brand-950/50 text-slate-800 dark:text-brand-50 outline-none transition-all resize-none disabled:opacity-50 ${errors.message ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-brand-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500'}`}
                  placeholder="Detállanos metros, prioridades o frecuencia de limpieza..."
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
              </div>

              {feedback.type && (
                <div className={`p-5 rounded-[1.5rem] flex items-center gap-3 text-sm font-medium ${feedback.type === 'success' ? 'bg-teal-50 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 border border-teal-200 dark:border-teal-800' : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>
                  {feedback.type === 'success' ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <AlertCircle className="w-6 h-6 shrink-0" />}
                  <p>{feedback.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-brand-500 hover:bg-brand-600 disabled:bg-slate-300 dark:disabled:bg-brand-800 text-white font-bold rounded-[2rem] text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-xl shadow-brand-500/20 flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Preparando envío...
                  </>
                ) : (
                  <>
                    Hablar con Ariana
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
