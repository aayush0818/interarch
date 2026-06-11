import { Outlet, Link, createFileRoute, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";
import { realImages } from "@/data/realImages";

const work1 = realImages.institutional.aerial;
const work4 = realImages.residential.warm;
const studioCulture = realImages.commercial.corridor;

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice — Interarch Design Labs" },
      { name: "description", content: "How the studio thinks, draws, and builds — history, process and journal." },
      { property: "og:title", content: "Practice — IDL" },
      { property: "og:description", content: "Three readings of the practice." },
    ],
  }),
  component: PracticePage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

const doors = [
  { to: "/practice/history" as const, num: "01", name: "History", body: "From Interarch (1989) to Interarch Design Labs — a chronological reading.", img: work1 },
  { to: "/practice/process" as const, num: "02", name: "Process", body: "Five phases, one trajectory — from listening to evolution.", img: work4 },
  { to: "/practice/journal" as const, num: "03", name: "Journal", body: "Essays and notes on architecture, light and material.", img: studioCulture },
];

function PracticePage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/practice") return <Outlet />;

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <div className="idlx-doors">
          {doors.map((d, i) => (
            <motion.div
              key={d.num}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.18, ease: EASE }}
              style={{ position: "relative" }}
            >
              <Link to={d.to} className="idlx-door" data-hover style={{ display: "block", height: "100%" }}>
                <img src={d.img} alt={d.name} />
                <div className="idlx-door-cap">
                  <span className="idlx-door-num">— {d.num} / Practice</span>
                  <span className="idlx-door-name">{d.name}</span>
                  <p className="idlx-door-body">{d.body}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
