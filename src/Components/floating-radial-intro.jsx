"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RadialIntro } from "./radial-intro";

gsap.registerPlugin(ScrollTrigger);

export function FloatingRadialIntro({ orbitItems }) {
  const floatingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const floatingElement = floatingRef.current;
    if (!floatingElement) return;

    // Set initial position on the right side
    gsap.set(floatingElement, {
      position: "fixed",
      top: "50%",
      right: "8%",
      x: 0,
      y: "-50%",
      opacity: 0,
      scale: 0.8
    });

    // Fade in animation when component mounts
    gsap.to(floatingElement, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => setIsVisible(true)
    });

    // Only run on desktop
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    
    if (mediaQuery.matches) {
      const aboutSection = document.querySelector("#about");
      const radialTarget = document.querySelector("#radial-target");
      
      if (!aboutSection || !radialTarget) return;

      // Get target position
      const getTargetPosition = () => {
        const targetRect = radialTarget.getBoundingClientRect();
        return {
          top: targetRect.top + window.scrollY,
          left: targetRect.left + (targetRect.width / 2)
        };
      };

      // Create scroll trigger animation
      ScrollTrigger.create({
        trigger: aboutSection,
        start: "top bottom",
        end: "top 15%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetPos = getTargetPosition();
          
          if (progress < 1) {
            // Still animating - keep it fixed, move from right to left
            gsap.set(floatingElement, {
              position: "fixed",
              top: `${50 - (progress * 30)}%`,
              right: `${8 + (progress * 50)}%`,
              left: "auto",
              x: 0,
              y: "-50%",
              scale: 1,
              opacity: 1
            });
          } else {
            // Animation complete - position it absolutely at target
            gsap.set(floatingElement, {
              position: "absolute",
              top: targetPos.top,
              left: targetPos.left,
              right: "auto",
              x: "-50%",
              y: 0,
              scale: 1,
              opacity: 1
            });
          }
        },
        onLeaveBack: () => {
          // Scrolling back up - reset to fixed on right
          gsap.set(floatingElement, {
            position: "fixed",
            top: "50%",
            right: "8%",
            left: "auto",
            x: 0,
            y: "-50%"
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={floatingRef} className="hidden lg:block z-20">
      <RadialIntro orbitItems={orbitItems} />
    </div>
  );
}
