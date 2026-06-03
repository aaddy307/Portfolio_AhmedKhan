"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Award, Calendar, Clock, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const INITIAL_COUNT = 3;

export function AchievementsSection() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) =>
        setAchievements(
          data.map((c) => ({
            ...c,
            id: c._id,
            organization: c.issuer,
            imageUrl: c.imageUrl || "",
          }))
        )
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayedAchievements = showAll ? achievements : achievements.slice(0, INITIAL_COUNT);
  const hasMore = achievements.length > INITIAL_COUNT;

  if (loading) return null;

  return (
    <SectionContainer id="achievements">
      <SectionHeading
        title="Achievements"
        subtitle="Certifications, recognitions, and learning milestones."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <AchievementCard
              achievement={achievement}
              onSelect={() => setSelectedAchievement(achievement)}
            />
          </motion.div>
        ))}
      </div>

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
                Show more ({achievements.length - INITIAL_COUNT})
                <ChevronDown className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      )}

      <AchievementDialog
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </SectionContainer>
  );
}

function AchievementCard({ achievement, onSelect }) {
  return (
    <Card
      className="overflow-hidden h-full flex flex-col bg-white/[0.02] border-white/5 hover:border-white/10 rounded-xl transition-colors duration-200 group cursor-pointer"
      onClick={onSelect}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        {achievement.imageUrl ? (
          <Image
            src={achievement.imageUrl}
            alt={achievement.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
            <Award className="h-10 w-10 text-zinc-800" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white truncate drop-shadow-sm">
            {achievement.title}
          </h3>
        </div>
      </div>

      <CardContent className="flex-grow p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <Award className="h-3 w-3 shrink-0" />
          <span className="truncate">{achievement.organization}</span>
        </div>
        <CardDescription className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
          {achievement.description}
        </CardDescription>
        <div className="flex items-center gap-4 text-[10px] text-zinc-700">
          <div className="flex items-center gap-1">
            <Calendar className="h-2.5 w-2.5" />
            <span>{achievement.date}</span>
          </div>
          {achievement.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              <span>{achievement.duration}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {achievement.certificateUrl ? (
          <Button
            asChild
            size="sm"
            className="w-full rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 border border-white/5 hover:border-white/10 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <a href={achievement.certificateUrl} target="_blank" rel="noopener noreferrer">
              View Certificate
              <ExternalLink className="ml-1.5 h-3 w-3" />
            </a>
          </Button>
        ) : (
          <Button
            size="sm"
            className="w-full rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 border border-white/5 hover:border-white/10 transition-colors"
            onClick={onSelect}
          >
            View Details
            <ExternalLink className="ml-1.5 h-3 w-3" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function AchievementDialog({ achievement, onClose }) {
  useEffect(() => {
    if (achievement) {
      document.body.style.overflow = "hidden";
      window.history.pushState({ modal: true }, "");
      const handlePopState = () => onClose();
      window.addEventListener("popstate", handlePopState);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <Dialog
      open={!!achievement}
      onOpenChange={(open) => {
        if (!open) {
          if (window.history.state?.modal) window.history.back();
          else onClose();
        }
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] w-[95vw] rounded-xl bg-zinc-950 border-white/10 p-6 pt-16">
        <DialogHeader className="pr-8 text-left mb-4">
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-zinc-600 mt-0.5 shrink-0" />
            <div>
              <DialogTitle className="text-lg text-zinc-200">{achievement.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-1 text-xs text-zinc-600 mt-1">
                <span>{achievement.organization}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Image */}
        {achievement.imageUrl && (
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-4 bg-white/5">
            <Image
              src={achievement.imageUrl}
              alt={achievement.title}
              fill
              sizes="(max-width: 768px) 95vw, 672px"
              style={{ objectFit: "contain" }}
              className="bg-zinc-900/50"
              loading="lazy"
            />
          </div>
        )}

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/5">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Calendar className="h-3 w-3" />
            <span>{achievement.date}</span>
          </div>
          {achievement.duration && (
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Clock className="h-3 w-3" />
              <span>{achievement.duration}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed">
          {achievement.description}
        </p>
      </DialogContent>
    </Dialog>
  );
}