"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle, 
  Upload, X, Building2, User, Clock, Calendar, ShieldCheck, Lock 
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { submitQuoteForm } from "@/app/actions/contact";

const MAX_FILES = 5;
const MAX_SIZE_MB = 2;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Multi-step Wizard State
  const [step, setStep] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);

  // Form State
  const [establishmentType, setEstablishmentType] = useState("");
  const [hasCurrentService, setHasCurrentService] = useState("");
  
  // File Upload State
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean previews on unmount
  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    // Validar cantidad máxima
    if (selectedFiles.length + files.length > MAX_FILES) {
      setErrors(prev => ({ ...prev, photos: `Solo podés subir hasta ${MAX_FILES} fotos en total.` }));
      return;
    }

    const validFiles: File[] = [];
    const newPreviews: string[] = [];
    let fileError = "";

    files.forEach(file => {
      // Validar tipo de archivo (solo imágenes)
      if (!file.type.startsWith("image/")) {
        fileError = "Solo se permiten archivos de imagen (PNG, JPG, JPEG, WEBP).";
        return;
      }
      // Validar tamaño de archivo (máx 2MB)
      if (file.size > MAX_SIZE_BYTES) {
        fileError = `Las imágenes no deben superar los ${MAX_SIZE_MB}MB por unidad.`;
        return;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    if (fileError) {
      setErrors(prev => ({ ...prev, photos: fileError }));
      return;
    }

    setErrors(prev => {
      const copy = { ...prev };
      delete copy.photos;
      return copy;
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);

    // Limpiar input para permitir subir el mismo archivo si se elimina
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Limpiar errores individuales de manera reactiva
  const clearError = (field: string) => {
    setErrors(prev => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  // Obtener errores por paso sin efectos secundarios directos
  const getStepErrors = (currentStep: number): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if (!formRef.current) return newErrors;
    const formFields = new FormData(formRef.current);

    if (currentStep === 1) {
      const name = (formFields.get("name") as string || "").trim();
      const email = (formFields.get("email") as string || "").trim();
      const phone = (formFields.get("phone") as string || "").trim();

      if (!name) newErrors.name = "Por favor, indícanos tu nombre y apellido.";
      if (!email) {
        newErrors.email = "Necesitamos tu email para responderte.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Este formato de correo no es correcto.";
      }
      if (!phone) newErrors.phone = "Por favor, ingresa tu teléfono.";
    }

    if (currentStep === 2) {
      const estType = (formFields.get("establishmentType") as string || "").trim();
      const address = (formFields.get("address") as string || "").trim();

      if (!estType) newErrors.establishmentType = "Selecciona el tipo de establecimiento.";
      if (!address) newErrors.address = "Indica la dirección del lugar a cotizar.";

      if (estType.toLowerCase() === "consorcio") {
        const adminName = (formFields.get("adminName") as string || "").trim();
        const adminAddress = (formFields.get("adminAddress") as string || "").trim();
        const adminContact = (formFields.get("adminContact") as string || "").trim();

        if (!adminName) newErrors.adminName = "Indica el nombre de la administración.";
        if (!adminAddress) newErrors.adminAddress = "Indica la dirección de la administración.";
        if (!adminContact) newErrors.adminContact = "Indica el contacto de la administración.";
      }
    }

    if (currentStep === 3) {
      const frequency = (formFields.get("frequencyHoursDays") as string || "").trim();
      const schedule = (formFields.get("preferredSchedule") as string || "").trim();
      const privacyAccepted = !!formFields.get("privacyAccepted");

      if (!frequency) newErrors.frequencyHoursDays = "Selecciona la frecuencia deseada.";
      if (!schedule) newErrors.preferredSchedule = "Selecciona tu horario de preferencia.";
      if (!hasCurrentService) newErrors.hasCurrentService = "Selecciona si cuentas actualmente con el servicio.";
      if (!privacyAccepted) newErrors.privacyAccepted = "Debes aceptar la protección de datos y spam.";
    }

    return newErrors;
  };

  const nextStep = () => {
    const stepErrors = getStepErrors(step);
    if (Object.keys(stepErrors).length === 0) {
      setErrors({}); // Limpiar errores acumulados antes de avanzar
      setStep(prev => prev + 1);
    } else {
      setErrors(stepErrors);
      const firstErrorKey = Object.keys(stepErrors)[0];
      const errorEl = document.getElementsByName(firstErrorKey)[0] || document.getElementById(firstErrorKey);
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const prevStep = () => {
    setErrors({}); // Limpiar errores al volver atrás para evitar alertas fuera de contexto
    setStep(prev => prev - 1);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback({ type: null, message: '' });

    // Validar Paso 1
    const step1Errors = getStepErrors(1);
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      setStep(1);
      return;
    }

    // Validar Paso 2
    const step2Errors = getStepErrors(2);
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      setStep(2);
      return;
    }

    // Validar Paso 3
    const step3Errors = getStepErrors(3);
    if (Object.keys(step3Errors).length > 0) {
      setErrors(step3Errors);
      const firstErrorKey = Object.keys(step3Errors)[0];
      const errorEl = document.getElementsByName(firstErrorKey)[0] || document.getElementById(firstErrorKey);
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Si todo está ok, procedemos al envío sin errores en pantalla
    setErrors({});
    setIsSubmitting(true);

    if (!formRef.current) return;
    const formFields = new FormData(formRef.current);
    const frequency = (formFields.get("frequencyHoursDays") as string || "").trim();
    const schedule = (formFields.get("preferredSchedule") as string || "").trim();

    const name = (formFields.get("name") as string || "").trim();
    const role = (formFields.get("role") as string || "").trim() || "No especificado";
    const email = (formFields.get("email") as string || "").trim();
    const phone = (formFields.get("phone") as string || "").trim();
    const estType = (formFields.get("establishmentType") as string || "").trim();
    const address = (formFields.get("address") as string || "").trim();
    const start = (formFields.get("estimatedStartDate") as string || "").trim() || "No especificada";
    const message = (formFields.get("message") as string || "").trim() || "No se especificaron detalles adicionales.";

    const adminName = (formFields.get("adminName") as string || "").trim();
    const adminAddress = (formFields.get("adminAddress") as string || "").trim();
    const adminContact = (formFields.get("adminContact") as string || "").trim();

    // Armar FormData definitivo para enviar los archivos
    const submissionData = new FormData();
    submissionData.append("name", name);
    submissionData.append("role", role);
    submissionData.append("email", email);
    submissionData.append("phone", phone);
    submissionData.append("establishmentType", estType);
    submissionData.append("address", address);
    submissionData.append("frequencyHoursDays", frequency);
    submissionData.append("preferredSchedule", schedule);
    submissionData.append("hasCurrentService", hasCurrentService);
    submissionData.append("estimatedStartDate", start);
    submissionData.append("message", message);

    if (estType.toLowerCase() === "consorcio") {
      submissionData.append("adminName", adminName);
      submissionData.append("adminAddress", adminAddress);
      submissionData.append("adminContact", adminContact);
    }

    // Agregar fotos desde el estado de React
    selectedFiles.forEach(file => {
      submissionData.append("photos", file);
    });

    const response = await submitQuoteForm(submissionData);

    setIsSubmitting(false);
    if (response.success) {
      setFeedback({ type: 'success', message: response.message });
      if (formRef.current) formRef.current.reset();
      setSelectedFiles([]);
      setPreviews([]);
      setEstablishmentType("");
      setHasCurrentService("");
      setStep(1); // Volver al primer paso después del éxito
      setTimeout(() => setFeedback({ type: null, message: '' }), 8000);
    } else {
      setFeedback({ type: 'error', message: response.message });
    }
  }

  return (
    <section id="contacto" className="py-24 bg-brand-50 dark:bg-slate-950 relative overflow-x-clip border-t border-brand-100 dark:border-slate-900">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-200/20 dark:bg-brand-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }}
            className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-6"
          >
            Contanos qué <span className="text-brand-600 dark:text-brand-400">buscás</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium"
          >
            Completá este formulario detallado y diseñaremos una propuesta a tu medida. 
            Presupuesto cerrado, transparente y sin sorpresas.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Canales laterales */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }}
            className="lg:col-span-4 space-y-8 lg:sticky lg:top-28"
          >
            <div className="bg-white/80 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-brand-100 dark:border-slate-800 shadow-xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-slate-850 dark:text-white mb-6">Canales Directos</h3>
              <div className="space-y-6">
                
                {/* WhatsApp */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#25D366]/10 dark:bg-[#25D366]/15 flex items-center justify-center text-[#25D366] border border-[#25D366]/20 group-hover:scale-105 transition-transform">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">Asesoramiento Comercial</p>
                    <a
                      href="https://wa.me/5492235220338?text=Hola%20Ariana!%20Vengo%20de%20la%20pagina%20web%20y%20me%20gustar%C3%ADa%20hacer%20una%20consulta%20institucional."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-base font-bold text-[#25D366] hover:underline"
                    >
                      WhatsApp Ariana
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-brand-50 dark:bg-slate-800 flex items-center justify-center text-brand-650 dark:text-brand-400 border border-brand-100 dark:border-slate-700 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">Escríbinos por Email</p>
                    <a href="mailto:info@arianaservicios.com.ar" className="text-base font-bold text-slate-800 dark:text-white hover:text-brand-600 transition-colors break-all leading-tight block">
                      info@arianaservicios.com.ar
                    </a>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-amber-50 dark:bg-slate-800 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-slate-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">Zona de Cobertura</p>
                    <p className="text-base font-bold text-slate-850 dark:text-white">Mar del Plata y alrededores</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Tarjeta de Garantía */}
            <div className="bg-gradient-to-br from-brand-600 to-brand-700 dark:from-slate-900 dark:to-slate-800 p-8 rounded-[2.5rem] text-white shadow-xl">
              <ShieldCheck className="w-10 h-10 mb-4 text-white dark:text-brand-400" />
              <h4 className="text-lg font-bold mb-2">Protección de Datos</h4>
              <p className="text-sm text-brand-50 dark:text-slate-350 leading-relaxed font-medium">
                Toda la información y fotos cargadas en este formulario son tratadas bajo estricta confidencialidad comercial para la elaboración de la oferta. Ariana Servicios jamás compartirá sus datos ni le enviará spam publicitario.
              </p>
            </div>
          </motion.div>

                   <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0, margin: "0px 0px 400px 0px" }}
            className="lg:col-span-8 p-8 md:p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-brand-100 dark:border-slate-800 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-slate-850 dark:text-white mb-8 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              Presupuesto de Limpieza Corporativa
            </h3>

            {/* Indicador de pasos */}
            <div className="mb-10 relative">
              <div className="flex items-center justify-between relative">
                {/* Línea de fondo */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-brand-100 dark:bg-slate-850 -translate-y-1/2 z-0" />
                {/* Línea de progreso activa */}
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-brand-500 transition-all duration-300 -translate-y-1/2 z-0"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                />
                
                {[1, 2, 3].map((s) => (
                  <div key={s} className="relative z-10 flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                        step >= s 
                          ? "bg-brand-500 border-brand-500 text-white shadow-md shadow-brand-500/20" 
                          : "bg-white dark:bg-slate-900 border-brand-200 dark:border-slate-800 text-slate-400"
                      }`}
                    >
                      {s}
                    </div>
                    <span className={`text-xs font-semibold mt-2 hidden sm:block ${step >= s ? "text-brand-650 dark:text-brand-400" : "text-slate-400"}`}>
                      {s === 1 && "Contacto"}
                      {s === 2 && "El Lugar"}
                      {s === 3 && "Servicio"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit} noValidate>
              
              {/* PASO 1: Datos de Contacto */}
              <div className={step === 1 ? "space-y-6 animate-fadeIn" : "hidden"}>
                <h4 className="text-base font-bold text-slate-800 dark:text-white border-b border-brand-100 dark:border-slate-850 pb-2 mb-4">
                  Paso 1: Información de Contacto
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400" /> Nombre y Apellido *
                    </label>
                    <input
                      name="name"
                      type="text"
                      onChange={() => clearError("name")}
                      className={`w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none transition-all disabled:opacity-50 ${errors.name ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500'}`}
                      placeholder="Ej. Juan Pérez"
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Cargo que ocupa (Opcional)</label>
                    <select
                      name="role"
                      defaultValue=""
                      className="w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-800 dark:text-white outline-none transition-all disabled:opacity-50 appearance-none border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500"
                      disabled={isSubmitting}
                    >
                      <option value="" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Seleccione su cargo (opcional)...</option>
                      <option value="Propietario" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Propietario</option>
                      <option value="Gerente" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Gerente</option>
                      <option value="Administrador" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Administrador / Administradora</option>
                      <option value="Encargado / Supervisor" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Encargado o Supervisor</option>
                      <option value="Miembro de Consorcio" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Miembro de Consorcio</option>
                      <option value="Otro" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email de contacto *</label>
                    <input
                      name="email"
                      type="email"
                      onChange={() => clearError("email")}
                      className={`w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none transition-all disabled:opacity-50 ${errors.email ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500'}`}
                      placeholder="ejemplo@correo.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Teléfono móvil / WhatsApp *</label>
                    <input
                      name="phone"
                      type="tel"
                      onChange={() => clearError("phone")}
                      className={`w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none transition-all disabled:opacity-50 ${errors.phone ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500'}`}
                      placeholder="Ej. 223 5123456"
                      disabled={isSubmitting}
                    />
                    {errors.phone && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* PASO 2: Detalles del Lugar */}
              <div className={step === 2 ? "space-y-6" : "hidden"}>
                <h4 className="text-base font-bold text-slate-800 dark:text-white border-b border-brand-100 dark:border-slate-850 pb-2 mb-4">
                  Paso 2: Información del Establecimiento
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tipo de establecimiento *</label>
                    <select
                      name="establishmentType"
                      value={establishmentType}
                      onChange={(e) => {
                        setEstablishmentType(e.target.value);
                        clearError("establishmentType");
                      }}
                      className={`w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-800 dark:text-white outline-none transition-all disabled:opacity-50 appearance-none ${errors.establishmentType ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500'}`}
                      disabled={isSubmitting}
                    >
                      <option value="" disabled className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Seleccione el tipo...</option>
                      <option value="Consorcio" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Consorcio de Edificio</option>
                      <option value="Oficina" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Oficinas Comerciales / Corporativo</option>
                      <option value="Local Comercial" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Local Comercial / Salón</option>
                      <option value="Entidad Bancaria" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Entidad Bancaria / Financiera</option>
                      <option value="Establecimiento Educativo" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Establecimiento Educativo / Colegio</option>
                      <option value="Clinica / Centro Salud" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Clínica o Centro de Salud</option>
                      <option value="Final de Obra" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Final de Obra / Limpieza Única</option>
                      <option value="Otro" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Otro Establecimiento</option>
                    </select>
                    {errors.establishmentType && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.establishmentType}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Dirección del establecimiento *</label>
                    <input
                      name="address"
                      type="text"
                      onChange={() => clearError("address")}
                      className={`w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none transition-all disabled:opacity-50 ${errors.address ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500'}`}
                      placeholder="Calle, altura e indicaciones"
                      disabled={isSubmitting}
                    />
                    {errors.address && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.address}</p>}
                  </div>
                </div>

                {/* Lógica Condicional: Consorcio */}
                <AnimatePresence>
                  {establishmentType.toLowerCase() === "consorcio" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 rounded-2xl bg-brand-100/50 dark:bg-slate-850 border border-brand-200 dark:border-slate-800 space-y-4 my-2">
                        <h4 className="text-sm font-bold text-brand-700 dark:text-brand-400 uppercase tracking-wider mb-2">
                          Datos obligatorios de la Administración a Cargo
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Nombre Administración *</label>
                            <input
                              name="adminName"
                              type="text"
                              onChange={() => clearError("adminName")}
                              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-850 dark:text-white outline-none text-sm ${errors.adminName ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-brand-200 dark:border-slate-750 focus:ring-1 focus:ring-brand-500'}`}
                              placeholder="Ej. Adm. Patiño"
                              disabled={isSubmitting}
                            />
                            {errors.adminName && <p className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5"><AlertCircle className="w-3.5 h-3.5" />{errors.adminName}</p>}
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Dirección Adm. *</label>
                            <input
                              name="adminAddress"
                              type="text"
                              onChange={() => clearError("adminAddress")}
                              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-850 dark:text-white outline-none text-sm ${errors.adminAddress ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-brand-200 dark:border-slate-750 focus:ring-1 focus:ring-brand-500'}`}
                              placeholder="Ej. La Rioja 1520"
                              disabled={isSubmitting}
                            />
                            {errors.adminAddress && <p className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5"><AlertCircle className="w-3.5 h-3.5" />{errors.adminAddress}</p>}
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-350">Contacto Adm. (Tel/Mail) *</label>
                            <input
                              name="adminContact"
                              type="text"
                              onChange={() => clearError("adminContact")}
                              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-850 dark:text-white outline-none text-sm ${errors.adminContact ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-brand-200 dark:border-slate-750 focus:ring-1 focus:ring-brand-500'}`}
                              placeholder="Ej. 223 491-xxxx"
                              disabled={isSubmitting}
                            />
                            {errors.adminContact && <p className="text-[10px] text-red-500 flex items-center gap-0.5 mt-0.5"><AlertCircle className="w-3.5 h-3.5" />{errors.adminContact}</p>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* PASO 3: Especificación del Servicio */}
              <div className={step === 3 ? "space-y-6" : "hidden"}>
                <h4 className="text-base font-bold text-slate-800 dark:text-white border-b border-brand-100 dark:border-slate-850 pb-2 mb-4">
                  Paso 3: Detalles de la Contratación
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" /> Frecuencia e Intensidad *
                    </label>
                    <select
                      name="frequencyHoursDays"
                      defaultValue=""
                      onChange={() => clearError("frequencyHoursDays")}
                      className={`w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-800 dark:text-white outline-none transition-all disabled:opacity-50 appearance-none ${errors.frequencyHoursDays ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500'}`}
                      disabled={isSubmitting}
                    >
                      <option value="" disabled className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Seleccione la frecuencia...</option>
                      <option value="Diario (Lunes a Viernes)" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Diario (Lunes a Viernes)</option>
                      <option value="3 veces por semana" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">3 veces por semana</option>
                      <option value="2 veces por semana" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">2 veces por semana</option>
                      <option value="Una vez por semana" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Una vez por semana / Especial</option>
                      <option value="Otro / Frecuencia personalizada" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Otro (especificar abajo en Detalles)</option>
                    </select>
                    {errors.frequencyHoursDays && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.frequencyHoursDays}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Horarios y días de preferencia *</label>
                    <select
                      name="preferredSchedule"
                      defaultValue=""
                      onChange={() => clearError("preferredSchedule")}
                      className={`w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-800 dark:text-white outline-none transition-all disabled:opacity-50 appearance-none ${errors.preferredSchedule ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500'}`}
                      disabled={isSubmitting}
                    >
                      <option value="" disabled className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Seleccione el horario...</option>
                      <option value="Por la mañana (08:00 a 12:00)" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Por la mañana (08:00 a 12:00)</option>
                      <option value="Por la tarde (12:00 a 17:00)" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Por la tarde (12:00 a 17:00)</option>
                      <option value="Noche (fuera de horario comercial)" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Noche (fuera de horario comercial)</option>
                      <option value="Indistinto / Horario corrido" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Indistinto / Horario corrido</option>
                    </select>
                    {errors.preferredSchedule && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.preferredSchedule}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">¿Cuenta actualmente con servicio de limpieza? *</label>
                    <div className="flex items-center gap-6 py-2">
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
                        <input
                          type="radio"
                          name="hasCurrentService"
                          value="si"
                          checked={hasCurrentService === "si"}
                          onChange={() => {
                            setHasCurrentService("si");
                            clearError("hasCurrentService");
                          }}
                          className="w-4 h-4 text-brand-500 focus:ring-brand-500 border-brand-200 dark:border-slate-700"
                          disabled={isSubmitting}
                        />
                        Sí
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
                        <input
                          type="radio"
                          name="hasCurrentService"
                          value="no"
                          checked={hasCurrentService === "no"}
                          onChange={() => {
                            setHasCurrentService("no");
                            clearError("hasCurrentService");
                          }}
                          className="w-4 h-4 text-brand-500 focus:ring-brand-500 border-brand-200 dark:border-slate-700"
                          disabled={isSubmitting}
                        />
                        No
                      </label>
                    </div>
                    {errors.hasCurrentService && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.hasCurrentService}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" /> Fecha estimada de inicio (Opcional)
                    </label>
                    <input
                      name="estimatedStartDate"
                      type="date"
                      className="w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none transition-all disabled:opacity-50 border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Fotos del lugar */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-slate-400" /> Adjuntar fotos del lugar (Opcional)
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ayúdanos a evaluar el estado subiendo fotos (fachada, interiores, patios). Podés subir hasta {MAX_FILES} imágenes (PNG o JPG), máximo {MAX_SIZE_MB}MB por foto.
                  </p>

                  <div className="flex flex-wrap gap-4 items-center mt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={selectedFiles.length >= MAX_FILES || isSubmitting}
                      className="px-6 py-4 border border-dashed border-brand-300 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-350 hover:bg-brand-50/30 dark:hover:bg-slate-850 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload className="w-4 h-4 text-brand-500" />
                      Seleccionar fotos ({selectedFiles.length}/{MAX_FILES})
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                  </div>

                  {errors.photos && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.photos}</p>}

                  {previews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4 bg-brand-50/40 dark:bg-slate-950/30 p-4 rounded-2xl border border-brand-100 dark:border-slate-850">
                      {previews.map((url, idx) => (
                        <div key={idx} className="relative h-24 rounded-xl overflow-hidden border border-brand-100 dark:border-slate-800 shadow bg-white dark:bg-slate-900 group">
                          <img
                            src={url}
                            alt={`Previsualización ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="absolute top-1 right-1 bg-black/60 hover:bg-red-650 text-white rounded-full p-1 transition-colors"
                            title="Eliminar foto"
                            disabled={isSubmitting}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Detalle / Mensaje */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Detalles de la limpieza / Requerimientos específicos (Opcional)</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none transition-all resize-none disabled:opacity-50 border-brand-100 dark:border-slate-750 focus:ring-2 focus:ring-brand-500"
                    placeholder="Ej. Contar con limpieza de vidrios quincenal, pisos cerámicos que requieren encerado, limpieza de 2 sanitarios, etc..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {/* Cláusula de Privacidad y Spam */}
                <div className="border-t border-brand-100 dark:border-slate-800 pt-6">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="privacyAccepted"
                      id="privacyAccepted"
                      onChange={(e) => {
                        if (e.target.checked) {
                          clearError("privacyAccepted");
                        }
                      }}
                      className="w-4 h-4 mt-1 text-brand-500 focus:ring-brand-500 border-brand-200 dark:border-slate-700 rounded cursor-pointer"
                      disabled={isSubmitting}
                    />
                    <div className="space-y-1">
                      <label htmlFor="privacyAccepted" className="text-xs sm:text-sm font-semibold text-slate-650 dark:text-slate-300 cursor-pointer">
                        Garantía de Privacidad y Spam *
                      </label>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-brand-500 inline-block shrink-0" />
                        Acepto que mis datos y fotos se usarán con absoluta reserva comercial. Ariana Servicios garantiza que no recibiré Spam publicitario.
                      </p>
                    </div>
                  </div>
                  {errors.privacyAccepted && <p className="text-xs text-red-500 flex items-center gap-1 mt-2"><AlertCircle className="w-3.5 h-3.5" />{errors.privacyAccepted}</p>}
                </div>
              </div>

              {/* Feedback */}
              {feedback.type && (
                <div className={`p-5 rounded-2xl flex items-center gap-3 text-sm font-medium border ${feedback.type === 'success' ? 'bg-teal-50 text-teal-800 dark:bg-emerald-950/30 dark:text-emerald-400 border-teal-200 dark:border-emerald-850' : 'bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-850'}`}>
                  {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  <p>{feedback.message}</p>
                </div>
              )}

              {/* Botones de Navegación */}
              <div className="flex gap-4 pt-6 border-t border-brand-100 dark:border-slate-800">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="flex-1 py-4 border border-brand-300 hover:bg-brand-50 dark:border-slate-700 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    Volver
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-4 bg-brand-500 hover:bg-brand-600 dark:bg-brand-650 dark:hover:bg-brand-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/10"
                  >
                    Siguiente Paso
                    <Send className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-brand-500 hover:bg-brand-600 dark:bg-brand-650 dark:hover:bg-brand-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/10 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Solicitar Presupuesto Cerrado
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
