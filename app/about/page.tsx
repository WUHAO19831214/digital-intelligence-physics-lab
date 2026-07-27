import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = { title: "关于", description: "了解数智物理实验室的研究关注、项目组织原则与维护方式。" };

export default function AboutPage() {
  return <AboutContent />;
}
