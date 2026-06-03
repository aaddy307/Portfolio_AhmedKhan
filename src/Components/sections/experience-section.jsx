"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { getWorkExperiences, getEducationExperiences } from "@/lib/config";
import { BriefcaseIcon, GraduationCap, CalendarDays } from "lucide-react";

const tabs = [
  { id: "work", label: "Work", icon: BriefcaseIcon },
  { id: "education", label: "Education", icon: GraduationCap },
];

function ExperienceCard({ experience }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-colors duration-200"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <h3 className="text-base font-semibold text-zinc-200 group-hover:text-white transition-colors">
            {experience.position}
          </h3>
          <p className="text-sm text-zinc-500 mt-0.5">{experience.company}</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-600 shrink-0">
          <CalendarDays className="h-3 w-3" />
          <span>{experience.duration}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-500 leading-relaxed mb-4">
        {experience.description}
      </p>

      {/* Tech tags */}
      {experience.technologies?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-zinc-500 border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState("work");
  const workExperiences = getWorkExperiences();
  const educationExperiences = getEducationExperiences();

  return (
    <SectionContainer id="experience">
      <SectionHeading
        title="Experience"
        subtitle="My professional journey and education."
      />

      {/* Tab switcher */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-white/[0.02] border border-white/5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-zinc-200"
                    : "text-zinc-600 hover:text-zinc-400"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="experienceTab"
                    className="absolute inset-0 bg-white/5 rounded-md border border-white/5"
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}
                <Icon className="h-3.5 w-3.5 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "work" && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {workExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </motion.div>
          )}
          {activeTab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {educationExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
}