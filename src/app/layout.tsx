import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ThemeProvider from "@/components/ui/ThemeProvider";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arianaservicios.com.ar'),
  title: {
    default: "Ariana Servicios | Limpieza Profesional Integral en Mar del Plata",
    template: "%s | Ariana Servicios"
  },
  description: "Servicios de limpieza integral, mantenimiento y suplencias para empresas, oficinas, consorcios e instituciones en Mar del Plata.",
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
    title: 'Ariana Servicios | Limpieza Profesional Integral',
    description: 'Soluciones de limpieza, mantenimiento y suplencias para empresas, oficinas y consorcios en Mar del Plata.',
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
    title: 'Ariana Servicios | Limpieza Profesional Integral',
    description: 'Soluciones de limpieza, mantenimiento y suplencias en Mar del Plata.',
    images: ['/logo_somos_ariana.png'],
  },
  icons: {
    icon: "/logo_somos_ariana.png",
    apple: "/logo_somos_ariana.png",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
