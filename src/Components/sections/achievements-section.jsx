"use client";

import { useState, useEffect } from "react";
import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { motion } from "framer-motion";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Award, Calendar, Clock, ExternalLink } from "lucide-react";
import Image from "next/image";

const achievements = [
  {
    id: 1,
    title: "Understanding Prompt Engineering",
    organization: "DataCamp",
    date: "Nov 07, 2024",
    duration: "1 Hour",
    type: "Course",
    description: "Successfully completed a comprehensive course on Prompt Engineering, learning techniques to effectively communicate with AI models and optimize their responses for various applications.",
    imageUrl: "/projects/Promt.jpg",
  },
  {
    id: 2,
    title: "AI For All - AI Appreciate",
    organization: "Intel & Digital India",
    date: "Jan 06, 2026",
    duration: "2 Hours",
    type: "Program",
    description: "Participated in AI For All program by Intel and Digital India, completing the AI Appreciate stage. Gained foundational knowledge in artificial intelligence concepts and applications.",
    imageUrl: "/projects/intel.jpg",
  },
  {
    id: 6,
    title: "AI For All - AI Aware",
    organization: "Intel & Digital India",
    date: "Jan 06, 2026",
    duration: "1 Hour",
    type: "Program",
    description: "Participated in AI For All program by Intel and Digital India, completing the AI Aware stage. Demonstrated awareness and understanding of AI technologies and their real-world applications.",
    imageUrl: "/projects/Intell.jpg",
  },
  {
    id: 7,
    title: "Yuva AI For ALL - English",
    organization: "AISECT LEARN (IndiaAI)",
    date: "Jan 21, 2026",
    duration: "1 Hour",
    type: "Course",
    description: "Successfully completed Yuva AI For ALL English course offered by AISECT LEARN, a unit of AISECT LTD in collaboration with IndiaAI. Comprehensive AI education program for youth empowerment.",
    imageUrl: "/projects/India.jpg",
  },
  {
    id: 5,
    title: "Error Detection & Debugging Appreciation",
    organization: "Nexcore Alliance",
    date: "Oct 05, 2025",
    duration: "Testing Phase",
    type: "Recognition",
    description: "Received appreciation from Nexcore Alliance for proactive efforts in detecting and reporting multiple errors during User Panel and Admin Mobile Testing phase, identifying over ten critical and minor issues.",
    imageUrl: "/projects/Error.jpg",
  },
  {
    id: 3,
    title: "Climate Change: Carbon Capture and Storage",
    organization: "University of Edinburgh",
    date: "Feb 27, 2025",
    duration: "2 Hours",
    type: "Course",
    description: "Successfully completed and received a passing grade in CCSx: Climate Change: Carbon Capture and Storage course offered by EdinburghX, an online learning initiative of University of Edinburgh.",
    imageUrl: "/projects/edX.jpg",
  },
  {
    id: 4,
    title: "Professional Ethics Webinar",
    organization: "HCLTech Career Shaper",
    date: "Sep-Nov 2024",
    duration: "Webinar Series",
    type: "Webinar",
    description: "Successfully participated in the webinar series on Professional Ethics conducted by HCLTech Career Shaper during September 2024 and November 2024, learning about workplace ethics and professional conduct.",
    imageUrl: "/projects/HCL.jpg",
  },
  {
    id: 8,
    title: "Claude 101",
    organization: "Anthropic",
    date: "Feb - March 2026",
    duration: "Short Course",
    type: "Course",
    description: "Successfully completed Claude 101 course by Anthropic, gaining foundational knowledge of Claude AI, its capabilities, and how to effectively use it for various tasks.",
    imageUrl: "/projects/Claude_101.png",
  },
  {
    id: 9,
    title: "AI Fluency for Educators",
    organization: "Anthropic",
    date: "Feb - March 2026",
    duration: "Short Course",
    type: "Course",
    description: "Completed AI Fluency for Educators by Anthropic in collaboration with UCC, Ringling College of Art + Design, HEA, and National Forum. Gained skills to integrate AI tools effectively in educational settings.",
    imageUrl: "/projects/Educators.png",
  },
  {
    id: 10,
    title: "AI Fluency: Framework & Foundations",
    organization: "Anthropic",
    date: "Feb - March 2026",
    duration: "Short Course",
    type: "Course",
    description: "Completed AI Fluency: Framework & Foundations by Anthropic in collaboration with UCC, Ringling College of Art + Design, HEA, and National Forum. Built a strong conceptual foundation in AI frameworks and core principles.",
    imageUrl: "/projects/Framework_&_Foundation.png",
  },
  {
    id: 11,
    title: "AI Fluency for Nonprofits",
    organization: "Anthropic & GivingTuesday",
    date: "Feb - March 2026",
    duration: "Short Course",
    type: "Course",
    description: "Completed AI Fluency for Nonprofits by Anthropic in collaboration with GivingTuesday. Learned how AI tools can be leveraged to support nonprofit missions and social impact work.",
    imageUrl: "/projects/Non_Profit.png",
  },
  {
    id: 12,
    title: "AI Fluency for Students",
    organization: "Anthropic",
    date: "Feb - March 2026",
    duration: "Short Course",
    type: "Course",
    description: "Completed AI Fluency for Students by Anthropic in collaboration with UCC, Ringling College of Art + Design, HEA, and National Forum. Developed practical AI literacy skills tailored for academic and learning contexts.",
    imageUrl: "/projects/Students.png",
  },
];

