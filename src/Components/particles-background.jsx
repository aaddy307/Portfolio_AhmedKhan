"use client";

import { useEffect, useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { getThemeByName } from "@/lib/config";

export function ParticlesBackground() {
  const [mounted, setMounted] = useState(false);
  const [particleConfig, setParticleConfig] = useState(null);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        const currentTheme = getThemeByName("dark");
        
        if (currentTheme) {
          const config = currentTheme.particleConfig;
          
          // Reduce particle count on mobile
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const particleCount = isMobile ? 15 : (config.particleCount || 35);
          
          const newConfig = {
            particles: {
              number: {
                value: particleCount,
                density: {
                  enable: true,
                },
              },
              color: {
                value: config.particleColor || "#0088ff",
              },
              shape: {
                type: config.particleShape || "circle",
              },
              opacity: {
                value: config.particleOpacity || 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacityMin: 0.1,
                  sync: false,
                },
              },
              size: {
                value: config.particleSize || 3,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  sizeMin: 0.1,
                  sync: false,
                },
              },
              links: {
                enable: config.particleLinked !== false,
                distance: config.particleLinkDistance || 150,
                color: config.particleLinkColor || "#0088ff",
                opacity: config.particleLinkOpacity || 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: config.particleSpeed || 2,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "out" },
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detectsOn: "canvas",
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                onClick: {
                  enable: true,
                  mode: "push",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 140,
                  links: {
                    opacity: 1,
                  },
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3,
                },
                repulse: {
                  distance: 200,
                  duration: 0.5,
                  speed: 1,
                },
                push: {
                  quantity: 4,
                },
                remove: {
                  quantity: 2,
                },
              },
            },
            detectRetina: true,
            fpsLimit: 60,
            fullScreen: {
              enable: true,
              zIndex: -1,
            },
          };
          
          setParticleConfig(newConfig);
        }
      } catch (error) {
        console.error("Error setting up particles:", error);
      }
    }
  }, [mounted]);

  if (!mounted || !particleConfig) {
    return null;
  }
  
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particleConfig}
    />
  );
}
