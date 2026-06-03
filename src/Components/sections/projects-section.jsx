"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Github, ExternalLink, ArrowRight, Figma } from "lucide-react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

const INITIAL_COUNT = 3;

export function ProjectsSection() {
  const [allProjects, setAllProjects] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setAllProjects(data.map((p) => ({ ...p, id: p._id }))))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allTags = Array.from(new Set(allProjects.flatMap((p) => p.tags))).sort();

  const filteredProjects = selectedTag
    ? allProjects.filter((p) => p.tags.includes(selectedTag))
    : allProjects;

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);
  const hasMore = filteredProjects.length > INITIAL_COUNT;

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setShowAll(false);
  };

  if (loading) return null;

  return (
    <SectionContainer id="projects">
      <SectionHeading
        title="Projects"
        subtitle="Selected work in web development and UI/UX design."
      />

      {/* Tag filters */}
      <motion.div
        className="flex flex-wrap gap-2 justify-center mb-10"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <Button
          variant={selectedTag === null ? "default" : "outline"}
          size="sm"
          onClick={() => handleTagChange(null)}
          className="rounded-full text-xs"
        >
          All
        </Button>
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            size="sm"
            onClick={() => handleTagChange(tag)}
            className="rounded-full text-xs"
          >
            {tag}
          </Button>
        ))}
      </motion.div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
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

      {/* Show more */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="rounded-full text-xs text-zinc-500 hover:text-zinc-300 border-white/10 hover:border-white/20 px-6"
          >
            {showAll ? (
              <>
                Show less
                <ChevronUp className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                Show more ({filteredProjects.length - INITIAL_COUNT})
                <ChevronDown className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      )}

      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SectionContainer>
  );
}

function ProjectCard({ project, onSelect }) {
  return (
    <Card
      className="overflow-hidden h-full flex flex-col bg-white/[0.02] border-white/5 hover:border-white/10 rounded-xl transition-colors duration-200 group"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-sm font-semibold text-white truncate drop-shadow-sm">
            {project.title}
          </h3>
        </div>
      </div>

      <CardContent className="flex-grow p-4 space-y-3">
        <CardDescription className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
          {project.description}
        </CardDescription>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-500 border-white/5"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={onSelect}
          size="sm"
          className="w-full rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 border border-white/5 hover:border-white/10 transition-colors"
        >
          View Details
          <ArrowRight className="ml-1.5 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.history.pushState({ modal: true }, "");
      const handlePopState = () => onClose();
      window.addEventListener("popstate", handlePopState);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  return (
    <Dialog
      open={!!project}
      onOpenChange={(open) => {
        if (!open) {
          if (window.history.state?.modal) window.history.back();
          else onClose();
        }
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] w-[95vw] rounded-xl bg-zinc-950 border-white/10 p-6 pt-16">
        <DialogHeader className="pr-8 text-left mb-4">
          <DialogTitle className="text-lg text-zinc-200">{project.title}</DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 mt-1">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        {/* Image */}
        <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-4 bg-white/5">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 95vw, 672px"
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed">
          {project.longDescription || project.description}
        </p>

        {/* Tech */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-zinc-500 border-white/5"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.figmaUrl && (
            <Button variant="outline" size="sm" asChild className="text-xs rounded-lg border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20">
              <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                Figma <Figma className="ml-1.5 h-3 w-3" />
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button size="sm" asChild className="text-xs rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo <ExternalLink className="ml-1.5 h-3 w-3" />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild className="text-xs rounded-lg border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub <Github className="ml-1.5 h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}