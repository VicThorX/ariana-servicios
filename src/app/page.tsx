import Hero from "@/components/layout/Hero";
import About from "@/components/sections/About";
import Clients from "@/components/sections/Clients";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import Benefits from "@/components/sections/Benefits";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Clients />
      <Services />
      <Products />
      <Benefits />
      <Contact />
    </main>
  );
}
