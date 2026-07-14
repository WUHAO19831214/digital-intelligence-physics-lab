import type { MetadataRoute } from "next";
import { projects } from "@/src/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digital-intelligence-physics-lab.netlify.app"; return [{ url: `${base}/`, priority: 1 }, { url: `${base}/projects/`, priority: 0.9 }, { url: `${base}/about/`, priority: 0.6 }, ...projects.map((project) => ({ url: `${base}/projects/${project.slug}/`, lastModified: project.updatedAt ? new Date(project.updatedAt) : undefined, priority: project.featured ? 0.8 : 0.6 }))]; }
