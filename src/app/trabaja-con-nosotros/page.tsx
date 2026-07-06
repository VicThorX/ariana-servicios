"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { submitCareerForm } from "@/app/actions/career";
import { 
  Loader2, CheckCircle2, AlertCircle, FileText, Upload, 
  X, Briefcase, Heart, Award, ShieldCheck 
} from "lucide-react";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function CareersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [cvFile, setCvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    // Validar tipo de archivo (PDF, Word)
    const allowedExtensions = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (!allowedExtensions.includes(file.type)) {
      setErrors(prev => ({ ...prev, cv: "Formato no permitido. Por favor, sube tu CV en formato PDF o Word (.docx)." }));
      setCvFile(null);
      return;
    }

    // Validar tamaño (máx 5MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrors(prev => ({ ...prev, cv: `El archivo supera el límite de ${MAX_FILE_SIZE_MB}MB.` }));
      setCvFile(null);
      return;
    }

    setErrors(prev => {
      const copy = { ...prev };
      delete copy.cv;
      return copy;
    });
    setCvFile(file);
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: null, message: '' });
    setErrors({});

    const form = e.currentTarget;
    const formFields = new FormData(form);

    const name = (formFields.get("name") as string).trim();
    const email = (formFields.get("email") as string).trim();
    const phone = (formFields.get("phone") as string).trim();
    const message = (formFields.get("message") as string).trim();
    const termsAccepted = formFields.get("termsAccepted") === "on";

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Por favor, ingresa tu nombre completo.";
    if (!email) {
      newErrors.email = "Ingresa tu correo de contacto.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Este formato de correo no es válido.";
    }
    if (!phone) newErrors.phone = "Ingresa tu teléfono de contacto.";
    if (!cvFile) newErrors.cv = "Debes adjuntar tu Currículum Vitae (CV).";
    if (!message) newErrors.message = "Escribe una breve presentación o por qué quieres unirte.";
    if (!termsAccepted) newErrors.termsAccepted = "Debes autorizar el guardado de tu CV.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const submissionData = new FormData();
    submissionData.append("name", name);
    submissionData.append("email", email);
    submissionData.append("phone", phone);
    submissionData.append("message", message);
    if (cvFile) {
      submissionData.append("cv", cvFile);
    }

    const response = await submitCareerForm(submissionData);

    setIsSubmitting(false);
    if (response.success) {
      setFeedback({ type: 'success', message: response.message });
      form.reset();
      setCvFile(null);
    } else {
      setFeedback({ type: 'error', message: response.message });
    }
  };

  const jobBenefits = [
    {
      icon: <Heart className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "Respeto y Buen Clima",
      description: "Somos una empresa familiar donde el valor humano es la prioridad. Fomentamos el respeto y compañerismo en cada jornada."
    },
    {
      icon: <Award className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "Pago en Término y Legalidad",
      description: "Garantizamos el cobro puntual de haberes y el cumplimiento riguroso de todos los convenios colectivos vigentes."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "Seguridad y Capacitación",
      description: "Te brindamos uniformes de alta calidad y elementos de protección personal (EPP), además de capacitaciones técnicas."
    }
  ];

  return (
    <main className="min-h-screen pt-28 pb-20 bg-brand-50/30 dark:bg-slate-950 relative overflow-hidden">
      {/* Fondo estético */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-200/10 dark:bg-brand-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/3" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100/20 dark:bg-purple-950/5 blur-[140px] rounded-full pointer-events-none translate-x-1/3" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/50 dark:bg-slate-800 text-brand-700 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-100 dark:border-slate-700"
          >
            <Briefcase className="w-3.5 h-3.5" /> Selección de Personal
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-850 dark:text-white mb-6"
          >
            Trabajá con <span className="text-brand-600 dark:text-brand-400">Nosotros</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 font-medium"
          >
            ¿Buscás estabilidad laboral y formar parte de una empresa líder en Mar del Plata? 
            Completá tus datos, adjuntanos tu CV y sumate a nuestra bolsa de empleo.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Beneficios / Info Corporativa */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-white/80 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-brand-100 dark:border-slate-800 shadow-xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-6">¿Por qué elegir Ariana?</h3>
              
              <div className="space-y-6">
                {jobBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-brand-50 dark:bg-slate-800 border border-brand-100 dark:border-slate-750 flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-850 dark:text-white text-base mb-1">{benefit.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-brand-100/30 dark:bg-slate-900/60 border border-brand-200/50 dark:border-slate-800/80">
              <h4 className="font-bold text-slate-800 dark:text-white text-base mb-2">Importante</h4>
              <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed font-semibold">
                Nuestra oficina técnica está ubicada en Mar del Plata. Todas las vacantes operativas de limpieza y supervisión corresponden a servicios dentro de la ciudad y zonas aledañas. Al enviar su CV, sus datos se almacenan en estricto cumplimiento con las normas de confidencialidad de la empresa.
              </p>
            </div>
          </motion.div>

          {/* Formulario de Postulación */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 p-8 md:p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-brand-100 dark:border-slate-800 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-slate-850 dark:text-white mb-8 flex items-center gap-3">
              <FileText className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              Enviar Currículum Vitae (CV)
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              
              {/* Nombre completo */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nombre completo *</label>
                <input
                  name="name"
                  type="text"
                  className={`w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none transition-all disabled:opacity-50 ${errors.name ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500'}`}
                  placeholder="Ej. María Sol Gómez"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
              </div>

              {/* Email y teléfono */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email de contacto *</label>
                  <input
                    name="email"
                    type="email"
                    className={`w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none transition-all disabled:opacity-50 ${errors.email ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500'}`}
                    placeholder="ejemplo@correo.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Teléfono celular *</label>
                  <input
                    name="phone"
                    type="tel"
                    className={`w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none transition-all disabled:opacity-50 ${errors.phone ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500'}`}
                    placeholder="Ej. 223 5123456"
                    disabled={isSubmitting}
                  />
                  {errors.phone && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
                </div>
              </div>

              {/* Adjuntar CV */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Adjuntar Currículum *</label>
                <p className="text-xs text-slate-500 dark:text-slate-400">Formatos aceptados: PDF o Word (.doc, .docx). Tamaño máximo: {MAX_FILE_SIZE_MB}MB.</p>
                
                <div className="flex items-center gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                    className="px-6 py-4 border border-dashed border-brand-300 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-350 hover:bg-brand-50/30 dark:hover:bg-slate-850 flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4 text-brand-500" />
                    Subir archivo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  {cvFile && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-brand-100/50 dark:bg-slate-850 rounded-xl border border-brand-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-white">
                      <FileText className="w-4 h-4 text-brand-500" />
                      <span className="max-w-[180px] truncate">{cvFile.name}</span>
                      <button 
                        type="button" 
                        onClick={removeFile}
                        className="text-slate-450 hover:text-red-500 p-0.5 transition-colors"
                        title="Quitar archivo"
                        disabled={isSubmitting}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                {errors.cv && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.cv}</p>}
              </div>

              {/* Mensaje / Presentación */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Presentación / Experiencia laboral *</label>
                <textarea
                  name="message"
                  rows={4}
                  className={`w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none transition-all resize-none disabled:opacity-50 ${errors.message ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500'}`}
                  placeholder="Contanos sobre tu experiencia en limpieza o mantenimiento, qué horarios tenés disponibles y por qué te interesa nuestra propuesta..."
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.message}</p>}
              </div>

              {/* Checkbox de Privacidad */}
              <div className="border-t border-brand-100 dark:border-slate-800 pt-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    id="termsAccepted"
                    className="w-4 h-4 mt-1 text-brand-500 focus:ring-brand-500 border-brand-200 dark:border-slate-700 rounded cursor-pointer"
                    disabled={isSubmitting}
                  />
                  <div className="space-y-1">
                    <label htmlFor="termsAccepted" className="text-xs sm:text-sm font-semibold text-slate-650 dark:text-slate-300 cursor-pointer">
                      Autorización de base de datos de selección *
                    </label>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                      Autorizo a Ariana Servicios a conservar mi currículum e información personal en sus archivos digitales exclusivamente para futuros procesos de selección de personal.
                    </p>
                  </div>
                </div>
                {errors.termsAccepted && <p className="text-xs text-red-500 flex items-center gap-1 mt-2"><AlertCircle className="w-3.5 h-3.5" />{errors.termsAccepted}</p>}
              </div>

              {/* Feedback y Enviar */}
              {feedback.type && (
                <div className={`p-5 rounded-2xl flex items-center gap-3 text-sm font-medium border ${feedback.type === 'success' ? 'bg-teal-50 text-teal-800 dark:bg-emerald-950/30 dark:text-emerald-400 border-teal-200 dark:border-emerald-850' : 'bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-850'}`}>
                  {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  <p>{feedback.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-brand-500 hover:bg-brand-600 dark:bg-brand-650 dark:hover:bg-brand-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-2xl text-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-xl shadow-brand-500/10 flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Enviando currículum...
                  </>
                ) : (
                  <>
                    Enviar Postulación
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
