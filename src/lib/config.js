import personalInfoJson from '@/config/personal.json';
import skillsJson from '@/config/skills.json';
import projectsJson from '@/config/projects.json';
import experienceJson from '@/config/experience.json';
import socialJson from '@/config/social.json';
import themesJson from '@/config/themes.json';

export function getPersonalInfo() {
  return personalInfoJson;
}

export function getSkills() {
  return skillsJson;
}

export function getProjects() {
  return projectsJson;
}

export function getFeaturedProjects() {
  const projects = getProjects();
  return projects.filter(project => project.featured);
}

export function getExperiences() {
  const experiences = experienceJson;
  return experiences.sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

export function getWorkExperiences() {
  const experiences = getExperiences();
  return experiences.filter(exp => exp.type === 'work');
}

export function getEducationExperiences() {
  const experiences = getExperiences();
  return experiences.filter(exp => exp.type === 'education');
}

export function getSocialLinks() {
  return socialJson;
}

export function getThemes() {
  return themesJson;
}

export function getThemeByName(name) {
  const { themes } = getThemes();
  return themes.find(theme => theme.name === name);
}
