"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({ title, subtitle, className }) {
  return (
    <div className={cn("flex flex-col items-center text-center mb-12", className)}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl md:text-5xl font-bold mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-muted-foreground max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
