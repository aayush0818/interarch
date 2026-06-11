import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { CustomCursor } from "@/components/home/CustomCursor";

export const Route = createFileRoute("/studio")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/studio" || location.pathname === "/studio/") {
      throw redirect({ to: "/studio/about" });
    }
  },
  component: StudioLayout,
});

function StudioLayout() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main className="idlx-page">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
