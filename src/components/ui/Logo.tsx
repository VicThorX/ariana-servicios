import Link from "next/link";
import Image from "next/image";
import logoLight from "../../../public/logo_somos_ariana_horizontal-transparente.png";
import logoDark from "../../../public/logo_somos_ariana_horizontal-transparente_modo_dark.png";

interface LogoProps {
  className?: string;
  /** Si es true, siempre muestra el logo para fondo oscuro (ej: Footer). */
  isDark?: boolean;
}

export default function Logo({ className, isDark }: LogoProps) {
  const sizeClasses = "w-[10rem] md:w-[11rem] lg:w-[15rem] h-auto object-contain transition-all duration-300";

  return (
    <Link href="/" className={`flex shrink-0 items-center group transition-transform duration-500 hover:scale-[1.02] ${className || ""}`}>
      <div className="relative flex items-center justify-center">
        {isDark ? (
          /* Footer: siempre fondo oscuro → siempre logo dark */
          <Image
            src={logoDark}
            alt="Somos Ariana Limpieza"
            className={sizeClasses}
            priority
          />
        ) : (
          /* Header: intercambia según el tema activo */
          <>
            {/* Logo claro — visible en light mode, oculto en dark mode */}
            <Image
              src={logoLight}
              alt="Somos Ariana Limpieza"
              className={`${sizeClasses} block dark:hidden`}
              priority
            />
            {/* Logo oscuro — oculto en light mode, visible en dark mode */}
            <Image
              src={logoDark}
              alt="Somos Ariana Limpieza"
              className={`${sizeClasses} hidden dark:block`}
              priority
            />
          </>
        )}
      </div>
    </Link>
  );
}
