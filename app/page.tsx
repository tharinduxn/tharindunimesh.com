import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Expertise } from "@/components/expertise";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
import { Header } from "@/components/header";
import { IntroLoader } from "@/components/intro-loader";
import { MotionEffects } from "@/components/motion-effects";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <Header home />
      <MotionEffects />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Expertise />
        <Process />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
