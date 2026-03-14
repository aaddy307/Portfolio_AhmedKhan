"use client";

import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { getWorkExperiences, getEducationExperiences } from "@/lib/config";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { BriefcaseIcon, GraduationCap } from "lucide-react";

export function ExperienceSection() {
  const workExperiences = getWorkExperiences();
  const educationExperiences = getEducationExperiences();

  return (
    <SectionContainer id="experience">
      <SectionHeading 
        title="Experience & Education" 
        subtitle="My professional journey and educational background"
      />

      <Tabs defaultValue="work" className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.15 }}
          className="flex justify-center mb-8"
        >
          <TabsList className="grid grid-cols-2 w-[300px]">
            <TabsTrigger value="work" className="flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4" /> Work
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> Education
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="work">
          <div className="relative space-y-6">
            {/* Continuous vertical timeline line */}
            <div className="absolute left-[3.75rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
            
            {workExperiences.map((experience, index) => (
              <ExperienceItem 
                key={experience.id} 
                experience={experience} 
                index={index}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="education">
          <div className="relative space-y-6">
            {/* Continuous vertical timeline line */}
            <div className="absolute left-[3.75rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
            
            {educationExperiences.map((experience, index) => (
              <ExperienceItem 
                key={experience.id} 
                experience={experience} 
                index={index}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </SectionContainer>
  );
}

function ExperienceItem({ experience, index }) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.08,
          ease: "easeOut"
        }}
        viewport={{ once: true, amount: 0.15 }}
        className="ml-[7.5rem] transition-all duration-300 ease-out hover:ml-[7.75rem]"
      >
        <Card className="relative hover:border-primary transition-all duration-300 ease-out">
          <CardHeader className="relative">
            {/* Timeline dot/icon */}
            <div className="absolute -left-[5.25rem] top-6 h-12 w-12 rounded-full bg-primary flex items-center justify-center ring-4 ring-background z-10">
              {experience.type === 'work' ? (
                <BriefcaseIcon className="h-6 w-6 text-primary-foreground" />
              ) : (
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              )}
            </div>
            <CardTitle>{experience.position}</CardTitle>
            <CardDescription>
              {experience.company} | {experience.duration}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{experience.description}</p>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
