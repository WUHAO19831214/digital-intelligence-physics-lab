"use client";

import Link from "next/link";
import { GithubIcon, MenuIcon } from "./Icons";
import { LanguageSwitcher, useLanguage } from "./LanguageProvider";

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const { copy } = useLanguage();
  const navItems = [
    { href: "/", label: copy.nav.home },
    { href: "/projects/", label: copy.nav.projects },
    { href: "/#categories", label: copy.nav.categories },
    { href: "/#themes", label: copy.nav.themes },
    { href: "/about/", label: copy.nav.about },
  ];
  return (
    <nav className={mobile ? "mobile-nav" : "desktop-nav"} aria-label={mobile ? copy.nav.mobile : copy.nav.main}>
      {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      <a className="nav-github" href="https://github.com/WUHAO19831214" target="_blank" rel="noreferrer noopener">
        <GithubIcon size={17} /> GitHub <span className="sr-only">{copy.common.newTab}</span>
      </a>
    </nav>
  );
}

export default function SiteHeader() {
  const { copy } = useLanguage();
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link className="brand" href="/" aria-label={`${copy.common.brand} · ${copy.nav.home}`}>
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span><strong>{copy.common.brand}</strong><small>{copy.common.brandEnglish}</small></span>
        </Link>
        <div className="header-actions">
          <NavLinks />
          <LanguageSwitcher />
          <div className="mobile-controls">
            <LanguageSwitcher compact />
            <details className="mobile-menu">
              <summary aria-label={copy.common.openMenu}><MenuIcon /><span>{copy.common.menu}</span></summary>
              <div className="mobile-menu-panel"><NavLinks mobile /></div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
