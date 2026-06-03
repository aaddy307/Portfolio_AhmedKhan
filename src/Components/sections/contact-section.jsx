"use client";

import { SectionContainer } from "@/Components/section-container";
import { getPersonalInfo, getSocialLinks } from "@/lib/config";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, MapPin, MessageCircle, ArrowUpRight, Copy } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "@/Components/icons/whatsapp-icon";
import { cn } from "@/lib/utils";

function ContactCard({ icon: Icon, label, value, href, action, onAction, badge }) {
  return (
    <motion.a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={cn(
        'group relative block p-6 sm:p-8 rounded-2xl',
        'bg-zinc-900/60 border border-zinc-800',
        'hover:border-cyan-500/40 hover:bg-zinc-900/80',
        'transition-all duration-300 hover:-translate-y-1',
        'cursor-pointer'
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-500" />

      <div className="relative z-10 flex items-center gap-5">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:border-cyan-500/40 group-hover:from-cyan-500/30 transition-all duration-300">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-zinc-500">{label}</span>
            {badge}
          </div>
          <p className="text-base sm:text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 truncate">
            {value}
          </p>
        </div>

        {/* Action icon */}
        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {action ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                onAction?.();
              }}
              className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-colors"
            >
              {action}
            </button>
          ) : (
            <ArrowUpRight className="w-5 h-5 text-cyan-400" />
          )}
        </div>
      </div>
    </motion.a>
  );
}

function SocialButton({ icon: Icon, label, href, color }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex-1 min-w-0 flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl',
        'bg-zinc-900/60 border border-zinc-800',
        `hover:${color}/20 hover:border-${color}/40`,
        'transition-all duration-300 hover:-translate-y-1 group'
      )}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{}}
    >
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center',
        `bg-${color || 'cyan'}-500/10 border border-${color || 'cyan'}-500/20`,
        'group-hover:scale-110 transition-transform duration-300'
      )}>
        <Icon className="w-5 h-5" style={{ color: color === 'pink' ? '#ec4899' : color === 'cyan' ? '#06b6d4' : color === 'purple' ? '#8b5cf6' : color === 'green' ? '#22c55e' : '#06b6d4' }} />
      </div>
      <span className="text-xs sm:text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">{label}</span>
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

  const whatsappSocial = socials.find((s) => s.icon === 'WhatsApp');
  const otherSocials = socials.filter((s) => s.icon !== 'WhatsApp');

  return (
    <SectionContainer id="contact">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Let's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Connect
            </span>
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">
            Have a project in mind or just want to say hi? Reach out and let's create something amazing together.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="space-y-4 mb-8">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <ContactCard
              icon={Mail}
              label="Email"
              value={personalInfo.email}
              href={`mailto:${personalInfo.email}`}
              badge={
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400/80 border border-cyan-500/20">
                  Primary
                </span>
              }
            />
          </motion.div>

          {/* Phone & Location row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ContactCard
                icon={MessageCircle}
                label="WhatsApp"
                value={phoneCopied ? 'Copied!' : personalInfo.phone}
                href={whatsappSocial?.url}
                action={<Copy className="w-4 h-4" />}
                onAction={copyPhone}
                badge={
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400/80 border border-green-500/20">
                    Fast Reply
                  </span>
                }
              />
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              viewport={{ once: true }}
            >
              <ContactCard
                icon={MapPin}
                label="Location"
                value={personalInfo.location}
              />
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          <span className="text-xs text-zinc-600 font-medium uppercase tracking-widest">or follow on</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        </motion.div>

        {/* Social buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4"
        >
          {otherSocials.map((social) => {
            const iconMap = { Github, Linkedin, Instagram, WhatsApp: WhatsAppIcon };
            const Icon = iconMap[social.icon];
            const colorMap = {
              Github: '#06b6d4',
              Linkedin: '#8b5cf6',
              Instagram: '#ec4899',
            };
            const color = colorMap[social.icon] || '#06b6d4';
            return (
              <SocialButton
                key={social.platform}
                icon={Icon}
                label={social.platform}
                href={social.url}
                color={social.icon === 'Instagram' ? 'pink' : social.icon === 'Linkedin' ? 'purple' : 'cyan'}
              />
            );
          })}
        </motion.div>

        {/* Fun tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-zinc-700 text-sm mt-12"
        >
          I don't bite — say hello anytime! 👋
        </motion.p>
      </div>
    </SectionContainer>
  );
}