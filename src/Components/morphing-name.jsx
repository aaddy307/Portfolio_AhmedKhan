"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function MorphingName({ startAnimation }) {
  const names = [
    { text: "Ahmed Khan", lang: "en" },
    { text: "अहमद खान", lang: "hi" },
    { text: "احمد خان", lang: "ur" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!startAnimation) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % names.length);
        setTimeout(() => setIsTransitioning(false), 400);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, [startAnimation]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '1.5em', padding: '0.2em 0' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0,
            x: -100,
            filter: "blur(8px)"
          }}
          animate={{ 
            opacity: 1,
            x: 0,
            filter: "blur(0px)"
          }}
          exit={{ 
            opacity: 0,
            x: 100,
            filter: "blur(8px)"
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="absolute left-0 top-0 w-full h-full flex items-center"
          style={{ 
            direction: names[currentIndex].lang === "ur" ? "rtl" : "ltr",
            justifyContent: names[currentIndex].lang === "ur" ? "flex-end" : "flex-start"
          }}
        >
          <motion.span 
            className="text-blue-500 font-bold whitespace-nowrap inline-block relative text-4xl md:text-6xl"
            style={{
              textShadow: isTransitioning 
                ? "0 0 10px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.2)"
                : "0 0 5px rgba(59, 130, 246, 0.3)",
              transition: "text-shadow 0.4s ease-in-out",
              filter: isTransitioning ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))' : 'none',
              maxWidth: '100%'
            }}
          >
            {names[currentIndex].text}
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
