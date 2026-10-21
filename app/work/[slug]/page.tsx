import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { ProjectVisual } from "@/components/project-visual";
import { Arrow } from "@/components/arrow";
import { Header } from "@/components/header";
import { MotionEffects } from "@/components/motion-effects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.description };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex(project => project.slug === slug);
  const project = projects[index];
  if (!project) notFound();
  const nextProject = projects[(index + 1) % projects.length];
  return (
    <>
      <Header />
      <MotionEffects key={slug} />
      <main className="case-study" id="main-content" tabIndex={-1}>
        <section className="case-intro container" data-reveal><div className="section-label eyebrow"><span className="index">Case study / {project.number}</span>{project.category}</div><h1>{project.title}<span className="accent">.</span></h1><p className="case-tagline">{project.tagline}</p><div className="case-facts"><div><span className="eyebrow">My role</span><p>{project.role}</p></div><div><span className="eyebrow">Toolkit</span><p>{project.stack.join(" / ")}</p></div><a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">{project.linkLabel}<span className="sr-only"> (opens in a new tab)</span> <Arrow /></a></div></section>
        <div className="container case-main-visual"><ProjectVisual project={project} priority /></div>
        <div className="case-narrative container"><aside><span className="eyebrow">Behind the build</span><p>{project.description}</p><nav aria-label="Case study chapters">{project.chapters.map((chapter, i) => <a key={chapter.title} href={`#${chapter.title.toLowerCase()}`}><span>0{i + 1}</span>{chapter.title}</a>)}</nav></aside><div>{project.chapters.map((chapter, i) => <section className="case-chapter" data-reveal id={chapter.title.toLowerCase()} key={chapter.title}><div className="eyebrow"><span className="accent">0{i + 1} /</span> {chapter.title}</div><h2>{chapter.heading}</h2><p>{chapter.body}</p></section>)}</div></div>
        <div className="case-next container"><span className="eyebrow">Keep exploring / Next project</span><Link href={`/work/${nextProject.slug}`}>{nextProject.title}<Arrow /></Link><Link className="text-link" href="/#work">All selected work <Arrow direction="right" /></Link></div>
      </main>
    </>
  );
}
