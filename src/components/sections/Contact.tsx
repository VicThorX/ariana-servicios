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
      newErrors.name = "Por favor, indique su nombre comercial o razón social.";
    }
    if (!requestData.email) {
      newErrors.email = "Requerimos su correo electrónico para responderle.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestData.email)) {
      newErrors.email = "El formato no corresponde a un correo válido.";
    }
    if (!requestData.message) {
      newErrors.message = "Suminístrenos un breve detalle de la solicitud.";
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
    <section id="contacto" className="py-24 bg-white dark:bg-slate-950 relative overflow-x-clip">
      <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6"
          >
            ¿Hablamos sobre su <span className="text-brand-600">Empresa</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Estamos a disposición para enviarle un presupuesto institucional o coordinar una visita técnica a sus instalaciones sin compromiso.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Central Comercial</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-brand-50 dark:bg-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Teléfonos de Asistencia</p>
                    <a href="tel:2235220338" className="block text-lg font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors">+54 223 522-0338</a>
                    <a href="tel:2235220582" className="block text-lg font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors">+54 223 522-0582</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-brand-50 dark:bg-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Dpto. de Presupuestos</p>
                    <a href="mailto:arianaservicios@hotmail.com" className="text-lg font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      arianaservicios@hotmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-brand-50 dark:bg-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Sede Administrativa Centrada en</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Mar del Plata, Argentina</p>
                    <p className="text-xs text-brand-600 dark:text-brand-400 mt-1 font-medium">Oficinas: Lun a Vie (10-18hs) • Guardias Anuales</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="p-8 lg:p-10 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-inner relative"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Solicitar Presupuesto</h3>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nombre o Razón Social *</label>
                  <input
                    name="name"
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none transition-all disabled:opacity-50 ${errors.name ? 'border-red-500/60 focus:ring-2 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500'}`}
                    placeholder="Su entidad"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Teléfono</label>
                  <input
                    name="phone"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all disabled:opacity-50"
                    placeholder="Ej. 223 5123456"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Correo corporativo *</label>
                <input
                  name="email"
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none transition-all disabled:opacity-50 ${errors.email ? 'border-red-500/60 focus:ring-2 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500'}`}
                  placeholder="contacto@empresa.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Ubicación a cotizar (Opcional)</label>
                <input
                  name="address"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all disabled:opacity-50"
                  placeholder="Sede Bancaria / Edificio"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Requerimiento *</label>
                <textarea
                  name="message"
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none transition-all resize-none disabled:opacity-50 ${errors.message ? 'border-red-500/60 focus:ring-2 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500'}`}
                  placeholder="Detalle los metros aproximados, tipo de limpieza o requerimiento..."
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
              </div>

              {feedback.type && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>
                  {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  <p>{feedback.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 dark:disabled:bg-slate-800 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20 flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando Petición...
                  </>
                ) : (
                  <>
                    Solicitar Presupuesto Formal
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
