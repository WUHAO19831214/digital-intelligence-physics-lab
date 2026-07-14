import Link from "next/link";
import { GithubIcon, MenuIcon } from "./Icons";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/projects/", label: "项目" },
  { href: "/#categories", label: "项目分类" },
  { href: "/#themes", label: "研究主题" },
  { href: "/about/", label: "关于" },
];

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav className={mobile ? "mobile-nav" : "desktop-nav"} aria-label={mobile ? "移动端主导航" : "主导航"}>
      {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      <a className="nav-github" href="https://github.com/WUHAO19831214" target="_blank" rel="noreferrer noopener">
        <GithubIcon size={17} /> GitHub <span className="sr-only">（在新标签页打开）</span>
      </a>
    </nav>
  );
}

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link className="brand" href="/" aria-label="数智物理实验室首页">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span><strong>数智物理实验室</strong><small>DIGITAL INTELLIGENCE PHYSICS LAB</small></span>
        </Link>
        <NavLinks />
        <details className="mobile-menu">
          <summary aria-label="打开导航菜单"><MenuIcon /><span>菜单</span></summary>
          <div className="mobile-menu-panel"><NavLinks mobile /></div>
        </details>
      </div>
    </header>
  );
}
