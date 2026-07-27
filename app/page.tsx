"use client";

import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { ArrowRight, ArrowUpRight, CheckIcon } from "@/components/Icons";
import { getCategories, getFeaturedProjects, getProjects } from "@/src/data/projects";
import { useLanguage } from "@/components/LanguageProvider";

export default function HomePage() {
  const { locale, copy } = useLanguage();
  const projects = getProjects(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const categories = getCategories(locale);
  const formalCount = projects.filter((project) => project.siteUrl).length;
  return (
    <main>
      <section className="hero">
        <div className="hero-field" aria-hidden="true"><div className="axis axis-x" /><div className="axis axis-y" /><div className="hero-vector"><i /><span>F</span></div><svg viewBox="0 0 640 220"><path d="M0 160 C80 160 85 60 160 60 S240 160 320 160 405 60 480 60 560 160 640 160" /></svg></div>
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span>{copy.common.kickers.personalPortal}</span><i /> {copy.home.eyebrow}</p>
            <h1>{copy.home.title}</h1>
            <p className="hero-english">{copy.home.englishTitle}</p>
            <h2>{copy.home.subtitle}</h2>
            <p className="hero-lead">{copy.home.lead}</p>
            <div className="hero-actions"><Link className="button button-primary" href="/projects/">{copy.home.browse} <ArrowRight /></Link><a className="button button-secondary" href="#featured">{copy.home.featuredLink}</a></div>
            <div className="hero-notes">{copy.home.notes.map((note) => <span key={note}><CheckIcon size={16} />{note}</span>)}</div>
          </div>
          <aside className="lab-index" aria-label={copy.home.overview}>
            <div className="lab-index-top"><span>{copy.home.indexTitle}</span><span>2026 / 07</span></div>
            <div className="measurement-panel"><svg viewBox="0 0 360 130"><path className="measure-grid" d="M0 26h360M0 65h360M0 104h360M60 0v130M120 0v130M180 0v130M240 0v130M300 0v130" /><path className="measure-curve" d="M0 96 C52 98 62 30 112 42 S184 116 224 72 280 28 360 48" /><circle cx="224" cy="72" r="5" /></svg><div><span>Δx / cm</span><span>f / Hz</span></div></div>
            <dl>{[projects.length, formalCount, categories.length].map((count, index) => <div key={copy.home.indexLabels[index]}><dt>{count.toString().padStart(2, "0")}</dt><dd>{copy.home.indexLabels[index]}</dd></div>)}</dl>
            <p><i /> {copy.home.updating}</p>
          </aside>
        </div>
      </section>

      <section className="section featured-section" id="featured">
        <div className="shell">
          <div className="section-heading"><div><p className="section-kicker">{copy.common.kickers.selectedWork}</p><h2>{copy.home.featuredTitle}</h2><p>{copy.home.featuredText}</p></div><Link className="text-link large" href="/projects/">{copy.home.allProjects} <ArrowRight /></Link></div>
          <div className="project-grid featured-grid">{featuredProjects.map((project) => <ProjectCard key={project.id} project={project} featured />)}</div>
        </div>
      </section>

      <section className="section category-section" id="categories">
        <div className="shell">
          <div className="section-heading"><div><p className="section-kicker">{copy.common.kickers.projectMap}</p><h2>{copy.home.categoryTitle}</h2><p>{copy.home.categoryText}</p></div></div>
          <div className="category-grid">{categories.map((category) => { const count = projects.filter((project) => project.category === category.id).length; return <Link href="/projects/" className="category-card" key={category.id}><span className="category-code">{category.code}</span><div><h3>{category.name}</h3><p>{copy.home.categoryCount(count)}</p></div><ArrowUpRight /></Link>; })}</div>
        </div>
      </section>

      <section className="section themes-section" id="themes">
        <div className="shell themes-layout"><div className="themes-intro"><p className="section-kicker">{copy.common.kickers.researchThemes}</p><h2>{copy.home.themesTitle}</h2><p>{copy.home.themesText}</p><Link className="button button-light" href="/about/">{copy.home.themesLink} <ArrowRight /></Link></div><div className="theme-list">{copy.home.themes.map((theme) => <article key={theme.number}><span>{theme.number}</span><div><h3>{theme.title}</h3><p>{theme.text}</p></div></article>)}</div></div>
      </section>

      <section className="section portal-note"><div className="shell"><div className="note-card"><div><p className="section-kicker">{copy.common.kickers.openEvolving}</p><h2>{copy.home.archiveTitle}</h2><p>{copy.home.archiveText}</p></div><Link className="button button-primary" href="/projects/">{copy.home.enterDirectory} <ArrowRight /></Link></div></div></section>
    </main>
  );
}