export function AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  
  return (
    <SectionContainer id="achievements">
      <SectionHeading 
        title="Achievements" 
        subtitle="Certifications, recognitions, and learning milestones."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <AchievementCard 
              achievement={achievement} 
              onSelect={() => setSelectedAchievement(achievement)} 
            />
          </motion.div>
        ))}
      </div>
      
      <AchievementDialog 
        achievement={selectedAchievement} 
        onClose={() => setSelectedAchievement(null)} 
      />
    </SectionContainer>
  );
}

function AchievementCard({ achievement, onSelect }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col group relative bg-card hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl cursor-pointer"
      onClick={onSelect}
    >
      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Certificate Image with overlay */}
      <div className="relative h-56 overflow-hidden">
        {achievement.imageUrl ? (
          <>
            <Image
              src={achievement.imageUrl}
              alt={achievement.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </>
        ) : (
          <div className="relative h-full bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 group-hover:from-primary/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <Award className="h-16 w-16 text-primary/20 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
        )}
        
        {/* Diagonal overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-300" />
        
        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 group-hover:translate-y-[-4px] transition-transform duration-300">
          <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] line-clamp-2">
            {achievement.title}
          </h3>
        </div>
        
        {/* Type badge overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 shadow-lg">
            {achievement.type}
          </Badge>
        </div>
      </div>

      <CardContent className="flex-grow p-5 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
          <Award className="h-4 w-4" />
          <span className="font-medium">{achievement.organization}</span>
        </div>
        
        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {achievement.description}
        </CardDescription>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{achievement.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{achievement.duration}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto">
        <Button 
          className="w-full rounded-full font-semibold group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
          size="lg"
        >
          View Certificate
          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function AchievementDialog({ achievement, onClose }) {
  useEffect(() => {
    if (achievement) {
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
  }, [achievement, onClose]);
  
  if (!achievement) return null;
  
  return (
    <Dialog open={!!achievement} onOpenChange={(open) => {
      if (!open) {
        // Remove the history state we added
        if (window.history.state?.modal) {
          window.history.back();
        } else {
          onClose();
        }
      }
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] w-[95vw] sm:w-full pt-16 md:pt-14" style={{ WebkitOverflowScrolling: 'touch' }}>
        <DialogHeader className="pr-12 text-left sm:text-center">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 pr-4">
              <DialogTitle className="text-lg md:text-2xl mb-2 leading-tight">{achievement.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-sm md:text-base">
                <Award className="h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-2">{achievement.organization}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        {/* Certificate Image */}
        <div className="relative h-48 md:h-80 overflow-hidden rounded-lg border border-border mt-4 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          {achievement.imageUrl ? (
            <Image
              src={achievement.imageUrl}
              alt={achievement.title}
              fill
              sizes="(max-width: 768px) 95vw, 672px"
              style={{ objectFit: "contain" }}
              className="rounded-lg bg-muted"
              loading="lazy"
            />
          ) : (
            <div className="relative h-full bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Award className="h-24 w-24 text-primary/20" />
                <p className="text-sm text-muted-foreground">Certificate preview will appear here</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:gap-4 py-3 md:py-4 mt-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-medium text-sm">{achievement.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-medium text-sm">{achievement.duration}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-2 md:mt-4">
          <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3">About this achievement</h4>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {achievement.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
