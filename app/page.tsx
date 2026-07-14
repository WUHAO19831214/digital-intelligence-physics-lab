import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { ArrowRight, ArrowUpRight, CheckIcon } from "@/components/Icons";
import { categories, featuredProjects, projects } from "@/src/data/projects";

const themes = [
  { number: "01", title: "实验数据数字化", text: "把屏幕读数、视频轨迹与音频特征转化为可追溯的实验证据。" },
  { number: "02", title: "空间模型建构", text: "用三维矢量、光路和场景模型连接二维观察与物理规律。" },
  { number: "03", title: "计算机视觉", text: "在明确误差边界的前提下，探索 OCR、目标追踪与图像标注。" },
  { number: "04", title: "本地 AI 与教学工具", text: "关注隐私、安全和可维护性，让智能工具服务真实教学流程。" },
];

export default function HomePage() {
  const formalCount = projects.filter((project) => project.siteUrl).length;
  return (
    <main>
      <section className="hero">
        <div className="hero-field" aria-hidden="true"><div className="axis axis-x" /><div className="axis axis-y" /><div className="hero-vector"><i /><span>F</span></div><svg viewBox="0 0 640 220"><path d="M0 160 C80 160 85 60 160 60 S240 160 320 160 405 60 480 60 560 160 640 160" /></svg></div>
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span>PERSONAL RESEARCH PORTAL</span><i /> 面向物理教学的数智实践</p>
            <h1>数智物理实验室</h1>
            <p className="hero-english">Digital Intelligence Physics Lab</p>
            <h2>AI 赋能物理实验、教学研究<br className="desktop-break" />与学习工具的实践平台</h2>
            <p className="hero-lead">这里汇集了围绕物理实验数字化、计算机视觉、人工智能、三维可视化和课堂教学改进开展的一系列实践项目。</p>
            <div className="hero-actions"><Link className="button button-primary" href="/projects/">浏览项目 <ArrowRight /></Link><a className="button button-secondary" href="#featured">查看重点项目</a></div>
            <div className="hero-notes"><span><CheckIcon size={16} />正式入口经过核验</span><span><CheckIcon size={16} />版本关系清晰组织</span><span><CheckIcon size={16} />项目数据集中维护</span></div>
          </div>
          <aside className="lab-index" aria-label="项目概览">
            <div className="lab-index-top"><span>LAB INDEX</span><span>2026 / 07</span></div>
            <div className="measurement-panel"><svg viewBox="0 0 360 130"><path className="measure-grid" d="M0 26h360M0 65h360M0 104h360M60 0v130M120 0v130M180 0v130M240 0v130M300 0v130" /><path className="measure-curve" d="M0 96 C52 98 62 30 112 42 S184 116 224 72 280 28 360 48" /><circle cx="224" cy="72" r="5" /></svg><div><span>Δx / cm</span><span>f / Hz</span></div></div>
            <dl><div><dt>{projects.length.toString().padStart(2, "0")}</dt><dd>项目家族</dd></div><div><dt>{formalCount.toString().padStart(2, "0")}</dt><dd>可靠在线入口</dd></div><div><dt>{categories.length.toString().padStart(2, "0")}</dt><dd>研究分类</dd></div></dl>
            <p><i /> 持续整理与更新</p>
          </aside>
        </div>
      </section>

      <section className="section featured-section" id="featured">
        <div className="shell">
          <div className="section-heading"><div><p className="section-kicker">SELECTED WORK</p><h2>重点项目</h2><p>从教学价值、在线可用性与代表性出发，选取当前值得优先了解的项目。</p></div><Link className="text-link large" href="/projects/">查看全部项目 <ArrowRight /></Link></div>
          <div className="project-grid featured-grid">{featuredProjects.map((project) => <ProjectCard key={project.id} project={project} featured />)}</div>
        </div>
      </section>

      <section className="section category-section" id="categories">
        <div className="shell">
          <div className="section-heading"><div><p className="section-kicker">PROJECT MAP</p><h2>按项目性质浏览</h2><p>分类使用教师与学生更容易理解的语言，技术只是服务教学与实验的方法。</p></div></div>
          <div className="category-grid">{categories.map((category) => { const count = projects.filter((project) => project.category === category.id).length; return <Link href="/projects/" className="category-card" key={category.id}><span className="category-code">{category.code}</span><div><h3>{category.name}</h3><p>{count} 个项目家族 · 进入目录筛选</p></div><ArrowUpRight /></Link>; })}</div>
        </div>
      </section>

      <section className="section themes-section" id="themes">
        <div className="shell themes-layout"><div className="themes-intro"><p className="section-kicker">RESEARCH THEMES</p><h2>从真实课堂问题出发</h2><p>项目并非技术演示的集合，而是对实验数据、空间认知、证据推理和教学工作流的持续回应。</p><Link className="button button-light" href="/about/">了解研究方向 <ArrowRight /></Link></div><div className="theme-list">{themes.map((theme) => <article key={theme.number}><span>{theme.number}</span><div><h3>{theme.title}</h3><p>{theme.text}</p></div></article>)}</div></div>
      </section>

      <section className="section portal-note"><div className="shell"><div className="note-card"><div><p className="section-kicker">OPEN & EVOLVING</p><h2>一个持续生长的个人项目档案</h2><p>正式版本、研究测试与历史原型在这里各就其位。每个项目都保留清晰的状态、版本关系和外部入口。</p></div><Link className="button button-primary" href="/projects/">进入项目目录 <ArrowRight /></Link></div></div></section>
    </main>
  );
}
