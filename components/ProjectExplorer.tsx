"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectStatus } from "@/src/data/projects";
import { getCategories, getProjectById, getStatusMeta } from "@/src/data/projects";
import ProjectCard from "./ProjectCard";
import { SearchIcon } from "./Icons";
import { useLanguage } from "./LanguageProvider";

const statusOptions: ProjectStatus[] = ["active", "beta", "prototype", "archived"];

export default function ProjectExplorer({ projects }: { projects: Project[] }) {
  const { locale, copy } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [tag, setTag] = useState("all");
  const localizedProjects = useMemo(() => projects.map((project) => getProjectById(project.id, locale) ?? project), [projects, locale]);
  const categories = getCategories(locale);
  const statusMeta = getStatusMeta(locale);
  const tags = useMemo(() => Array.from(new Set(localizedProjects.flatMap((project) => project.tags))).slice(0, 14), [localizedProjects]);
  const activeTag = tags.includes(tag) ? tag : "all";
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale === "zh" ? "zh-CN" : locale);
    return localizedProjects.filter((project) => {
      const text = [project.title, project.englishTitle, project.summary, ...project.tags, ...project.audiences].join(" ").toLocaleLowerCase(locale === "zh" ? "zh-CN" : locale);
      return (!needle || text.includes(needle)) && (category === "all" || project.category === category) && (status === "all" || project.status === status) && (activeTag === "all" || project.tags.includes(activeTag));
    });
  }, [localizedProjects, query, category, status, activeTag, locale]);

  const reset = () => { setQuery(""); setCategory("all"); setStatus("all"); setTag("all"); };

  return (
    <div className="explorer">
      <div className="filter-panel" aria-label={copy.projects.filterLabel}>
        <label className="search-field"><span className="sr-only">{copy.projects.search}</span><SearchIcon /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.projects.searchPlaceholder} /></label>
        <label><span>{copy.projects.category}</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">{copy.projects.allCategories}</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        <label><span>{copy.projects.status}</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">{copy.projects.allStatuses}</option>{statusOptions.map((item) => <option key={item} value={item}>{statusMeta[item].label}</option>)}</select></label>
      </div>
      <div className="tag-filter" aria-label={copy.projects.tagFilter}><button className={activeTag === "all" ? "active" : ""} onClick={() => setTag("all")}>{copy.projects.allTopics}</button>{tags.map((item) => <button key={item} className={activeTag === item ? "active" : ""} onClick={() => setTag(item)}>{item}</button>)}</div>
      <div className="results-bar"><p>{copy.projects.results(filtered.length)}</p>{(query || category !== "all" || status !== "all" || activeTag !== "all") && <button onClick={reset}>{copy.projects.clear}</button>}</div>
      {filtered.length ? <div className="project-grid directory-grid">{filtered.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <div className="empty-state"><strong>{copy.projects.emptyTitle}</strong><p>{copy.projects.emptyText}</p><button className="button button-secondary" onClick={reset}>{copy.projects.reset}</button></div>}
    </div>
  );
}
