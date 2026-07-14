import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export default function NotFound() { return <main className="not-found"><div><p className="section-kicker">404 / NOT FOUND</p><h1>这个页面暂时不在实验记录中</h1><p>链接可能已经调整，或对应项目尚未形成正式入口。</p><div><Link className="button button-primary" href="/">返回首页 <ArrowRight /></Link><Link className="button button-secondary" href="/projects/">浏览项目</Link></div></div></main>; }
