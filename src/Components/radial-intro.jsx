"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export function RadialIntro({ orbitItems }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [glowingIndex, setGlowingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowingIndex((prev) => (prev + 1) % orbitItems.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [orbitItems.length]);

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Orbit items */}
      {orbitItems.map((item, index) => {
        const angle = (index / orbitItems.length) * 2 * Math.PI;
        const radius = 150;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.2, zIndex: 20 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="absolute"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative group">
              {/* Item circle */}
              <div 
                className={`relative w-16 h-16 rounded-full bg-background border-2 border-primary/30 group-hover:border-primary transition-all duration-300 overflow-hidden shadow-lg ${
                  glowingIndex === index ? 'icon-glow' : ''
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  className={`object-cover p-2 ${item.invert ? 'invert brightness-0 dark:invert dark:brightness-200' : ''}`}
                />
              </div>

              {/* Tooltip */}
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-background border border-border rounded-md shadow-lg whitespace-nowrap z-30"
                >
                  <span className="text-sm font-medium">{item.name}</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
