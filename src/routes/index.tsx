import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { Verticals } from "@/components/home/Verticals";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { SketchPhilosophy } from "@/components/home/SketchPhilosophy";
import { Clients } from "@/components/home/Clients";
import { Recognition } from "@/components/home/Recognition";
import { HoverImageNav } from "@/components/home/HoverImageNav";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { useReveal } from "@/components/home/useReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Interarch Design Labs — Architecture & Interiors" },
      {
        name: "description",
        content:
          "Interarch Design Labs designs homes, workplaces, hospitality and institutional buildings with daylight, proportion and material intelligence.",
      },
      { property: "og:title", content: "Interarch Design Labs — Architecture & Interiors" },
      {
        property: "og:description",
        content: "Not just spaces. Stories, shaped with care, clarity, and the way you live.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <>
      <CustomCursor />
      <Header />
      <Hero />
      <Verticals />
      <FeaturedWorks />
      <SketchPhilosophy />
      <Clients />
      <Recognition />
      <HoverImageNav />
      <Footer />
    </>
  );
}
