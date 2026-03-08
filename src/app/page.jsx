import { HeroSection } from '@/Components/sections/hero-section';
import { AboutSection } from '@/Components/sections/about-section';
import { ProjectsSection } from '@/Components/sections/projects-section';
import { ExperienceSection } from '@/Components/sections/experience-section';
import { AchievementsSection } from '@/Components/sections/achievements-section';
import { ContactSection } from '@/Components/sections/contact-section';

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
