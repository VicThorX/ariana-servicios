export default function BrandLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Logotipo Ariana Servicios"
    >
      {/* 
        A-Shape Framework (Las Piernas).
        Se usa `currentColor` para que herede dinámicamente el color del texto Padre 
        (ej. Blanco en el Footer oscuro, Pizarra en el Header claro).
      */}
      <path 
        d="M 22 90 L 50 15 L 78 90" 
        stroke="currentColor" 
        strokeWidth="13" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* 
        Estrella / Destello Central (Sparkle).
        Sobrepuesta justo en el travesaño horizontal cruzando perfectamente 
        las coordenadas X e Y calculadas para fusionarse con las piernas.
      */}
      <path 
        d="M 50 40 Q 50 60 28 60 Q 50 60 50 80 Q 50 60 72 60 Q 50 60 50 40 Z" 
        fill="#38BDF8" 
        className="drop-shadow-sm"
      />
    </svg>
  );
}
