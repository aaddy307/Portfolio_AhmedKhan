"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeSwitch } from "@/Components/theme-switch";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { getPersonalInfo } from "@/lib/config";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const personalInfo = getPersonalInfo();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  return (
    <motion.header
      className={cn(
        "fixed top-0 w-full z-[100] backdrop-blur-sm transition-all duration-300 overflow-x-hidden",
        scrollY.get() > 50 ? "bg-background/80" : "bg-transparent"
      )}
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-full">
        <Link href="/" className="text-xl font-bold" onClick={closeMenu}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {personalInfo.name.split(' ')[0]}<span className="text-primary">{personalInfo.name.split(' ')[1] || ''}</span>
          </motion.span>
        </Link>
        
        <div className="flex items-center gap-2 relative z-[110]">
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="text-base font-medium rounded-full px-4"
                >
                  <Link href={item.href} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </nav>
          
          <ThemeSwitch />
        </div>
      </div>
    </motion.header>
  );
}
