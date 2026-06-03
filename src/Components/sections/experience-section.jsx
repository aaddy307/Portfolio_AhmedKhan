"use client";

import { useState } from "react";
import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { getWorkExperiences, getEducationExperiences } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/Components/ui/badge";
import { BriefcaseIcon, GraduationCap, MapPin, CalendarDays, ChevronRight } from "lucide-react";

const tabs = [
  { id: 'work', label: 'Work Experience', icon: BriefcaseIcon },
  { id: 'education', label: 'Education', icon: GraduationCap },
];

function TimelineDot({ type }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Pulse ring */}
      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      {/* Dot */}
      <div className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <type.icon className="w-5 h-5 text-primary-foreground" />
      </div>
      {/* Line */}
      <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/60 to-transparent mt-2" />
    </div>
  );
}

function ExperienceCard({ experience, type }) {
  return (
    <div className="group relative">
      {/* Card body */}
      <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:-translate-y-0.5">
        {/* Gradient accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="p-5 sm:p-6 relative z-10">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                {experience.position}
              </h3>
              <p className="text-cyan-400/80 font-medium text-sm sm:text-base">
                {experience.company}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="secondary" className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/10">
                <CalendarDays className="w-3 h-3 mr-1" />
                {experience.duration}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-5">
            {experience.description}
          </p>

          {/* Technologies */}
          {experience.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 group-hover:text-cyan-400 transition-all duration-300"
                >
                  <ChevronRight className="w-2.5 h-2.5 opacity-50" />
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ExperienceList({ experiences, type }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <ExperienceCard experience={experience} type={type} />
        </motion.div>
      ))}
    </div>
  );
}

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState('work');
  const workExperiences = getWorkExperiences();
  const educationExperiences = getEducationExperiences();

  return (
    <SectionContainer id="experience">
      <SectionHeading
        title="Experience & Education"
        subtitle="My professional journey and educational background"
      />

      {/* Tab triggers */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-1 p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 z-10
                  ${isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-lg"
                    transition={{ type: 'spring', duration: 0.4 }}
                  />
                )}
                <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-cyan-400' : ''}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ExperienceList experiences={workExperiences} type="work" />
            </motion.div>
          )}
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ExperienceList experiences={educationExperiences} type="education" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
}