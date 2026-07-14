import rawProjects from "./projects.json";

export type ProjectStatus = "active" | "beta" | "prototype" | "archived" | "unknown";
export type ProjectVersionRole = "teacher" | "student" | "prototype" | "legacy" | "research" | "stable";

export type ProjectVersion = {
  name: string;
  role?: ProjectVersionRole;
  siteUrl?: string;
  githubUrl?: string;
  status: ProjectStatus;
  note?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  englishTitle?: string;
  category: string;
  summary: string;
  description?: string;
  background?: string;
  audiences: string[];
  tags: string[];
  status: ProjectStatus;
  featured: boolean;
  siteUrl?: string;
  githubUrl?: string;
  repositoryName?: string;
  netlifySiteName?: string;
  imageUrl?: string;
  imageAlt?: string;
  notice?: string;
  versions?: ProjectVersion[];
  capabilities?: string[];
  teachingValue?: string[];
  scenarios?: string[];
  technicalHighlights?: string[];
  roadmap?: string[];
  updatedAt?: string;
  order?: number;
};

export const categories = [
  { id: "digital-experiments", name: "数字化实验与测量", shortName: "实验测量", code: "A" },
  { id: "electromagnetism-3d", name: "电磁学与三维可视化", shortName: "电磁与三维", code: "B" },
  { id: "optics-mr", name: "光学、偏振与混合现实", shortName: "光学与 MR", code: "C" },
  { id: "teaching-tools", name: "教材、OCR 与教学研究工具", shortName: "教学工具", code: "D" },
  { id: "personal-tools", name: "语言学习与个人工具", shortName: "个人工具", code: "E" }
] as const;

export const statusMeta: Record<ProjectStatus, { label: string; description: string }> = {
  active: { label: "正式使用", description: "已有可靠在线入口" },
  beta: { label: "研究测试", description: "可体验，仍在验证或补充能力" },
  prototype: { label: "教学原型", description: "用于验证思路与交互" },
  archived: { label: "历史版本", description: "仅用于版本追溯" },
  unknown: { label: "待确认", description: "对应关系或能力尚未完全确认" }
};

export const projects = (rawProjects as Project[]).slice().sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
export const featuredProjects = projects.filter((project) => project.featured && project.status !== "archived");

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getCategory(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}
