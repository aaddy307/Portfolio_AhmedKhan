"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getPersonalInfo, getSocialLinks } from "@/lib/config";
import { ButtonLink } from "@/Components/button-link";
import { Github, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/Components/icons/whatsapp-icon";
import { useState } from "react";

const skills = ['React', 'Next.js', 'Node.js', 'AI/ML', 'MongoDB', 'Figma', 'TypeScript', 'Tailwind'];
const gradientColors = [
  { x: 20, y: 30, color: 'bg-cyan-500/30', size: 300 },
  { x: 70, y: 60, color: 'bg-purple-500/25', size: 350 },
  { x: 50, y: 20, color: 'bg-blue-500/20', size: 280 },
  { x: 85, y: 40, color: 'bg-pink-500/20', size: 320 },
];

function FloatingOrb({ skill, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className="absolute"
      style={{
        left: `${Math.random() * 60 + 10}%`,
        top: `${Math.random() * 50 + 10}%`,
      }}
      whileHover={{ scale: 1.15 }}
    >
      <div className="relative">
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-md" />
        <div className="relative px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-sm">
          <span className="text-xs font-medium text-zinc-300">{skill}</span>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedVisual({ visible }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * size,
      y: Math.random() * size,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      color: ['#06b6d4', '#8b5cf6', '#ec4899', '#3b82f6'][Math.floor(Math.random() * 4)],
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > size) p.vx *= -1;
        if (p.y < 0 || p.y > size) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [visible]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.3, type: 'spring' }}
      className="relative w-full max-w-sm mx-auto"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent rounded-3xl blur-2xl" />

      {/* Main glass card */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl shadow-2xl">
        {/* Top gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

        {/* Particle canvas */}
        <div className="relative p-6 min-h-[400px] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-60"
            style={{ width: '100%', height: '100%' }}
          />

          {/* Center icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)] mb-4">
              <span className="text-3xl font-bold text-white font-mono">AK</span>
            </div>
            <p className="text-sm font-medium text-zinc-400">AI & DS Student</p>
            <p className="text-xs text-zinc-600 mt-1">Mumbai, India</p>
          </motion.div>

          {/* Floating skill orbs */}
          {skills.map((skill, i) => (
            <FloatingOrb key={skill} skill={skill} delay={0.5 + i * 0.12} />
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 border-t border-zinc-800/50">
          {[
            { label: 'Projects', value: '5+' },
            { label: 'Technologies', value: '10+' },
            { label: 'Achievements', value: '3+' },
          ].map(({ label, value }) => (
            <div key={label} className="p-4 text-center border-r border-zinc-800/50 last:border-r-0">
              <div className="text-xl font-bold text-cyan-400">{value}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const personalInfo = getPersonalInfo();
  const socials = getSocialLinks();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Greeting badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Available for opportunities
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none">
                <span className="text-zinc-300">Hi, I'm </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  {personalInfo.name}
                </span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-zinc-400 font-medium"
            >
              {personalInfo.title}
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-zinc-500 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
            >
              <ButtonLink
                href="/#projects"
                icon
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/#contact"
                variant="outline"
                className="w-full sm:w-auto border-zinc-700 hover:border-cyan-500 hover:bg-cyan-500/5 text-zinc-300 hover:text-cyan-400 px-6 py-3 rounded-xl text-sm transition-all duration-300"
              >
                Get In Touch
              </ButtonLink>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 justify-center lg:justify-start pt-2"
            >
              <span className="text-xs text-zinc-600 font-medium uppercase tracking-widest">Connect</span>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent max-w-[60px] hidden lg:block" />
              {socials.map((social) => {
                const iconMap = {
                  Github, Linkedin, Instagram, WhatsApp: WhatsAppIcon,
                };
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className={cn(
                      'w-10 h-10 flex items-center justify-center rounded-xl',
                      'border border-zinc-800 text-zinc-500',
                      'hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400',
                      'transition-all duration-300 hover:scale-110 active:scale-95'
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: Animated visual */}
          <div className="order-1 lg:order-2 flex justify-center">
            <AnimatedVisual visible={visible} />
          </div>
        </div>
      </div>
    </section>
  );
}