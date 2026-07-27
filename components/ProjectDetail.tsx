"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, GithubIcon, InfoIcon } from "@/components/Icons";
import ProjectVisual from "@/components/ProjectVisual";
import { getCategory, getProjectBySlug, getStatusMeta } from "@/src/data/projects";
import { useLanguage } from "./LanguageProvider";

const sectionKeys = ["capabilities", "teachingValue", "scenarios", "technicalHighlights", "roadmap"] as const;

export default function ProjectDetail({ slug }: { slug: string }) {
  const { locale, copy } = useLanguage();
  const project = getProjectBySlug(slug, locale);
  if (!project) return null;

  const category = getCategory(project.category, locale);
  const statusMeta = getStatusMeta(locale);
  const formalVersions = project.versions?.filter((version) => version.status === "active" && version.siteUrl) ?? [];
  const audienceSeparator = locale === "zh" ? "、" : locale === "ja" ? "、" : ", ";

  return (
    <main>
      <section className="detail-hero">
        <div className="shell">
          <div className="breadcrumbs"><Link href="/projects/">{copy.detail.directory}</Link><span>/</span><span>{category?.shortName}</span></div>
          <div className="detail-hero-grid">
            <div>
              <div className="card-meta"><span className={`status-pill status-${project.status}`}><i />{statusMeta[project.status].label}</span><span>{category?.name}</span></div>
              <h1>{project.title}</h1>
              {project.englishTitle && <p className="detail-english">{project.englishTitle}</p>}
              <p className="detail-lead">{project.description ?? project.summary}</p>
              <div className="detail-actions">
                {project.siteUrl && <a className="button button-primary" href={project.siteUrl} target="_blank" rel="noreferrer noopener">{copy.detail.online} <ArrowUpRight /><span className="sr-only">{copy.common.newTab}</span></a>}
                {project.githubUrl && <a className="button button-secondary" href={project.githubUrl} target="_blank" rel="noreferrer noopener"><GithubIcon /> {copy.detail.github}<span className="sr-only">{copy.common.newTab}</span></a>}
                {!project.siteUrl && <span className="detail-unavailable">{copy.detail.unavailable}</span>}
              </div>
            </div>
            <ProjectVisual project={project} />
          </div>
        </div>
      </section>

      <section className="section detail-section">
        <div className="shell detail-layout">
          <article className="detail-main">
            {project.notice && <div className="notice-banner"><InfoIcon /><div><strong>{copy.detail.noticeTitle}</strong><p>{project.notice}</p></div></div>}
            {formalVersions.length > 1 && (
              <section className="content-section official-entries">
                <p className="section-kicker">{copy.common.kickers.formalEntries}</p>
                <h2>{copy.detail.formalEntries}</h2>
                <div>{formalVersions.map((version) => <a key={version.name} href={version.siteUrl} target="_blank" rel="noreferrer noopener"><span><strong>{version.name}</strong><small>{version.note}</small></span><ArrowUpRight /></a>)}</div>
              </section>
            )}
            <section className="content-section">
              <p className="section-kicker">{copy.common.kickers.context}</p>
              <h2>{copy.detail.contextTitle}</h2>
              <p>{project.background ?? project.description}</p>
            </section>
            {sectionKeys.map((key) => {
              const items = project[key];
              if (!items?.length) return null;
              return (
                <section className="content-section" key={key}>
                  <h2>{copy.detail.sections[key]}</h2>
                  <ul className={key === "roadmap" ? "roadmap-list" : "content-list"}>
                    {items.map((item, index) => <li key={item}><span>{key === "roadmap" ? String(index + 1).padStart(2, "0") : ""}</span>{item}</li>)}
                  </ul>
                </section>
              );
            })}
            {project.versions?.length ? (
              <section className="content-section version-section">
                <details>
                  <summary><span><small>{copy.common.kickers.versionHistory}</small><strong>{copy.detail.versionTitle}</strong></span><span>{copy.detail.records(project.versions.length)} <ArrowRight /></span></summary>
                  <div className="version-list">
                    {project.versions.map((version) => (
                      <article key={`${version.name}-${version.role}`}>
                        <div><span className={`status-pill status-${version.status}`}><i />{statusMeta[version.status].label}</span><h3>{version.name}</h3><p>{version.note}</p></div>
                        <div className="version-links">{version.siteUrl && <a href={version.siteUrl} target="_blank" rel="noreferrer noopener">{copy.detail.web} <ArrowUpRight size={15} /></a>}{version.githubUrl && <a href={version.githubUrl} target="_blank" rel="noreferrer noopener">GitHub <GithubIcon size={15} /></a>}</div>
                      </article>
                    ))}
                  </div>
                </details>
              </section>
            ) : null}
          </article>
          <aside className="detail-aside">
            <div className="aside-card">
              <span className="aside-label">{copy.detail.overview}</span>
              <dl>
                <div><dt>{copy.detail.currentStatus}</dt><dd>{statusMeta[project.status].label}</dd></div>
                <div><dt>{copy.detail.audiences}</dt><dd>{project.audiences.join(audienceSeparator)}</dd></div>
                <div><dt>{copy.detail.category}</dt><dd>{category?.name}</dd></div>
                {project.updatedAt && <div><dt>{copy.detail.updated}</dt><dd>{project.updatedAt}</dd></div>}
              </dl>
              <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="external-note"><InfoIcon size={18} /><p>{copy.detail.externalNote}</p></div>
          </aside>
        </div>
      </section>
    </main>
  );
}
