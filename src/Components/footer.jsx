"use client";

import Link from "next/link";
import { getSocialLinks, getPersonalInfo } from "@/lib/config";
import { Github, Linkedin, Instagram } from "lucide-react";
import { WhatsAppIcon } from "@/Components/icons/whatsapp-icon";

export function Footer() {
  const socials = getSocialLinks();
  const personalInfo = getPersonalInfo();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-zinc-950/50">
      <div className="container mx-auto px-6 py-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-lg font-semibold text-zinc-300">
            Ahmed Khan
          </Link>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {socials.map((social) => {
            const iconMap = {
              Github,
              Linkedin,
              Instagram,
              WhatsApp: WhatsAppIcon,
            };
            const Icon = iconMap[social.icon];

            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-colors duration-200"
              >
                {Icon && <Icon className="h-4 w-4" />}
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-zinc-600">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700">
            Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}