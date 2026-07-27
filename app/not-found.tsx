"use client";

import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { useLanguage } from "@/components/LanguageProvider";

export default function NotFound() {
  const { copy } = useLanguage();
  return <main className="not-found"><div><p className="section-kicker">404 / NOT FOUND</p><h1>{copy.notFound.title}</h1><p>{copy.notFound.text}</p><div><Link className="button button-primary" href="/">{copy.common.backHome} <ArrowRight /></Link><Link className="button button-secondary" href="/projects/">{copy.common.browseProjects}</Link></div></div></main>;
}
