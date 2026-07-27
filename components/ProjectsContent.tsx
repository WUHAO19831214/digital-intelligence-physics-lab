"use client";

import ProjectExplorer from "@/components/ProjectExplorer";
import { projects } from "@/src/data/projects";
import { useLanguage } from "./LanguageProvider";

export default function ProjectsContent() {
  const { copy } = useLanguage();
  return (
    <main>
      <section className="page-hero">
        <div className="shell narrow">
          <p className="section-kicker">{copy.common.kickers.directory}</p>
          <h1>{copy.projects.title}</h1>
          <p>{copy.projects.intro}</p>
        </div>
      </section>
      <section className="section directory-section">
        <div className="shell"><ProjectExplorer projects={projects} /></div>
      </section>
    </main>
  );
}
