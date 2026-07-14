import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, GithubIcon, InfoIcon } from "@/components/Icons";
import ProjectVisual from "@/components/ProjectVisual";
import { getCategory, getProjectBySlug, projects, statusMeta } from "@/src/data/projects";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = getProjectBySlug(slug); if (!project) return {}; return { title: project.title, description: project.summary, openGraph: { title: project.title, description: project.summary } }; }

const sectionMap = [
  ["核心功能", "capabilities"], ["教学与实验价值", "teachingValue"], ["典型使用场景", "scenarios"], ["技术特点", "technicalHighlights"], ["后续规划", "roadmap"],
] as const;

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const category = getCategory(project.category);
  const formalVersions = project.versions?.filter((version) => version.status === "active" && version.siteUrl) ?? [];
  return (
    <main>
      <section className="detail-hero"><div className="shell"><div className="breadcrumbs"><Link href="/projects/">项目目录</Link><span>/</span><span>{category?.shortName}</span></div><div className="detail-hero-grid"><div><div className="card-meta"><span className={`status-pill status-${project.status}`}><i />{statusMeta[project.status].label}</span><span>{category?.name}</span></div><h1>{project.title}</h1>{project.englishTitle && <p className="detail-english">{project.englishTitle}</p>}<p className="detail-lead">{project.description ?? project.summary}</p><div className="detail-actions">{project.siteUrl && <a className="button button-primary" href={project.siteUrl} target="_blank" rel="noreferrer noopener">在线体验 <ArrowUpRight /><span className="sr-only">（在新标签页打开）</span></a>}{project.githubUrl && <a className="button button-secondary" href={project.githubUrl} target="_blank" rel="noreferrer noopener"><GithubIcon /> GitHub 仓库<span className="sr-only">（在新标签页打开）</span></a>}{!project.siteUrl && <span className="detail-unavailable">暂无可靠的正式在线入口，请查看项目状态说明。</span>}</div></div><ProjectVisual project={project} /></div></div></section>
      <section className="section detail-section"><div className="shell detail-layout"><article className="detail-main">
        {project.notice && <div className="notice-banner"><InfoIcon /><div><strong>入口与运行说明</strong><p>{project.notice}</p></div></div>}
        {formalVersions.length > 1 && <section className="content-section official-entries"><p className="section-kicker">FORMAL ENTRIES</p><h2>正式入口</h2><div>{formalVersions.map((version) => <a key={version.name} href={version.siteUrl} target="_blank" rel="noreferrer noopener"><span><strong>{version.name}</strong><small>{version.note}</small></span><ArrowUpRight /></a>)}</div></section>}
        <section className="content-section"><p className="section-kicker">CONTEXT</p><h2>项目背景与问题</h2><p>{project.background ?? project.description}</p></section>
        {sectionMap.map(([title, key]) => { const items = project[key]; if (!items?.length) return null; return <section className="content-section" key={key}><h2>{title}</h2><ul className={key === "roadmap" ? "roadmap-list" : "content-list"}>{items.map((item, index) => <li key={item}><span>{key === "roadmap" ? String(index + 1).padStart(2, "0") : ""}</span>{item}</li>)}</ul></section>; })}
        {project.versions?.length ? <section className="content-section version-section"><details><summary><span><small>VERSION HISTORY</small><strong>版本与研究历程</strong></span><span>{project.versions.length} 个记录 <ArrowRight /></span></summary><div className="version-list">{project.versions.map((version) => <article key={`${version.name}-${version.role}`}><div><span className={`status-pill status-${version.status}`}><i />{statusMeta[version.status].label}</span><h3>{version.name}</h3><p>{version.note}</p></div><div className="version-links">{version.siteUrl && <a href={version.siteUrl} target="_blank" rel="noreferrer noopener">网页 <ArrowUpRight size={15} /></a>}{version.githubUrl && <a href={version.githubUrl} target="_blank" rel="noreferrer noopener">GitHub <GithubIcon size={15} /></a>}</div></article>)}</div></details></section> : null}
      </article><aside className="detail-aside"><div className="aside-card"><span className="aside-label">项目概览</span><dl><div><dt>当前状态</dt><dd>{statusMeta[project.status].label}</dd></div><div><dt>适用对象</dt><dd>{project.audiences.join("、")}</dd></div><div><dt>项目分类</dt><dd>{category?.name}</dd></div>{project.updatedAt && <div><dt>资料更新</dt><dd>{project.updatedAt}</dd></div>}</dl><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="external-note"><InfoIcon size={18} /><p>“在线体验”和 GitHub 链接将在新标签页打开，并离开本站。</p></div></aside></div></section>
    </main>
  );
}
