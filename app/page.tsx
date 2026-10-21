import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Expertise } from "@/components/expertise";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
import { Header } from "@/components/header";
import { MotionEffects } from "@/components/motion-effects";

export default function Home() {
  return (
    <>
      <Header home />
      <MotionEffects />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Expertise />
        <Process />
        <Contact />
      </main>
    </>
  );
}
