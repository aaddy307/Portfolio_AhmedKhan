"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getPersonalInfo, getSocialLinks } from "@/lib/config";
import { ButtonLink } from "@/Components/button-link";
import { Github, Linkedin, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/Components/icons/whatsapp-icon";
import { MorphingName } from "@/Components/morphing-name";
import { CodeSnippetAnimation } from "@/Components/code-snippet-animation";
import { useState, useEffect } from "react";

export function HeroSection() {
  const personalInfo = getPersonalInfo();
  const socials = getSocialLinks();
  
  const roles = [
    { text: "Web Developer", icon: "code" },
    { text: "UI/UX Designer", icon: "palette" }
  ];
  const [currentRole, setCurrentRole] = useState(0);
  const [roleDisplayedText, setRoleDisplayedText] = useState("");
  const [isRoleDeleting, setIsRoleDeleting] = useState(false);

  // Entry animation states
  const [greetingText, setGreetingText] = useState("");
  const [showName, setShowName] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [bioText, setBioText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  const greetingFull = "Hi, I'm";
  const bioFull = personalInfo.bio;

  // Start animation immediately
  useEffect(() => {
    setStartAnimation(true);
  }, []);

  // Greeting typewriter effect
  useEffect(() => {
    if (!startAnimation) return;
    
    if (greetingText.length < greetingFull.length) {
      const timer = setTimeout(() => {
        setGreetingText(greetingFull.slice(0, greetingText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Show name after greeting is complete
      setTimeout(() => setShowName(true), 300);
    }
  }, [greetingText, startAnimation]);

  // Show role badge after name appears
  useEffect(() => {
    if (showName) {
      setTimeout(() => setShowRole(true), 800);
    }
  }, [showName]);

  // Bio typewriter effect
  useEffect(() => {
    if (showRole && bioText.length < bioFull.length) {
      const timer = setTimeout(() => {
        setBioText(bioFull.slice(0, bioText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    } else if (bioText.length === bioFull.length && bioText.length > 0) {
      // Show buttons after bio is complete
      setTimeout(() => {
        setShowButtons(true);
        setAnimationComplete(true);
      }, 300);
    }
  }, [showRole, bioText, bioFull]);

  // Role typing animation (only starts after entry animation)
  useEffect(() => {
    if (!animationComplete) return;

    const currentRoleText = roles[currentRole].text;
    
    const handleRoleTyping = () => {
      if (!isRoleDeleting) {
        if (roleDisplayedText.length < currentRoleText.length) {
          setRoleDisplayedText(currentRoleText.slice(0, roleDisplayedText.length + 1));
        } else {
          setTimeout(() => setIsRoleDeleting(true), 2500);
          return;
        }
      } else {
        if (roleDisplayedText.length > 0) {
          setRoleDisplayedText(roleDisplayedText.slice(0, -1));
        } else {
          setIsRoleDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
          return;
        }
      }
    };

    const speed = isRoleDeleting ? 80 : 150;
    const timer = setTimeout(handleRoleTyping, speed);

    return () => clearTimeout(timer);
  }, [roleDisplayedText, isRoleDeleting, currentRole, roles, animationComplete]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 pb-8 md:pb-12 overflow-x-hidden">
      {/* Code Snippet Animation - Right Side */}
      <CodeSnippetAnimation />
      
      <div className="container mx-auto px-4 lg:px-12 relative z-10 max-w-full">
        <div className="max-w-4xl">
          <div className="space-y-2">
            {/* Greeting and Name */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2">
                {startAnimation && (
                  <motion.div 
                    className="text-3xl md:text-5xl mb-2"
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.1, 0.25, 1] 
                    }}
                  >
                    {greetingText}
                    {greetingText.length < greetingFull.length && (
                      <span className="inline-block w-0.5 h-[0.9em] bg-foreground ml-1 animate-blink"></span>
                    )}
                  </motion.div>
                )}
                
                {showName && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <MorphingName startAnimation={animationComplete} />
                  </motion.div>
                )}
              </h1>
            </div>

            {/* Role Badge */}
            {showRole && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative flex justify-start"
              >
                <div className="relative h-[50px] w-fit max-w-[90%] flex items-center justify-center overflow-visible">
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: "radial-gradient(ellipse 250px 120px at 50% 50%, hsl(var(--primary) / 0.06), transparent)"
                    }}
                  />

                  <div className="text-base md:text-xl font-semibold relative z-10">
                    <div className="flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-background/30 border border-border/50 backdrop-blur-md">
                      {roles[currentRole].icon === "code" ? (
                        <>
                          <span className="font-mono text-lg md:text-2xl" style={{ color: '#667eea' }}>
                            &lt;
                          </span>
                          <span className="text-primary font-semibold inline-flex items-center">
                            {roleDisplayedText}
                            <span className="inline-block w-0.5 h-[0.9em] bg-primary ml-1 animate-blink"></span>
                          </span>
                          <span className="font-mono text-lg md:text-2xl" style={{ color: '#667eea' }}>
                            /&gt;
                          </span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="#ec4899" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                          <span className="text-primary font-semibold inline-flex items-center">
                            {roleDisplayedText}
                            <span className="inline-block w-0.5 h-[0.9em] bg-primary ml-1 animate-blink"></span>
                          </span>
                          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="#ec4899" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                          </svg>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bio with typewriter */}
            {showRole && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-2">
                  {bioText}
                  {bioText.length < bioFull.length && (
                    <span className="inline-block w-0.5 h-[0.9em] bg-muted-foreground ml-1 animate-blink"></span>
                  )}
                </p>
              </motion.div>
            )}

            {/* Buttons with fade in */}
            {showButtons && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-wrap gap-3 md:gap-4 mb-8"
              >
                <ButtonLink 
                  href="/#projects" 
                  icon={true}
                  className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 group text-sm md:text-base"
                >
                  <span className="relative z-10">View My Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                </ButtonLink>
                <ButtonLink 
                  href="/resume.pdf" 
                  newTab={true}
                  variant="default"
                  className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 text-sm md:text-base"
                >
                  Download Resume ↓
                </ButtonLink>
                <ButtonLink 
                  href="/#contact" 
                  variant="outline"
                  className="relative overflow-hidden border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 text-sm md:text-base"
                >
                  Get In Touch
                </ButtonLink>
              </motion.div>
            )}

            {/* Social icons with fade in */}
            {showButtons && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              >
                <div className="flex gap-6">
                  {socials.map((social) => {
                    const iconMap = {
                      Github: Github,
                      Linkedin: Linkedin,
                      Instagram: Instagram,
                      WhatsApp: WhatsAppIcon
                    };
                    const IconComponent = iconMap[social.icon];
                    
                    return (
                      <motion.a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className={cn(
                          "h-10 w-10 flex items-center justify-center rounded-full",
                          "text-muted-foreground hover:text-primary hover:border-primary",
                          "border border-border hover:border-primary",
                          "transition-colors duration-200"
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {IconComponent && <IconComponent className="h-5 w-5" />}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
