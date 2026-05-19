import Hero from "@/components/layout/Hero";
import About from "@/components/sections/About";
import Clients from "@/components/sections/Clients";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import Benefits from "@/components/sections/Benefits";
import LegalSecurity from "@/components/sections/LegalSecurity";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ariana Servicios",
    "image": "https://arianaservicios.com.ar/logo_somos_ariana.png",
    "@id": "https://arianaservicios.com.ar",
    "url": "https://arianaservicios.com.ar",
    "telephone": "+5492235220338",
    "email": "info@arianaservicios.com.ar",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mar del Plata",
      "addressRegion": "Buenos Aires",
      "addressCountry": "AR"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "10:00",
      "closes": "18:00"
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Clients />
      <Services />
      <Products />
      <Benefits />
      <LegalSecurity />
      <Contact />
    </main>
  );
}
