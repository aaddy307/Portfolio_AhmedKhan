"use client";

import { useState, useEffect } from "react";
import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { getProjects } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/Components/ui/card";
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
        viewport={{ once: true, amount: 0.15 }}
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
              transition={{ duration: 0.5, delay: index * 0.08 }}
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
    <Card className="overflow-hidden h-full flex flex-col group relative bg-card hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl">
      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image with split reveal effect */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {/* Diagonal overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-300" />
        
        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 group-hover:translate-y-[-4px] transition-transform duration-300">
          <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] line-clamp-1">
            {project.title}
          </h3>
        </div>
        
        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          {project.figmaUrl && (
            <Button 
              variant="secondary" 
              size="icon" 
              asChild 
              className="h-9 w-9 rounded-full shadow-lg backdrop-blur-sm bg-background/90 hover:bg-primary hover:text-primary-foreground"
            >
              <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                <Figma className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button 
              variant="secondary" 
              size="icon" 
              asChild 
              className="h-9 w-9 rounded-full shadow-lg backdrop-blur-sm bg-background/90 hover:bg-primary hover:text-primary-foreground"
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button 
              variant="secondary" 
              size="icon" 
              asChild 
              className="h-9 w-9 rounded-full shadow-lg backdrop-blur-sm bg-background/90 hover:bg-primary hover:text-primary-foreground"
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>

      <CardContent className="flex-grow p-5 space-y-3">
        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {project.description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              onClick={onSelect} 
              className="w-full rounded-full font-semibold group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
              size="lg"
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </DialogTrigger>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    if (project) {
      // Lock background scroll - comprehensive fix for mobile
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
      
      // Push history state for Android back button
      window.history.pushState({ modal: true }, '');
      
      // Handle popstate (back button)
      const handlePopState = () => {
        onClose();
      };
      
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        // Unlock background scroll - restore all properties
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = '';
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [project, onClose]);
  
  if (!project) return null;
  
  return (
    <Dialog open={!!project} onOpenChange={(open) => {
      if (!open) {
        // Remove the history state we added
        if (window.history.state?.modal) {
          window.history.back();
        } else {
          onClose();
        }
      }
    }}>
      <DialogContent className="max-w-3xl max-h-[90vh] w-[95vw] sm:w-full pt-16 md:pt-14" style={{ WebkitOverflowScrolling: 'touch' }}>
        <DialogHeader className="pr-12">
          <DialogTitle className="text-xl sm:text-2xl pr-4">{project.title}</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">{project.description}</DialogDescription>
        </DialogHeader>
        
        <div className="relative h-48 sm:h-64 md:h-96 overflow-hidden rounded-lg overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 95vw, 896px"
            style={{ objectFit: "cover" }}
          />
        </div>
        
        <div className="mt-4">
          <h4 className="text-base sm:text-lg font-semibold mb-2">About this project</h4>
          <p className="text-muted-foreground text-sm sm:text-base">
            {project.longDescription || project.description}
          </p>
        </div>
        
        <div className="mt-4">
          <h4 className="text-base sm:text-lg font-semibold mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs sm:text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
          {project.figmaUrl && (
            <Button variant="outline" asChild className="w-full sm:w-auto text-sm">
              <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                View Figma <Figma className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild className="w-full sm:w-auto text-sm">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" asChild className="w-full sm:w-auto text-sm">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub <Github className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
