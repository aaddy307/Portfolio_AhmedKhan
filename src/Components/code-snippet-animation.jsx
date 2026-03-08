"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function CodeSnippetAnimation() {
  const canvasRef = useRef(null);
  const [commands, setCommands] = useState([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);

  const terminalCommands = [
    { command: "$ whoami", output: "Ahmed Khan - Full Stack Developer", delay: 0 },
    { command: "$ ls skills/", output: "React.js  Node.js  Next.js  AI/ML  MongoDB", delay: 2000 },
    { command: "$ cat passion.txt", output: "Building innovative web solutions ✨", delay: 4000 },
    { command: "$ git status", output: "Ready to collaborate on exciting projects 🚀", delay: 6000 },
  ];

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 350;
    canvas.height = 200;

    const chars = "01アイウエオカキクケコサシスセソタチツテト";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    let animationId;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#3B82F6"; // Blue 500
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  // Terminal commands animation
  useEffect(() => {
    const timers = [];
    
    terminalCommands.forEach((cmd, index) => {
      const timer = setTimeout(() => {
        setCommands((prev) => {
          // Check if command already exists to prevent duplicates
          const exists = prev.some(c => c.command === cmd.command);
          if (exists) return prev;
          return [...prev, cmd];
        });
        setCurrentCommandIndex(index);
      }, cmd.delay);
      
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="hidden lg:block absolute right-12 xl:right-[calc((100vw-1280px)/2+3rem)] top-1/2 -translate-y-1/2 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative"
      >
          {/* Matrix Background */}
          <div className="absolute inset-0 rounded-xl overflow-hidden opacity-20">
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
          </div>

          {/* Terminal Window */}
          <div className="relative w-[350px] rounded-xl overflow-hidden shadow-2xl border border-blue-500/30 bg-black/90 backdrop-blur-sm">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-b border-blue-500/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-blue-400 font-mono">terminal@portfolio</span>
            </div>

            {/* Terminal Content */}
            <div className="p-4 font-mono text-sm space-y-3 min-h-[280px] max-h-[280px] overflow-hidden">
              {commands.map((cmd, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">➜</span>
                    <span className="text-cyan-400">{cmd.command}</span>
                    {index === currentCommandIndex && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-blue-400"
                      ></motion.span>
                    )}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-300 pl-4"
                  >
                    {cmd.output}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

        {/* Glowing edges */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl -z-10"></div>
      </motion.div>
    </div>
  );
}
