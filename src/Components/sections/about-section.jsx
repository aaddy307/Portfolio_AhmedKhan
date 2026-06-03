"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { getSkills } from "@/lib/config";
import { Progress } from "@/Components/ui/progress";
import { Badge } from "@/Components/ui/badge";
import { MapPin, GraduationCap, Sparkles } from "lucide-react";
import Image from "next/image";

const skillIcons = {
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  html5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  express: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  vscode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  wordpress: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  ai: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
};

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true, margin: "-50px" }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          {skill.icon && skillIcons[skill.icon] && (
            <div className="w-5 h-5 flex-shrink-0 relative">
              <Image
                src={skillIcons[skill.icon]}
                alt={`${skill.name} icon`}
                width={20}
                height={20}
                className={`object-contain ${skill.icon === "express" || skill.icon === "github" ? "invert brightness-0 contrast-200" : ""}`}
              />
            </div>
          )}
          <span className="text-sm text-zinc-300">{skill.name}</span>
        </div>
        <span className="text-xs text-zinc-600">{skill.level}%</span>
      </div>
      <Progress value={skill.level} className="h-1" />
    </motion.div>
  );
}

export function AboutSection() {
  const skills = getSkills();
  const frontendSkills = skills.filter((s) => s.category === "frontend");
  const backendSkills = skills.filter((s) => s.category === "backend");
  const toolsSkills = skills.filter((s) => s.category === "tools");
  const otherSkills = skills.filter(
    (s) => !["frontend", "backend", "tools"].includes(s.category)
  );

  return (
    <SectionContainer id="about">
      <SectionHeading
        title="About Me"
        subtitle="Full-stack web developer with a focus on modern technologies and clean user experiences."
      />

      <div className="max-w-3xl mx-auto mb-16">
        {/* Bio + info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-2 p-6 rounded-xl border border-white/5 bg-white/[0.02]"
          >
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-4">
              Background
            </h3>
            <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">
              <p>
                First-year B.Voc AI & DS student at Nexcore Institute of Technology with a strong foundation in full-stack web development using modern technologies.
              </p>
              <p>
                Deep appreciation for artificial intelligence and its applications. I combine knowledge of AI/ML with web development to create intelligent, innovative solutions.
              </p>
              <p>
                Actively seeking projects and collaborations to contribute my skills and grow as a developer.
              </p>
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-3"
          >
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-zinc-600 mb-1">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-xs uppercase tracking-wider">Location</span>
              </div>
              <p className="text-sm text-zinc-300 font-medium">Mumbai, India</p>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-zinc-600 mb-1">
                <GraduationCap className="h-3.5 w-3.5" />
                <span className="text-xs uppercase tracking-wider">Education</span>
              </div>
              <p className="text-sm text-zinc-300 font-medium">B.Voc AI & DS</p>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-zinc-600 mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-xs uppercase tracking-wider">Focus</span>
              </div>
              <p className="text-sm text-zinc-300 font-medium">AI & Web Dev</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skills */}
      <div className="max-w-3xl mx-auto">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-6 text-center"
        >
          Skills
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend */}
          {frontendSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4"
            >
              <h4 className="text-xs font-medium text-zinc-600 uppercase tracking-wider">
                Frontend
              </h4>
              <div className="space-y-4">
                {frontendSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Backend */}
          {backendSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4"
            >
              <h4 className="text-xs font-medium text-zinc-600 uppercase tracking-wider">
                Backend
              </h4>
              <div className="space-y-4">
                {backendSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Tools */}
          {toolsSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4"
            >
              <h4 className="text-xs font-medium text-zinc-600 uppercase tracking-wider">
                Tools
              </h4>
              <div className="space-y-4">
                {toolsSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Other */}
          {otherSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4"
            >
              <h4 className="text-xs font-medium text-zinc-600 uppercase tracking-wider">
                Design
              </h4>
              <div className="space-y-4">
                {otherSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}