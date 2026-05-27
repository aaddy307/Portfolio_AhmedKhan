import dynamic from 'next/dynamic';
import { HeroSection } from '@/Components/sections/hero-section';
import { AboutSection } from '@/Components/sections/about-section';
import { ProjectsSection } from '@/Components/sections/projects-section';

const ExperienceSection = dynamic(() => import('@/Components/sections/experience-section').then(m => ({ default: m.ExperienceSection })));
const AchievementsSection = dynamic(() => import('@/Components/sections/achievements-section').then(m => ({ default: m.AchievementsSection })));
const ContactSection = dynamic(() => import('@/Components/sections/contact-section').then(m => ({ default: m.ContactSection })));

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}
