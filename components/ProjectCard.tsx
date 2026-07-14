import Link from "next/link";
import type { Project } from "@/src/data/projects";
import { getCategory, statusMeta } from "@/src/data/projects";
import { ArrowRight, ArrowUpRight, GithubIcon } from "./Icons";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const category = getCategory(project.category);
  return (
    <article className={`project-card${featured ? " featured-card" : ""}`}>
      <ProjectVisual project={project} compact={!featured} />
      <div className="project-card-body">
        <div className="card-meta">
          <span className={`status-pill status-${project.status}`}><i />{statusMeta[project.status].label}</span>
          <span>{category?.shortName}</span>
        </div>
        <h3>{project.shortTitle ?? project.title}</h3>
        {project.englishTitle && <p className="english-title">{project.englishTitle}</p>}
        <p className="card-summary">{project.summary}</p>
        <p className="audience-line"><span>适用</span>{project.audiences.slice(0, 2).join(" · ")}</p>
        <div className="tag-row" aria-label="项目标签">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="card-actions">
          {project.siteUrl ? (
            <a className="button button-primary button-small" href={project.siteUrl} target="_blank" rel="noreferrer noopener">
              打开项目 <ArrowUpRight size={16} /><span className="sr-only">（在新标签页打开）</span>
            </a>
          ) : <span className="unavailable-label">暂无正式在线入口</span>}
          <Link className="text-link" href={`/projects/${project.slug}/`}>查看详情 <ArrowRight size={16} /></Link>
          {project.githubUrl && <a className="icon-link" href={project.githubUrl} target="_blank" rel="noreferrer noopener" aria-label={`${project.title} GitHub 仓库（在新标签页打开）`}><GithubIcon size={18} /></a>}
        </div>
      </div>
    </article>
  );
}
