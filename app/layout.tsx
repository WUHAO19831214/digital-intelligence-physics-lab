import type { Metadata, Viewport } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import LanguageProvider, { LocalizedSkipLink } from "@/components/LanguageProvider";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digital-intelligence-physics-lab.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "数智物理实验室｜AI 赋能物理实验与教学创新", template: "%s｜数智物理实验室" },
  description: "汇集物理实验数字化、计算机视觉、人工智能、三维可视化与课堂教学改进项目的个人研究与实践平台。",
  applicationName: "数智物理实验室",
  keywords: ["物理实验", "人工智能", "计算机视觉", "三维可视化", "物理教学", "数字化实验"],
  authors: [{ name: "Wu Hao", url: "https://github.com/WUHAO19831214" }],
  creator: "Wu Hao",
  icons: { icon: "/og.png", apple: "/og.png" },
  openGraph: { type: "website", locale: "zh_CN", url: baseUrl, siteName: "数智物理实验室", title: "数智物理实验室｜AI 赋能物理实验与教学创新", description: "汇集物理实验数字化、计算机视觉、人工智能、三维可视化与课堂教学改进项目的个人研究与实践平台。", images: [{ url: "/og.png", width: 1730, height: 909, alt: "数智物理实验室" }] },
  twitter: { card: "summary_large_image", title: "数智物理实验室", description: "AI 赋能物理实验、教学研究与学习工具的实践平台", images: ["/og.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#102a43", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <LocalizedSkipLink />
          <SiteHeader />
          <div id="main-content">{children}</div>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
