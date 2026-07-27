import rawProjects from "./projects.json";
import englishProjects from "./projects.en.json";
import japaneseProjects from "./projects.ja.json";
import type { Locale } from "@/src/i18n/siteCopy";

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

const categoriesByLocale = {
  zh: [
    { id: "digital-experiments", name: "数字化实验与测量", shortName: "实验测量", code: "A" },
    { id: "electromagnetism-3d", name: "电磁学与三维可视化", shortName: "电磁与三维", code: "B" },
    { id: "optics-mr", name: "光学、偏振与混合现实", shortName: "光学与 MR", code: "C" },
    { id: "teaching-tools", name: "教材、OCR 与教学研究工具", shortName: "教学工具", code: "D" },
    { id: "personal-tools", name: "语言学习与个人工具", shortName: "个人工具", code: "E" },
  ],
  en: [
    { id: "digital-experiments", name: "Digital Experiments & Measurement", shortName: "Experiments", code: "A" },
    { id: "electromagnetism-3d", name: "Electromagnetism & 3D Visualization", shortName: "EM & 3D", code: "B" },
    { id: "optics-mr", name: "Optics, Polarization & Mixed Reality", shortName: "Optics & MR", code: "C" },
    { id: "teaching-tools", name: "Textbooks, OCR & Teaching Research Tools", shortName: "Teaching Tools", code: "D" },
    { id: "personal-tools", name: "Language Learning & Personal Tools", shortName: "Personal Tools", code: "E" },
  ],
  ja: [
    { id: "digital-experiments", name: "デジタル実験と計測", shortName: "実験・計測", code: "A" },
    { id: "electromagnetism-3d", name: "電磁気学と3D可視化", shortName: "電磁気・3D", code: "B" },
    { id: "optics-mr", name: "光学・偏光・複合現実", shortName: "光学・MR", code: "C" },
    { id: "teaching-tools", name: "教材・OCR・教育研究ツール", shortName: "教育ツール", code: "D" },
    { id: "personal-tools", name: "語学学習・個人ツール", shortName: "個人ツール", code: "E" },
  ],
} as const;

const statusMetaByLocale: Record<Locale, Record<ProjectStatus, { label: string; description: string }>> = {
  zh: {
    active: { label: "正式使用", description: "已有可靠在线入口" },
    beta: { label: "研究测试", description: "可体验，仍在验证或补充能力" },
    prototype: { label: "教学原型", description: "用于验证思路与交互" },
    archived: { label: "历史版本", description: "仅用于版本追溯" },
    unknown: { label: "待确认", description: "对应关系或能力尚未完全确认" },
  },
  en: {
    active: { label: "Official", description: "A reliable online entry is available" },
    beta: { label: "Research beta", description: "Available to try while validation continues" },
    prototype: { label: "Teaching prototype", description: "Used to test ideas and interactions" },
    archived: { label: "Archived", description: "Retained only for version history" },
    unknown: { label: "To be confirmed", description: "The relationship or capability is not fully confirmed" },
  },
  ja: {
    active: { label: "正式版", description: "信頼できるオンライン版があります" },
    beta: { label: "研究テスト", description: "体験可能ですが検証・機能追加中です" },
    prototype: { label: "教育プロトタイプ", description: "アイデアと操作の検証用です" },
    archived: { label: "過去版", description: "バージョン履歴のために保存しています" },
    unknown: { label: "確認中", description: "関係や機能がまだ完全には確認されていません" },
  },
};

const projectsByLocale: Record<Locale, Project[]> = {
  zh: rawProjects as Project[],
  en: englishProjects as Project[],
  ja: japaneseProjects as Project[],
};

export function getProjects(locale: Locale = "zh") {
  return projectsByLocale[locale].slice().sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getCategories(locale: Locale = "zh") {
  return categoriesByLocale[locale];
}

export function getStatusMeta(locale: Locale = "zh") {
  return statusMetaByLocale[locale];
}

export const categories = getCategories();
export const statusMeta = getStatusMeta();
export const projects = getProjects();
export const featuredProjects = projects.filter((project) => project.featured && project.status !== "archived");

export function getFeaturedProjects(locale: Locale = "zh") {
  return getProjects(locale).filter((project) => project.featured && project.status !== "archived");
}

export function getProjectBySlug(slug: string, locale: Locale = "zh") {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getProjectById(id: string, locale: Locale = "zh") {
  return getProjects(locale).find((project) => project.id === id);
}

export function getCategory(categoryId: string, locale: Locale = "zh") {
  return getCategories(locale).find((category) => category.id === categoryId);
}
