"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export function RadialIntroMobile({ orbitItems }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [glowingIndex, setGlowingIndex] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const rotate = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, 360],
    { clamp: false }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowingIndex((prev) => (prev + 1) % orbitItems.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [orbitItems.length]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[280px] md:min-h-[400px] flex items-center justify-center">
      <motion.div 
        className="relative w-[220px] h-[220px] md:w-[340px] md:h-[340px] flex items-center justify-center"
        style={{ rotate }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        {/* Orbit items */}
        {orbitItems.map((item, index) => {
          const angle = (index / orbitItems.length) * 2 * Math.PI;
          const radius = 90;
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
              <motion.div 
                className="relative group"
                style={{ rotate: useTransform(rotate, (r) => -r) }}
              >
                {/* Item circle */}
                <div 
                  className={`relative w-11 h-11 md:w-16 md:h-16 rounded-full bg-background border-2 border-primary/30 group-hover:border-primary transition-all duration-300 overflow-hidden shadow-lg ${
                    glowingIndex === index ? 'icon-glow' : ''
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    className={`object-cover p-1.5 md:p-2 ${item.invert ? 'dark:invert' : ''}`}
                  />
                </div>

                {/* Tooltip */}
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-background border border-border rounded-md shadow-lg whitespace-nowrap z-30"
                  >
                    <span className="text-xs md:text-sm font-medium">{item.name}</span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
