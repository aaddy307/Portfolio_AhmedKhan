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
    <div className="relative inline-block" style={{ minWidth: '320px', minHeight: '1.3em' }}>
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
          className="absolute left-0 top-0 w-full"
          style={{ 
            direction: names[currentIndex].lang === "ur" ? "rtl" : "ltr"
          }}
        >
          <motion.span 
            className="text-blue-500 font-bold whitespace-nowrap inline-block relative"
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
                ? "0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4), 0 0 90px rgba(59, 130, 246, 0.2)"
                : "0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.15)",
              transition: "text-shadow 0.4s ease-in-out",
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
              perspective: '1000px'
            }}
          >
            {names[currentIndex].text}
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
