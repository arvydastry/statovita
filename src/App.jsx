import { Header } from "@/components/sections/Header.jsx";
import { Hero } from "@/components/sections/Hero.jsx";
import { Services } from "@/components/sections/Services.jsx";
import { Experience } from "@/components/sections/Experience.jsx";
import { Projects } from "@/components/sections/Projects.jsx";
import { Clients } from "@/components/sections/Clients.jsx";
import { Management } from "@/components/sections/Management.jsx";
import { CallToAction, Contact } from "@/components/sections/Contact.jsx";
import { Careers } from "@/components/sections/Careers.jsx";
import { Footer } from "@/components/sections/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Experience />
        <Projects />
        <Clients />
        <Management />
        <CallToAction />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
