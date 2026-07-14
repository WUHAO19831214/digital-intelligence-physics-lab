"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectStatus } from "@/src/data/projects";
import { categories, statusMeta } from "@/src/data/projects";
import ProjectCard from "./ProjectCard";
import { SearchIcon } from "./Icons";

const statusOptions: ProjectStatus[] = ["active", "beta", "prototype", "archived"];

export default function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [tag, setTag] = useState("all");
  const tags = useMemo(() => Array.from(new Set(projects.flatMap((project) => project.tags))).slice(0, 14), [projects]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("zh-CN");
    return projects.filter((project) => {
      const text = [project.title, project.englishTitle, project.summary, ...project.tags, ...project.audiences].join(" ").toLocaleLowerCase("zh-CN");
      return (!needle || text.includes(needle)) && (category === "all" || project.category === category) && (status === "all" || project.status === status) && (tag === "all" || project.tags.includes(tag));
    });
  }, [projects, query, category, status, tag]);

  const reset = () => { setQuery(""); setCategory("all"); setStatus("all"); setTag("all"); };

  return (
    <div className="explorer">
      <div className="filter-panel" aria-label="项目筛选">
        <label className="search-field"><span className="sr-only">搜索项目</span><SearchIcon /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索项目、主题或适用对象" /></label>
        <label><span>项目分类</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">全部分类</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        <label><span>项目状态</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">全部状态</option>{statusOptions.map((item) => <option key={item} value={item}>{statusMeta[item].label}</option>)}</select></label>
      </div>
      <div className="tag-filter" aria-label="按标签筛选"><button className={tag === "all" ? "active" : ""} onClick={() => setTag("all")}>全部主题</button>{tags.map((item) => <button key={item} className={tag === item ? "active" : ""} onClick={() => setTag(item)}>{item}</button>)}</div>
      <div className="results-bar"><p>找到 <strong>{filtered.length}</strong> 个项目家族</p>{(query || category !== "all" || status !== "all" || tag !== "all") && <button onClick={reset}>清除筛选</button>}</div>
      {filtered.length ? <div className="project-grid directory-grid">{filtered.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <div className="empty-state"><strong>没有找到匹配项目</strong><p>试试缩短关键词，或清除当前筛选条件。</p><button className="button button-secondary" onClick={reset}>重置筛选</button></div>}
    </div>
  );
}
