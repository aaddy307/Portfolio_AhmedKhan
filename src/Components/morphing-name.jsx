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
    <div className="relative inline-flex items-center justify-center w-full" style={{ maxWidth: '100%', height: '1.5em', padding: '0.2em 0' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0,
            filter: "blur(12px)",
            scale: 0.85,
            y: 30
          }}
          animate={{ 
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            y: 0
          }}
          exit={{ 
            opacity: 0,
            filter: "blur(12px)",
            scale: 1.15,
            y: -30
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="absolute left-0 top-0 w-full h-full flex items-center justify-start px-2"
          style={{ 
            direction: names[currentIndex].lang === "ur" ? "rtl" : "ltr"
          }}
        >
          <motion.span 
            className="text-blue-500 font-bold whitespace-nowrap inline-block relative text-4xl md:text-6xl"
            initial={{ 
              opacity: 0,
              y: 25,
              rotateX: -90,
              scale: 0.8
            }}
            animate={{ 
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0,
              y: -25,
              rotateX: 90,
              scale: 0.8
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{
              textShadow: isTransitioning 
                ? "0 0 10px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.2)"
                : "0 0 5px rgba(59, 130, 246, 0.3)",
              transition: "text-shadow 0.4s ease-in-out",
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
              perspective: '1000px',
              filter: isTransitioning ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))' : 'none'
            }}
          >
            {names[currentIndex].text}
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
