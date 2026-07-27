import type { Metadata } from "next";
import ProjectsContent from "@/components/ProjectsContent";

export const metadata: Metadata = { title: "项目目录", description: "浏览数智物理实验室的全部项目家族，并按分类、状态与标签筛选。" };

export default function ProjectsPage() {
  return <ProjectsContent />;
}
