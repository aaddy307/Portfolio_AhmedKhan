"use client";

import { SectionContainer } from "@/Components/section-container";
import { SectionHeading } from "@/Components/section-heading";
import { getPersonalInfo } from "@/lib/config";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/Components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const personalInfo = getPersonalInfo();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <SectionContainer id="contact">
      <SectionHeading 
        title="Get In Touch" 
        subtitle="Have a question or want to work together? Feel free to contact me."
      />

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Contact Information</h3>
          
          <div className="space-y-6">
            <Card className="hover:border-primary transition-all duration-300 cursor-pointer">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="font-medium hover:text-primary transition-colors break-all text-sm sm:text-base"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:border-primary transition-all duration-300">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{personalInfo.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
