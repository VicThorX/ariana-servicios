import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arianaservicios.com.ar'),
  title: {
    default: "Empresa de Limpieza en Mar del Plata | Ariana Servicios",
    template: "%s | Ariana Servicios"
  },
  description: "Empresa líder de limpieza en Mar del Plata. Más de 20 años de experiencia en limpieza profesional de oficinas, consorcios y finales de obra. ¡Pedí tu presupuesto hoy!",
  keywords: ["limpieza profesional", "limpieza de oficinas", "limpieza de empresas", "limpieza de consorcios", "mantenimiento institucional", "suplencia de personal", "Mar del Plata", "artículos de limpieza"],
  authors: [{ name: "Ariana Servicios" }],
  creator: "Ariana Servicios",
  publisher: "Ariana Servicios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ariana Servicios | Empresa de Limpieza en Mar del Plata',
    description: 'Empresa líder de limpieza en Mar del Plata. Más de 20 años de experiencia en limpieza profesional de oficinas, consorcios y finales de obra. ¡Pedí tu presupuesto hoy!',
    url: 'https://arianaservicios.com.ar',
    siteName: 'Ariana Servicios',
    images: [
      {
        url: '/logo_somos_ariana.png',
        width: 800,
        height: 600,
        alt: 'Ariana Servicios Logo',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ariana Servicios | Empresa de Limpieza en Mar del Plata',
    description: 'Empresa líder de limpieza en Mar del Plata. Más de 20 años de experiencia en limpieza profesional de oficinas, consorcios y finales de obra. ¡Pedí tu presupuesto hoy!',
    images: ['/logo_somos_ariana.png'],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" }
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${quicksand.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
