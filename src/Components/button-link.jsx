"use client";

import { Button } from "@/Components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button variant={variant} asChild className={className}>
        <Link href={href} target={target} rel={rel}>
          {children}
          {icon && <ArrowRight className="ml-2 h-4 w-4" />}
        </Link>
      </Button>
    </motion.div>
  );
}
