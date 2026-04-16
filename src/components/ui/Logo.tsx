import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export default function Logo({ className, isDark }: LogoProps) {
  // Quitamos la inversión de colores para que el logo mantenga su color original en modo oscuro.
  // Reemplazamos el drop-shadow difuso por uno nítido (0 offset, 1px blur con blanco puro) para darle un borde definido sin manchar el logo.
  const darkClasses = "drop-shadow-[0_0_1.5px_rgba(255,255,255,1)] brightness-110";
  const imageClasses = isDark
    ? darkClasses
    : `dark:drop-shadow-[0_0_1.5px_rgba(255,255,255,1)] dark:brightness-110`;

  return (
    <Link href="/" className={`flex shrink-0 items-center group transition-transform duration-500 hover:scale-[1.02] ${className || ""}`}>
      <div className="relative flex items-center justify-center">
        <Image
          src="/hd_restoration_result_image.png"
          alt="Somos Ariana Limpieza"
          width={800}
          height={240}
          className={`w-[10rem] md:w-[11rem] lg:w-[15rem] h-auto object-contain transition-all duration-300 ${imageClasses}`}
          priority
        />
      </div>
    </Link>
  );
}
