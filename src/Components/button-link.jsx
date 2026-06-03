"use client";

import { Button } from "@/Components/ui/button";
import Link from "next/link";

export function ButtonLink({
  href,
  children,
  variant = "default",
  icon = false,
  className,
  newTab = false,
}) {
  const target = newTab ? "_blank" : undefined;
  const rel = newTab ? "noopener noreferrer" : undefined;

  return (
    <Button variant={variant} asChild className={className}>
      <Link href={href} target={target} rel={rel}>
        {children}
        {icon && <span className="ml-2">→</span>}
      </Link>
    </Button>
  );
}