"use client";

import Link from "next/link";
import type { Project } from "@/src/data/projects";
import { getCategory, getProjectById, getStatusMeta } from "@/src/data/projects";
import { ArrowRight, ArrowUpRight, GithubIcon } from "./Icons";
import ProjectVisual from "./ProjectVisual";
import { useLanguage } from "./LanguageProvider";

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const { locale, copy } = useLanguage();
  const localizedProject = getProjectById(project.id, locale) ?? project;
  const category = getCategory(localizedProject.category, locale);
  const statusMeta = getStatusMeta(locale);
  return (
    <article className={`project-card${featured ? " featured-card" : ""}`}>
      <ProjectVisual project={localizedProject} compact={!featured} />
      <div className="project-card-body">
        <div className="card-meta">
          <span className={`status-pill status-${localizedProject.status}`}><i />{statusMeta[localizedProject.status].label}</span>
          <span>{category?.shortName}</span>
        </div>
        <h3>{localizedProject.shortTitle ?? localizedProject.title}</h3>
        {localizedProject.englishTitle && <p className="english-title">{localizedProject.englishTitle}</p>}
        <p className="card-summary">{localizedProject.summary}</p>
        <p className="audience-line"><span>{copy.projects.applicable}</span>{localizedProject.audiences.slice(0, 2).join(" · ")}</p>
        <div className="tag-row" aria-label={copy.projects.tags}>{localizedProject.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="card-actions">
          {localizedProject.siteUrl ? (
            <a className="button button-primary button-small" href={localizedProject.siteUrl} target="_blank" rel="noreferrer noopener">
              {copy.projects.open} <ArrowUpRight size={16} /><span className="sr-only">{copy.common.newTab}</span>
            </a>
          ) : <span className="unavailable-label">{copy.projects.unavailable}</span>}
          <Link className="text-link" href={`/projects/${localizedProject.slug}/`}>{copy.projects.details} <ArrowRight size={16} /></Link>
          {localizedProject.githubUrl && <a className="icon-link" href={localizedProject.githubUrl} target="_blank" rel="noreferrer noopener" aria-label={copy.projects.githubLabel(localizedProject.title)}><GithubIcon size={18} /></a>}
        </div>
      </div>
    </article>
  );
}
