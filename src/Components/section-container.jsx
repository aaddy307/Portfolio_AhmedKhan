"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function SectionContainer({ id, children, className }) {
  return (
    <motion.section
      id={id}
      className={cn("py-16 md:py-20 relative", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="container mx-auto px-6 max-w-full">
        {children}
      </div>
    </motion.section>
  );
}