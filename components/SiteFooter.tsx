import Link from "next/link";
import { GithubIcon } from "./Icons";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><strong>数智物理实验室</strong></div>
          <p>围绕物理实验数字化、证据推理与课堂教学改进开展的个人研究与实践平台。</p>
        </div>
        <nav aria-label="页脚导航">
          <Link href="/projects/">项目目录</Link>
          <Link href="/about/">关于本站</Link>
          <a href="https://github.com/WUHAO19831214" target="_blank" rel="noreferrer noopener"><GithubIcon size={16} /> GitHub</a>
        </nav>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} 数智物理实验室</span><span>以教育价值与实验价值为先</span></div>
    </footer>
  );
}
