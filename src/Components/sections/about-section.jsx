"use client";

import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { getSkills } from "@/lib/config";
import { Progress } from "@/Components/ui/progress";
import { motion } from "framer-motion";
import Image from "next/image";

// Skill icon mapping
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
  github: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg",
  vscode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  wordpress: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
};

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {skill.icon && skillIcons[skill.icon] && (
            <div className="w-6 h-6 flex-shrink-0 relative">
              <Image
                src={skillIcons[skill.icon]}
                alt={`${skill.name} icon`}
                width={24}
                height={24}
                className={`object-contain ${
                  skill.icon === 'express' || skill.icon === 'github' 
                    ? 'dark:invert dark:brightness-0 dark:contrast-200' 
                    : ''
                }`}
              />
            </div>
          )}
          <span className="font-medium">{skill.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <Progress value={skill.level} className="h-2" />
    </motion.div>
  );
}

export function AboutSection() {
  const skills = getSkills();
  const frontendSkills = skills.filter(skill => skill.category === "frontend");
  const backendSkills = skills.filter(skill => skill.category === "backend");
  const toolsSkills = skills.filter(skill => skill.category === "tools");
  const otherSkills = skills.filter(skill => 
    skill.category !== "frontend" && 
    skill.category !== "backend" && 
    skill.category !== "tools"
  );

  return (
    <SectionContainer id="about">
      <SectionHeading 
        title="About Me" 
        subtitle="I'm a passionate web developer with a focus on creating beautiful, functional, and user-friendly experiences."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Passionate first-year B.Voc AI & ML student at Nexcore Institute of Technology with a strong foundation in full-stack web development using modern technologies.
            </p>
            <p>
              Ex-student of Universal AI University, Karjat with deep appreciation for artificial intelligence. I combine my knowledge of AI/ML with web development to create innovative and intelligent solutions.
            </p>
            <p>
              Actively seeking internships, projects, and collaborations to contribute my skills and grow as a developer. I&apos;m passionate about learning new technologies and building impactful applications.
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl font-semibold mb-4">Frontend Skills</h3>
            <div className="space-y-4">
              {frontendSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl font-semibold mb-4">Backend Skills</h3>
            <div className="space-y-4">
              {backendSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          {toolsSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-semibold mb-4">Tools & Others</h3>
              <div className="space-y-4">
                {toolsSkills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {otherSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-semibold mb-4">Design Skills</h3>
              <div className="space-y-4">
                {otherSkills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
