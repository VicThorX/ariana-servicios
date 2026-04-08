import Hero from "@/components/layout/Hero";
import Clients from "@/components/sections/Clients";
import Services from "@/components/sections/Services";
import Benefits from "@/components/sections/Benefits";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Clients />
      <Services />
      <Benefits />
      <Contact />
    </main>
  );
}
