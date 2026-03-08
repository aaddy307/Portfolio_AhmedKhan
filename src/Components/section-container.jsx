"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function SectionContainer({ id, children, className }) {
  return (
    <motion.section
      id={id}
      className={cn("py-16 md:py-24 overflow-x-hidden", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4 max-w-full">
        {children}
      </div>
    </motion.section>
  );
}
