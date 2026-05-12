"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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
    <section id="contacto" className="py-24 bg-brand-50 dark:bg-slate-950 relative overflow-x-clip">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-200/20 dark:bg-brand-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-6"
          >
            ¿Hablamos sobre tu <span className="text-teal-600 dark:text-brand-400">Empresa</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium"
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
            <div className="bg-white/80 dark:bg-slate-900 p-8 md:p-10 rounded-[3rem] border border-brand-100 dark:border-slate-800 shadow-xl shadow-brand-200/20 dark:shadow-none backdrop-blur-md">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Nuestros Canales</h3>
              <div className="space-y-8">
                {/* WhatsApp — Canal principal */}
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-[#25D366]/10 dark:bg-[#25D366]/15 flex items-center justify-center text-[#25D366] border border-[#25D366]/20 group-hover:scale-105 transition-transform">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Escribinos directo</p>
                    <a
                      href="https://wa.me/5492235220338?text=Hola%20Ariana!%20Vengo%20de%20la%20pagina%20web%20y%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20institucional."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xl font-bold text-[#25D366] hover:text-[#20bd5a] transition-colors"
                    >
                      WhatsApp Ariana
                    </a>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 font-medium">Respuesta rápida personalizada</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-brand-50 dark:bg-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-700 group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="mt-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">O si prefieres escribirnos</p>
                    <a href="mailto:arianaservicios@hotmail.com" className="text-lg font-bold text-slate-800 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors break-all">
                      arianaservicios@hotmail.com
                    </a>
                  </div>
                </div>

                {/* Ubicación y horarios */}
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-amber-50 dark:bg-brand-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-slate-700 group-hover:scale-105 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="mt-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Tu zona es nuestra zona</p>
                    <p className="text-lg font-bold text-slate-800 dark:text-white leading-tight">Todo Mar del Plata</p>
                    <p className="text-[0.80rem] text-brand-600 dark:text-brand-400 mt-2 font-medium">Atendemos peticiones LUN a VIE (10 a 18 hs). <br/>Y ante urgencias, cubrimos a nuestros clientes 365 días.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="p-8 lg:p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-brand-100 dark:border-slate-800 shadow-xl relative"
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Contanos qué buscás</h3>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Nombre / Consorcio *</label>
                  <input
                    name="name"
                    type="text"
                    className={`w-full px-5 py-4 rounded-[1.5rem] border bg-brand-50/50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none transition-all disabled:opacity-50 ${errors.name ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 dark:focus:ring-brand-500 focus:border-teal-500 dark:focus:border-brand-500'}`}
                    placeholder="¿Quién nos contacta?"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Tu teléfono</label>
                  <input
                    name="phone"
                    type="text"
                    className="w-full px-5 py-4 rounded-[1.5rem] border border-brand-100 dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 dark:focus:ring-brand-500 focus:border-teal-500 dark:focus:border-brand-500 outline-none transition-all disabled:opacity-50"
                    placeholder="Ej. 223 5123456"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Un correo o email *</label>
                <input
                  name="email"
                  type="email"
                  className={`w-full px-5 py-4 rounded-[1.5rem] border bg-brand-50/50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none transition-all disabled:opacity-50 ${errors.email ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 dark:focus:ring-brand-500 focus:border-teal-500 dark:focus:border-brand-500'}`}
                  placeholder="Aquí te responderemos"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Ubicación a cotizar</label>
                <input
                  name="address"
                  type="text"
                  className="w-full px-5 py-4 rounded-[1.5rem] border border-brand-100 dark:border-slate-700 bg-brand-50/50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 dark:focus:ring-brand-500 focus:border-teal-500 dark:focus:border-brand-500 outline-none transition-all disabled:opacity-50"
                  placeholder="Ej. Barrio Centro, Parque Luro, etc."
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">¿Qué podemos hacer por ti? *</label>
                <textarea
                  name="message"
                  rows={4}
                  className={`w-full px-5 py-4 rounded-[1.5rem] border bg-brand-50/50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none transition-all resize-none disabled:opacity-50 ${errors.message ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 dark:focus:ring-brand-500 focus:border-teal-500 dark:focus:border-brand-500'}`}
                  placeholder="Detállanos metros, prioridades o frecuencia de limpieza..."
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
              </div>

              {feedback.type && (
                <div className={`p-5 rounded-[1.5rem] flex items-center gap-3 text-sm font-medium ${feedback.type === 'success' ? 'bg-teal-50 text-teal-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-teal-200 dark:border-emerald-800' : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>
                  {feedback.type === 'success' ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <AlertCircle className="w-6 h-6 shrink-0" />}
                  <p>{feedback.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-[2rem] text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-xl shadow-brand-500/20 flex items-center justify-center gap-3 group"
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
