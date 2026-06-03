"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPersonalInfo, getSocialLinks } from "@/lib/config";
import { ButtonLink } from "@/Components/button-link";
import { ArrowRight, MapPin } from "lucide-react";
import { Github, Linkedin, Instagram } from "lucide-react";
import { WhatsAppIcon } from "@/Components/icons/whatsapp-icon";
import { cn } from "@/lib/utils";

const tools = ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "Figma", "AI/ML"];

function AbstractVisual() {
  return (
    <div className="relative w-full max-w-md">
      {/* Main gradient orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-72 h-72 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle at 30% 40%, #06b6d4 0%, #8b5cf6 50%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Glass card — role & tools */}
      <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-transparent" />

        {/* Role tag */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Current Focus</span>
        </div>

        {/* Stack list */}
        <div className="space-y-2.5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <span className="w-1 h-1 rounded-full bg-cyan-400/60 shrink-0" />
              <span className="text-sm text-zinc-400">{tool}</span>
            </motion.div>
          ))}
        </div>

        {/* Separator */}
        <div className="h-px bg-white/5 my-5" />

        {/* Status row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <MapPin className="h-3 w-3 text-zinc-600" />
            <span>Mumbai, India</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
            <span>Open to work</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative lines */}
      <svg
        className="absolute -top-8 -right-8 w-32 h-32 text-white/5"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="30" />
        <circle cx="50" cy="50" r="15" />
        <line x1="0" y1="50" x2="100" y2="50" />
        <line x1="50" y1="0" x2="50" y2="100" />
      </svg>
    </div>
  );
}

export function HeroSection() {
  const personalInfo = getPersonalInfo();
  const socials = getSocialLinks();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* ── Background ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black" />
        {/* Subtle top highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/[0.03] to-transparent" />
        {/* Left accent */}
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-cyan-500/[0.04] rounded-full blur-[100px]" />
        {/* Right accent */}
        <div className="absolute bottom-1/3 right-0 w-[250px] h-[250px] bg-purple-500/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-6xl mx-auto">

          {/* ── Left: Content ─────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="space-y-6"
          >
            {/* Location tag */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-500 font-medium">
                <MapPin className="h-3 w-3 text-cyan-400/70" />
                Mumbai, India
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.1] tracking-tight">
                <span className="text-zinc-200">Ahmed Khan</span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-cyan-400/80 font-medium"
            >
              {personalInfo.title}
            </motion.p>

            {/* Divider */}
            <motion.div variants={itemVariants}>
              <div className="w-12 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-zinc-500 leading-relaxed max-w-md text-sm sm:text-base"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start gap-3 pt-2"
            >
              <ButtonLink
                href="/#projects"
                icon
                className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/#contact"
                variant="outline"
                className="border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20 px-6 py-3 rounded-lg text-sm transition-colors duration-200"
              >
                Get In Touch
              </ButtonLink>
            </motion.div>

            {/* Social */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-2"
            >
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
                      "w-9 h-9 flex items-center justify-center rounded-lg",
                      "border border-white/10 text-zinc-600",
                      "hover:border-cyan-400/30 hover:text-cyan-400",
                      "transition-colors duration-200"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Right: Abstract visual ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:flex justify-center lg:justify-end"
          >
            <AbstractVisual />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-700 to-transparent" />
      </motion.div>
    </section>
  );
}