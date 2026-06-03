"use client";

import { usePathname } from "next/navigation";
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
      <Navbar />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
      <Toaster />
    </>
  );
}