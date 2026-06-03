"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({ title, subtitle, className }) {
  return (
    <motion.div
      className={cn("text-center mb-12", className)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-200 mb-3 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}