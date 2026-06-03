"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "@/Components/section-container";
import { getPersonalInfo, getSocialLinks } from "@/lib/config";
import { Mail, MapPin, MessageCircle, Copy, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import { WhatsAppIcon } from "@/Components/icons/whatsapp-icon";
import { cn } from "@/lib/utils";

function ContactRow({ icon: Icon, label, value, href, badge, onCopy }) {
  return (
    <motion.a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "group flex items-center gap-4 p-4 rounded-xl",
        "border border-white/5 bg-white/[0.02]",
        "hover:border-white/10 hover:bg-white/[0.04]",
        "transition-colors duration-200"
      )}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs text-zinc-600 uppercase tracking-wider">{label}</span>
          {badge}
        </div>
        <p className="text-sm text-zinc-300 truncate group-hover:text-white transition-colors">
          {value}
        </p>
      </div>

      {/* Action */}
      {onCopy ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            onCopy();
          }}
          className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:bg-white/10 transition-colors shrink-0"
          aria-label="Copy"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      ) : (
        <ArrowUpRight className="h-4 w-4 text-zinc-700 group-hover:text-zinc-500 transition-colors shrink-0" />
      )}
    </motion.a>
  );
}

function SocialLink({ icon: Icon, label, href, hrefColor }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "group flex items-center gap-3 p-4 rounded-xl",
        "border border-white/5 bg-white/[0.02]",
        `hover:border-[${hrefColor}]/30 hover:bg-[${hrefColor}]/5`,
        "transition-colors duration-200"
      )}
      style={hrefColor ? {
        "--social-color": hrefColor
      } : {}}
    >
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
        <Icon className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" style={{ color: hrefColor }} />
      </div>
      <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
        {label}
      </span>
    </motion.a>
  );
}

export function ContactSection() {
  const personalInfo = getPersonalInfo();
  const socials = getSocialLinks();
  const [phoneCopied, setPhoneCopied] = useState(false);

  const copyPhone = async () => {
    await navigator.clipboard.writeText(personalInfo.phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const whatsappSocial = socials.find((s) => s.icon === "WhatsApp");
  const otherSocials = socials.filter((s) => s.icon !== "WhatsApp");

  const iconMap = { Github, Linkedin, Instagram, WhatsApp: WhatsAppIcon };
  const colorMap = { Github: "#06b6d4", Linkedin: "#8b5cf6", Instagram: "#ec4899" };

  return (
    <SectionContainer id="contact">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-200 mb-3">
            Get in touch
          </h2>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto">
            Available for projects and collaborations. Reach out and let's build something together.
          </p>
        </motion.div>

        {/* Contact rows */}
        <div className="space-y-3 mb-8">
          <ContactRow
            icon={Mail}
            label="Email"
            value={personalInfo.email}
            href={`mailto:${personalInfo.email}`}
            badge={
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-zinc-500 border border-white/5">
                Primary
              </span>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ContactRow
              icon={MessageCircle}
              label="WhatsApp"
              value={phoneCopied ? "Copied!" : personalInfo.phone}
              href={whatsappSocial?.url}
              onCopy={copyPhone}
              badge={
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-zinc-500 border border-white/5">
                  Fast
                </span>
              }
            />
            <ContactRow
              icon={MapPin}
              label="Location"
              value={personalInfo.location}
            />
          </div>
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="pt-4"
        >
          <p className="text-xs text-zinc-700 uppercase tracking-widest text-center mb-4">
            Follow
          </p>
          <div className="grid grid-cols-3 gap-3">
            {otherSocials.map((social) => {
              const Icon = iconMap[social.icon];
              const color = colorMap[social.icon];
              return (
                <SocialLink
                  key={social.platform}
                  icon={Icon}
                  label={social.platform}
                  href={social.url}
                  hrefColor={color}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}