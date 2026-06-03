const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  longDescription: String,
  tags: [String],
  category: [String],
  githubUrl: String,
  figmaUrl: String,
  liveUrl: String,
  imageUrl: String,
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const CertificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: String,
  issuer: String,
  description: String,
  date: String,
  duration: String,
  imageUrl: String,
  certificateUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);

const projectsData = [
  {
    title: "Airbnb Clone",
    description: "A complete front-end clone of the Airbnb website built using pure HTML and Tailwind CSS.",
    longDescription: "A complete front-end clone of the Airbnb website built using pure HTML and Tailwind CSS. This project showcases modern web design principles, responsive layouts, and attention to detail in recreating the Airbnb user interface. The design is fully responsive and optimized for all screen sizes, demonstrating proficiency in HTML structure and Tailwind CSS utility classes. Key features include pixel-perfect recreation of Airbnb's homepage, fully responsive design for all devices, modern UI components and layouts, clean and semantic HTML structure, utility-first CSS with Tailwind, and optimized for performance and accessibility.",
    tags: ["HTML", "Tailwind CSS"],
    imageUrl: "/projects/airbnb.png",
    githubUrl: "https://github.com/aaddy307/AirBNB_Clone.git",
    featured: true,
  },
  {
    title: "Netflix Clone",
    description: "A complete design-to-code Netflix clone project that showcases the full development workflow.",
    longDescription: "A complete design-to-code Netflix clone project that showcases the full development workflow. Starting with high-fidelity UI/UX design in Figma, the project was then brought to life using pure HTML and CSS. This project demonstrates expertise in both design thinking and front-end development, featuring Netflix's signature dark theme, card-based layouts, hover effects, and responsive design patterns. The implementation includes custom CSS animations, grid layouts, and attention to detail in recreating the streaming platform's user experience.",
    tags: ["HTML", "CSS"],
    imageUrl: "/projects/netflix1.svg",
    githubUrl: "https://github.com/aaddy307/Netflix_Clone.git",
    figmaUrl: "https://www.figma.com/design/wWvb2jAu6Ff3GSgr4oKLhL/NETFLIX?node-id=0-1&t=NwszoJ2SVE1V6bUQ-1",
    featured: true,
  },
  {
    title: "Zepto App Clone",
    description: "A complete Figma-based clone of the Zepto app, focusing on replicating the original app's user interface.",
    longDescription: "A complete Figma-based clone of the Zepto app, focusing on replicating the original app's user interface, interactions, and navigation flow. The project emphasizes attention to detail, consistency, and UI best practices. Features include high-fidelity UI recreation, interactive prototype for app flow, consistent design patterns and components, focus on user-friendly navigation, and attention to detail in spacing, typography, and colors.",
    tags: ["Figma"],
    imageUrl: "/projects/zepto.png",
    figmaUrl: "https://www.figma.com/design/TDkwpqsgNs8ETJtOVkqE8P/ZEPTO?node-id=0-1&t=xKNjXS9gzZy6GYvD-1",
    featured: true,
  },
  {
    title: "Snapdeal Website Clone",
    description: "A Figma-based clone of the Snapdeal website, replicating its homepage, product listing, and category navigation.",
    longDescription: "This project is a Figma-based clone of the Snapdeal website, replicating its homepage, product listing, and category navigation. The design emphasizes clean layouts, intuitive navigation, and interactive elements to showcase a realistic web shopping experience. Features include high-fidelity recreation of Snapdeal website pages, interactive prototype to demonstrate user flow, consistent visual components and spacing, focus on user-friendly browsing and shopping experience, responsive web design considerations, and attention to typography, colors, and layout.",
    tags: ["Figma"],
    imageUrl: "/projects/Snapdeal.svg",
    figmaUrl: "https://www.figma.com/design/IA4CXbGEoriGk5aQ889aGH/SNAPDEAL?node-id=0-1&t=03XV5VgBAnptxk2q-1",
    featured: true,
  },
  {
    title: "Travel Website Design",
    description: "A complete Figma-based travel website design emphasizing modern aesthetics and user-friendly navigation. (Client Work - NDA)",
    longDescription: "A complete Figma-based travel website design, emphasizing modern aesthetics, easy-to-use navigation, and engaging user interactions. The design includes destination pages, booking interface, and responsive layouts suitable for both desktop and mobile. Note: This is real client work, and due to confidentiality agreements, I don't have permission to show the full design publicly. Features include high-fidelity UI screens for a travel website, interactive prototype showcasing user flow, responsive design for desktop and mobile, clean and modern visual aesthetics, consistent design system and components, and focus on user-friendly booking and exploration experience.",
    tags: ["Figma", "Client Work"],
    imageUrl: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    featured: true,
  },
];

