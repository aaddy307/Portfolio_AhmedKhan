"use client";

import { useState } from "react";
import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { motion } from "framer-motion";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
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
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
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
    <Card className="overflow-hidden h-full flex flex-col group relative bg-card hover:shadow-2xl transition-all duration-700 border-0 rounded-2xl cursor-pointer"
      onClick={onSelect}
    >
      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
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
              className="transition-all duration-700 group-hover:scale-110 filter group-hover:saturate-150"
            />
          </>
        ) : (
          <div className="relative h-full bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 group-hover:from-primary/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <Award className="h-16 w-16 text-primary/20 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-500" />
            </div>
          </div>
        )}
        
        {/* Diagonal overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-700" />
        
        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 group-hover:translate-y-[-8px] transition-transform duration-500">
          <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] line-clamp-2">
            {achievement.title}
          </h3>
        </div>
        
        {/* Type badge overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
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

      <CardFooter className="p-5 pt-0">
        <Button 
          className="w-full rounded-full font-semibold group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
          size="lg"
        >
          View Certificate
          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function AchievementDialog({ achievement, onClose }) {
  if (!achievement) return null;
  
  return (
    <Dialog open={!!achievement} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{achievement.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-base">
                <Award className="h-4 w-4" />
                {achievement.organization}
              </DialogDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              {achievement.type}
            </Badge>
          </div>
        </DialogHeader>
        
        {/* Certificate Image */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-lg border border-border">
          {achievement.imageUrl ? (
            <Image
              src={achievement.imageUrl}
              alt={achievement.title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              style={{ objectFit: "contain" }}
              className="rounded-lg bg-muted"
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
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-medium">{achievement.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-medium">{achievement.duration}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-2">
          <h4 className="text-lg font-semibold mb-3">About this achievement</h4>
          <p className="text-muted-foreground leading-relaxed">
            {achievement.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
