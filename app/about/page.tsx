import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = { title: "关于", description: "了解数智物理实验室的研究关注、项目组织原则与维护方式。" };

export default function AboutPage() {
  return <main><section className="page-hero about-hero"><div className="shell narrow"><p className="section-kicker">ABOUT THE LAB</p><h1>关于数智物理实验室</h1><p>这是一个面向教学实践的个人项目门户，用于整理持续生长的实验工具、课堂原型和研究版本。</p></div></section><section className="section"><div className="shell about-layout"><article><p className="intro-paragraph">项目发起者长期从事高中物理教学、区域教研以及人工智能赋能实验教学的实践研究，关注数字化实验、证据推理、空间模型建构、计算机视觉与本地人工智能工具在物理课堂中的应用。</p><h2>为什么建立这个门户</h2><p>过往项目分布在不同 GitHub 仓库与 Netlify 站点中。随着教师端、学生端、研究版和原型版逐渐增多，仅依靠部署名称已经难以准确表达项目关系。本站把它们整理为“项目家族”，同时保留清晰的状态和版本历程。</p><h2>组织原则</h2><div className="principle-grid"><div><span>01</span><h3>教育价值优先</h3><p>先说明解决的教学或实验问题，再介绍技术实现。</p></div><div><span>02</span><h3>状态真实可辨</h3><p>正式使用、研究测试、教学原型与历史版本分别标注。</p></div><div><span>03</span><h3>安全与可维护</h3><p>门户采用静态数据，不在浏览器中暴露私人访问凭据。</p></div><div><span>04</span><h3>保留研究过程</h3><p>旧版本不占据首页，但作为项目演化证据保留在详情中。</p></div></div><h2>研究关注</h2><p>当前项目主要围绕实验数据数字化、二维证据与三维模型的联结、计算机视觉辅助测量、本地 AI 教学工具，以及教师真实工作流的轻量改进展开。</p><Link className="button button-primary" href="/projects/">浏览项目目录 <ArrowRight /></Link></article><aside><div className="quote-card"><span>“</span><p>让技术进入课堂之前，先回答它帮助学生看见了什么证据、建立了什么模型。</p></div><div className="aside-card"><span className="aside-label">本站定位</span><ul><li>个人研究与实践档案</li><li>物理教学项目导航</li><li>版本关系与状态说明</li><li>后续项目的统一入口</li></ul></div></aside></div></section></main>;
}
