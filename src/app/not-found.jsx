"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/Components/button-link";
import { FolderX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FolderX className="h-32 w-32 text-primary mx-auto mb-6" />
      </motion.div>
      
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        404 - Page Not Found
      </motion.h1>
      
      <motion.p
        className="text-2xl md:text-3xl text-muted-foreground max-w-md mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ButtonLink href="/" icon={true}>
          Return Home
        </ButtonLink>
      </motion.div>
    </div>
  );
}
