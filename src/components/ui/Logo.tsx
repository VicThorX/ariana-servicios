import Link from "next/link";
import { Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export default function Logo({ className, isDark }: LogoProps) {
  // When isDark is forced (Footer), always use dark styles.
  // Otherwise, adapt to current theme via dark: variants.
  const textColor = isDark 
    ? "text-brand-50 group-hover:text-brand-200" 
    : "text-brand-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400";
    
  const subtextColor = isDark 
    ? "text-purple-300" 
    : "text-purple-600 dark:text-slate-400";
    
  const iconBg = isDark 
    ? "bg-white/10 border-brand-800" 
    : "bg-white/50 border-brand-200 shadow-sm dark:bg-slate-800 dark:border-slate-700";

  const svgColor = isDark 
    ? "text-brand-400 group-hover:text-brand-300" 
    : "text-brand-500 group-hover:text-brand-600 dark:text-brand-400 dark:group-hover:text-brand-300";

  return (
    <Link href="/" className={`flex items-center gap-3 group ${className || ""}`}>
      <div className={`relative w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center border transition-transform duration-500 group-hover:scale-105 ${iconBg}`}>
         <svg className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${svgColor}`} viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 2C8 2 4 6 4 10C4 15.5 12 22 12 22C12 22 20 15.5 20 10C20 6 16 2 12 2ZM10.5 7.5L13.5 15H11.8L11.2 13.5H9.3L8.7 15H7L10.5 7.5ZM10.2 11.5H11.8L11 8.8L10.2 11.5Z" />
         </svg>
         <Sparkles className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 text-teal-400 dark:text-brand-400 opacity-80" />
      </div>
      <div className="flex flex-col justify-center">
        <span className={`text-xl md:text-2xl font-bold tracking-normal leading-none transition-colors ${textColor}`}>
          Somos Ariana
        </span>
        <span className={`text-[0.65rem] md:text-xs font-bold tracking-wide uppercase leading-none mt-1 ${subtextColor}`}>
          Limpieza de Espacios
        </span>
      </div>
    </Link>
  );
}