const certificatesData = [
  {
    title: "Prompt Engineering",
    type: "Course",
    issuer: "DeepLearning.AI",
    description: "Learned advanced prompt engineering techniques for effectively communicating with large language models.",
    date: "2024",
    duration: "1 Hour",
    imageUrl: "/projects/Promt.jpg",
  },
  {
    title: "Claude 101",
    type: "Course",
    issuer: "Anthropic",
    description: "Completed training on Claude AI assistant capabilities, safety, and effective usage patterns.",
    date: "2024",
    duration: "1 Hour",
    imageUrl: "/projects/Claude_101.png",
  },
  {
    title: "Intel AI Fundamentals",
    type: "Course",
    issuer: "Intel",
    description: "Completed AI fundamentals program covering machine learning basics, neural networks, and Intel AI tools.",
    date: "2024",
    duration: "8 Hours",
    imageUrl: "/projects/intel.jpg",
  },
  {
    title: "Web Development with edX",
    type: "Course",
    issuer: "edX",
    description: "Completed web development course covering HTML, CSS, JavaScript, and modern web technologies.",
    date: "2024",
    duration: "12 Hours",
    imageUrl: "/projects/edX.jpg",
  },
  {
    title: "Student Excellence Recognition",
    type: "Recognition",
    issuer: "Educational Institution",
    description: "Recognized for outstanding academic performance and contribution to student community.",
    date: "2024",
    duration: "",
    imageUrl: "/projects/Students.png",
  },
  {
    title: "Non-Profit Organization Workshop",
    type: "Program",
    issuer: "Non-Profit Organization",
    description: "Participated in a workshop focusing on community development and social impact initiatives.",
    date: "2024",
    duration: "4 Hours",
    imageUrl: "/projects/Non_Profit.png",
  },
  {
    title: "Framework & Foundation Program",
    type: "Program",
    issuer: "Educational Platform",
    description: "Completed a comprehensive program covering foundational concepts in technology and development frameworks.",
    date: "2024",
    duration: "10 Hours",
    imageUrl: "/projects/Framework_&_Foundation.png",
  },
  {
    title: "Error Handling Mastery",
    type: "Course",
    issuer: "Development Platform",
    description: "Mastered error handling techniques, debugging strategies, and best practices for robust application development.",
    date: "2024",
    duration: "3 Hours",
    imageUrl: "/projects/Error.jpg",
  },
  {
    title: "Educators Program",
    type: "Program",
    issuer: "Educational Initiative",
    description: "Participated in an educators program focused on modern teaching methodologies and educational technology.",
    date: "2024",
    duration: "6 Hours",
    imageUrl: "/projects/Educators.png",
  },
  {
    title: "India Skills Certification",
    type: "Recognition",
    issuer: "Government of India",
    description: "Recognized for skills development and competency in technology-related fields.",
    date: "2024",
    duration: "",
    imageUrl: "/projects/India.jpg",
  },
  {
    title: "HCL Technologies Program",
    type: "Program",
    issuer: "HCL Technologies",
    description: "Completed a technology program covering industry-standard practices and emerging technologies.",
    date: "2024",
    duration: "8 Hours",
    imageUrl: "/projects/HCL.jpg",
  },
  {
    title: "Intell Certification",
    type: "Course",
    issuer: "Intell",
    description: "Completed certification in AI and machine learning concepts with practical implementation.",
    date: "2024",
    duration: "5 Hours",
    imageUrl: "/projects/Intell.jpg",
  },
];

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Seed projects
    const existingProjects = await Project.countDocuments();
    if (existingProjects > 0) {
      console.log(`Found ${existingProjects} existing projects. Clearing...`);
      await Project.deleteMany({});
    }
    const insertedProjects = await Project.insertMany(projectsData);
    console.log(`✅ Seeded ${insertedProjects.length} projects`);

    // Seed certificates
    const existingCertificates = await Certificate.countDocuments();
    if (existingCertificates > 0) {
      console.log(`Found ${existingCertificates} existing certificates. Clearing...`);
      await Certificate.deleteMany({});
    }
    const insertedCertificates = await Certificate.insertMany(certificatesData);
    console.log(`✅ Seeded ${insertedCertificates.length} certificates`);

    console.log('\n✨ Database seeding complete!');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
