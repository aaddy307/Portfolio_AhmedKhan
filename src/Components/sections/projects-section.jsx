"use client";

import { useState } from "react";
import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { getProjects } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Github, ExternalLink, ArrowRight, Figma } from "lucide-react";
import Image from "next/image";

export function ProjectsSection() {
  const allProjects = getProjects();
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const allTags = Array.from(
    new Set(allProjects.flatMap(project => project.tags))
  ).sort();
  
  const filteredProjects = selectedTag
    ? allProjects.filter(project => project.tags.includes(selectedTag))
    : allProjects;
    
  return (
    <SectionContainer id="projects">
      <SectionHeading 
        title="My Projects" 
        subtitle="Showcasing my work in web development and UI/UX design, from responsive websites to interactive prototypes."
      />
      
      <motion.div 
        className="flex flex-wrap gap-2 justify-center mb-12 max-w-full px-2"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Button
          variant={selectedTag === null ? "default" : "outline"} 
          className="rounded-full" 
          onClick={() => setSelectedTag(null)}
        >
          All
        </Button>
        {allTags.map((tag) => (
          <Button 
            key={tag} 
            variant={selectedTag === tag ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: -5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
            >
              <ProjectCard 
                project={project} 
                onSelect={() => setSelectedProject(project)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <ProjectDialog 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </SectionContainer>
  );
}

function ProjectCard({ project, onSelect }) {
  return (
    <Card className="overflow-visible h-full flex flex-col hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 ease-out group">
      <div className="relative h-48 overflow-hidden rounded-t-lg group/image">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-all duration-500 grayscale brightness-110 contrast-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:scale-110"
        />
      </div>
      <CardHeader className="flex-grow-0">
        <CardTitle className="line-clamp-1 group-hover:text-blue-500 transition-all duration-300">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[2.5rem] group-hover:text-foreground/80 transition-colors duration-300">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 min-h-[2rem]">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="group-hover:border-primary/40 transition-colors duration-300">+{project.tags.length - 3}</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto pt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" onClick={onSelect} className="group-hover:text-primary transition-colors duration-300">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
        </Dialog>
        
        <div className="flex gap-2">
          {project.figmaUrl && (
            <div className="relative group/tooltip">
              <Button variant="outline" size="icon" asChild className="hover:bg-primary/5 hover:border-primary/40 hover:shadow-md transition-all duration-300">
                <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer" aria-label="Figma Design">
                  <Figma className="h-4 w-4 group-hover/tooltip:scale-110 transition-transform duration-300" />
                </a>
              </Button>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-white bg-gray-900 dark:bg-gray-800 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                Open Figma File
              </span>
            </div>
          )}
          {project.githubUrl && (
            <div className="relative group/tooltip">
              <Button variant="outline" size="icon" asChild className="hover:bg-primary/5 hover:border-primary/40 hover:shadow-md transition-all duration-300">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                  <Github className="h-4 w-4 group-hover/tooltip:scale-110 transition-transform duration-300" />
                </a>
              </Button>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-white bg-gray-900 dark:bg-gray-800 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                GitHub Repository
              </span>
            </div>
          )}
          {project.liveUrl && (
            <div className="relative group/tooltip">
              <Button variant="outline" size="icon" asChild className="hover:bg-primary/5 hover:border-primary/40 hover:shadow-md transition-all duration-300">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                  <ExternalLink className="h-4 w-4 group-hover/tooltip:scale-110 transition-transform duration-300" />
                </a>
              </Button>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-white bg-gray-900 dark:bg-gray-800 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                Live Demo
              </span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

function ProjectDialog({ project, onClose }) {
  if (!project) return null;
  
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        
        <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            style={{ objectFit: "cover" }}
          />
        </div>
        
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">About this project</h4>
          <p className="text-muted-foreground">
            {project.longDescription || project.description}
          </p>
        </div>
        
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4 mt-6">
          {project.figmaUrl && (
            <Button variant="outline" asChild>
              <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                View Figma Design <Figma className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                View Live Demo <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub Repository <Github className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
