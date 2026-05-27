"use client";

import { usePathname } from "next/navigation";
import { ParticlesBackground } from "@/Components/particles-background";
import { Navbar } from "@/Components/navbar";
import { Footer } from "@/Components/footer";
import { Toaster } from "@/Components/ui/toaster";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <main id="main-content" className="min-h-screen overflow-x-hidden">{children}</main>
      <Footer />
      <Toaster />
    </>
  );
}
