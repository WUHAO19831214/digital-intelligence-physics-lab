import type { Project } from "@/src/data/projects";
import { getCategory } from "@/src/data/projects";

export default function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const category = getCategory(project.category);
  return (
    <div className={`project-visual visual-${project.category}${compact ? " compact" : ""}`} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-orbit"><span /><span /><span /></div>
      <svg viewBox="0 0 400 190" preserveAspectRatio="none">
        <path className="visual-line secondary" d="M0 145 C70 142 92 78 154 82 S230 150 278 106 336 54 400 70" />
        <path className="visual-line" d="M0 124 C58 112 96 134 137 98 S205 34 246 76 318 134 400 36" />
        <circle cx="246" cy="76" r="5" className="visual-point" />
      </svg>
      <div className="visual-label"><span>{category?.code ?? "P"}</span><small>{project.tags.slice(0, 2).join(" · ")}</small></div>
    </div>
  );
}
