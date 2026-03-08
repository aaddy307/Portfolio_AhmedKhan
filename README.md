# NextGen Portfolio Website

A modern, optimized portfolio website built with Next.js, JavaScript, Tailwind CSS, and Framer Motion.

## Features

- Fully responsive design for all devices
- Animated particle background
- Smooth animations with Framer Motion
- Dark/light mode with theme persistence
- Configuration-driven content (JSON files)
- Optimized performance
- Clean, minimal codebase

## Tech Stack

- **Framework**: Next.js 13.5 (App Router)
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Particles**: react-tsparticles

## Project Structure

```
src/
├── app/                  # Next.js pages
├── Components/           # React components
│   ├── sections/         # Page sections
│   ├── ui/               # UI components (Button, Card, Badge, Dialog, Tabs, Progress, Toast)
│   └── icons/            # Custom icons
├── config/               # JSON configuration files
│   ├── personal.json     # Personal info
│   ├── skills.json       # Skills with levels
│   ├── projects.json     # Portfolio projects
│   ├── experience.json   # Work & education
│   ├── social.json       # Social media links
│   └── themes.json       # Theme & particle config
├── lib/                  # Utilities
└── hooks/                # React hooks
```

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Customization

All content is managed through JSON files in `src/config/`:

### Personal Info (`personal.json`)
```json
{
  "name": "Your Name",
  "title": "Your Title",
  "bio": "Your bio",
  "email": "your@email.com",
  "location": "Your City"
}
```

### Skills (`skills.json`)
```json
[
  {
    "name": "React.js",
    "level": 90,
    "category": "Frontend Development",
    "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  }
]
```

### Projects (`projects.json`)
```json
[
  {
    "id": "project-1",
    "title": "Project Name",
    "description": "Description",
    "tags": ["Web Development"],
    "imageUrl": "/image.jpg",
    "githubUrl": "https://github.com/...",
    "featured": true
  }
]
```

### Experience (`experience.json`)
```json
[
  {
    "id": "exp-1",
    "company": "Company",
    "position": "Position",
    "duration": "2021 - Present",
    "startDate": "2021-01-01",
    "description": "Description",
    "technologies": ["Tech1", "Tech2"],
    "type": "work"
  }
]
```

### Social Links (`social.json`)
```json
[
  {
    "platform": "GitHub",
    "url": "https://github.com/username",
    "icon": "Github"
  }
]
```

## Build for Production

```bash
npm run build
npm start
```

## Deployment

Deploy to Vercel, Netlify, or any Node.js hosting platform.

For Vercel:
```bash
vercel
```

## Performance Optimizations

- Removed 38+ unused UI components
- Removed 20+ unused dependencies
- Optimized particle count (20 particles)
- Reduced loading animation time (800ms)
- Lazy loading for images
- Minimal CSS and JavaScript bundles

## License

MIT

