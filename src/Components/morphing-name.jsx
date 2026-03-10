"use client";

import { motion } from "framer-motion";

export function MorphingName({ startAnimation }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '1.5em', padding: '0.2em 0' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute left-0 top-0 w-full h-full flex items-center"
      >
        <span 
          className="text-blue-500 font-bold whitespace-nowrap inline-block relative text-4xl md:text-6xl"
          style={{
            textShadow: "0 0 5px rgba(59, 130, 246, 0.3)",
            maxWidth: '100%'
          }}
        >
          Ahmed Khan
        </span>
      </motion.div>
    </div>
  );
}
