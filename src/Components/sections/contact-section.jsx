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
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
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
            
            {personalInfo.phone && (
              <Card 
                className="hover:border-primary transition-all duration-300 cursor-pointer"
                onClick={copyToClipboard}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium hover:text-primary transition-colors">
                      {personalInfo.phone}
                    </p>
                  </div>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-primary font-medium"
                    >
                      Copied!
                    </motion.span>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
