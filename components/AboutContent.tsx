"use client";

import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { useLanguage } from "./LanguageProvider";

export default function AboutContent() {
  const { copy } = useLanguage();
  return (
    <main>
      <section className="page-hero about-hero">
        <div className="shell narrow">
          <p className="section-kicker">{copy.common.kickers.about}</p>
          <h1>{copy.about.title}</h1>
          <p>{copy.about.heroText}</p>
        </div>
      </section>
      <section className="section">
        <div className="shell about-layout">
          <article>
            <p className="intro-paragraph">{copy.about.intro}</p>
            <h2>{copy.about.whyTitle}</h2>
            <p>{copy.about.whyText}</p>
            <h2>{copy.about.principlesTitle}</h2>
            <div className="principle-grid">
              {copy.about.principles.map((principle) => (
                <div key={principle.number}>
                  <span>{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              ))}
            </div>
            <h2>{copy.about.focusTitle}</h2>
            <p>{copy.about.focusText}</p>
            <Link className="button button-primary" href="/projects/">{copy.about.browse} <ArrowRight /></Link>
          </article>
          <aside>
            <div className="quote-card"><span>“</span><p>{copy.about.quote}</p></div>
            <div className="aside-card">
              <span className="aside-label">{copy.about.positioning}</span>
              <ul>{copy.about.positioningItems.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
