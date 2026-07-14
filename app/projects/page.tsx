import type { Metadata } from "next";
import ProjectExplorer from "@/components/ProjectExplorer";
import { projects } from "@/src/data/projects";

export const metadata: Metadata = { title: "项目目录", description: "浏览数智物理实验室的全部项目家族，并按分类、状态与标签筛选。" };

export default function ProjectsPage() {
  return <main><section className="page-hero"><div className="shell narrow"><p className="section-kicker">PROJECT DIRECTORY</p><h1>项目目录</h1><p>每张卡片代表一个项目家族。正式入口、研究版本与历史原型分层呈现，避免把重复部署误作不同项目。</p></div></section><section className="section directory-section"><div className="shell"><ProjectExplorer projects={projects} /></div></section></main>;
}
