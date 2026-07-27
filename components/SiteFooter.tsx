"use client";

import Link from "next/link";
import { GithubIcon } from "./Icons";
import { useLanguage } from "./LanguageProvider";

export default function SiteFooter() {
  const { copy } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><strong>{copy.common.brand}</strong></div>
          <p>{copy.footer.description}</p>
        </div>
        <nav aria-label={copy.footer.navLabel}>
          <Link href="/projects/">{copy.footer.directory}</Link>
          <Link href="/about/">{copy.footer.about}</Link>
          <a href="https://github.com/WUHAO19831214" target="_blank" rel="noreferrer noopener"><GithubIcon size={16} /> GitHub<span className="sr-only">{copy.common.newTab}</span></a>
        </nav>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} {copy.common.brand}</span><span>{copy.footer.principle}</span></div>
    </footer>
  );
}
