import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const Project = require('../src/models/Project.js').default;
const Certificate = require('../src/models/Certificate.js').default;

const projectsData = JSON.parse(readFileSync(new URL('../src/config/projects.json', import.meta.url)));

const cloudinaryBase = 'https://res.cloudinary.com/dkxensqtm/image/upload/v177986';

const imageMap = {
  '/projects/Promt.jpg': `${cloudinaryBase}7380/Ahmed_Portfolio/kw4bbqr4cwmrow6d570w.jpg`,
  '/projects/intel.jpg': `${cloudinaryBase}7483/Ahmed_Portfolio/mcxt9u1wh10bcvce2ymr.jpg`,
  '/projects/Intell.jpg': `${cloudinaryBase}7375/Ahmed_Portfolio/f8uwsmzgqw9rxxcvl1n4.jpg`,
  '/projects/India.jpg': `${cloudinaryBase}7372/Ahmed_Portfolio/nfujosbhotbfmdn8hoo8.jpg`,
  '/projects/Error.jpg': `${cloudinaryBase}7360/Ahmed_Portfolio/slvd3kuggemzxbzexmyb.jpg`,
  '/projects/edX.jpg': `${cloudinaryBase}7481/Ahmed_Portfolio/of98eghs27zeiifo7kcn.jpg`,
  '/projects/HCL.jpg': `${cloudinaryBase}7366/Ahmed_Portfolio/xg2uy7saonlneuqukxjt.jpg`,
  '/projects/Claude_101.png': `${cloudinaryBase}7352/Ahmed_Portfolio/dxrq07jhvlsluhdqjxzl.png`,
  '/projects/Educators.png': `${cloudinaryBase}7356/Ahmed_Portfolio/tyofsorjwvxbetlbw6d4.png`,
  '/projects/Framework_&_Foundation.png': `${cloudinaryBase}7364/Ahmed_Portfolio/rkdfta68ocmobrar7mxb.png`,
  '/projects/Non_Profit.png': `${cloudinaryBase}7378/Ahmed_Portfolio/tire2arpzcncyxwphvqb.png`,
  '/projects/Students.png': `${cloudinaryBase}7450/Ahmed_Portfolio/hthuprnpevyx9rusmfch.png`,
  '/projects/Snapdeal.svg': `${cloudinaryBase}7442/Ahmed_Portfolio/nnxryl3g8rkvtd3zw2il.svg`,
  '/projects/netflix1.svg': `${cloudinaryBase}7622/Ahmed_Portfolio/f9pwrpdrpbvnswfkqdbx.svg`,
  '/projects/airbnb.png': `${cloudinaryBase}7479/Ahmed_Portfolio/cindk1hr5wh6j1pwmpng.png`,
  '/projects/zepto.png': `${cloudinaryBase}7643/Ahmed_Portfolio/jhjxvq5nhagn5jj5cbuv.png`,
};

function mapUrl(url) {
  return imageMap[url] || url;
}

const certificatesData = [
  {
    title: 'Understanding Prompt Engineering',
    type: 'Course',
    issuer: 'DataCamp',
    date: 'Nov 07, 2024',
    duration: '1 Hour',
    description: 'Successfully completed a comprehensive course on Prompt Engineering.',
    imageUrl: mapUrl('/projects/Promt.jpg'),
  },
  {
    title: 'AI For All - AI Appreciate',
    type: 'Program',
    issuer: 'Intel & Digital India',
    date: 'Jan 06, 2026',
    duration: '2 Hours',
    description: 'Participated in AI For All program by Intel and Digital India, completing the AI Appreciate stage.',
    imageUrl: mapUrl('/projects/intel.jpg'),
  },
  {
    title: 'AI For All - AI Aware',
    type: 'Program',
    issuer: 'Intel & Digital India',
    date: 'Jan 06, 2026',
    duration: '1 Hour',
    description: 'Participated in AI For All program by Intel and Digital India, completing the AI Aware stage.',
    imageUrl: mapUrl('/projects/Intell.jpg'),
  },
  {
    title: 'Yuva AI For ALL - English',
    type: 'Course',
    issuer: 'AISECT LEARN (IndiaAI)',
    date: 'Jan 21, 2026',
    duration: '1 Hour',
    description: 'Successfully completed Yuva AI For ALL English course offered by AISECT LEARN.',
    imageUrl: mapUrl('/projects/India.jpg'),
  },
  {
    title: 'Error Detection & Debugging Appreciation',
    type: 'Recognition',
    issuer: 'Nexcore Alliance',
    date: 'Oct 05, 2025',
    duration: 'Testing Phase',
    description: 'Received appreciation from Nexcore Alliance for proactive efforts in detecting and reporting multiple errors during testing phase.',
    imageUrl: mapUrl('/projects/Error.jpg'),
  },
  {
    title: 'Climate Change: Carbon Capture and Storage',
    type: 'Course',
    issuer: 'University of Edinburgh',
    date: 'Feb 27, 2025',
    duration: '2 Hours',
    description: 'Successfully completed CCSx: Climate Change: Carbon Capture and Storage course offered by EdinburghX.',
    imageUrl: mapUrl('/projects/edX.jpg'),
  },
  {
    title: 'Professional Ethics Webinar',
    type: 'Webinar',
    issuer: 'HCLTech Career Shaper',
    date: 'Sep-Nov 2024',
    duration: 'Webinar Series',
    description: 'Successfully participated in the webinar series on Professional Ethics conducted by HCLTech Career Shaper.',
    imageUrl: mapUrl('/projects/HCL.jpg'),
  },
  {
    title: 'Claude 101',
    type: 'Course',
    issuer: 'Anthropic',
    date: 'Feb - March 2026',
    duration: 'Short Course',
    description: 'Successfully completed Claude 101 course by Anthropic.',
    imageUrl: mapUrl('/projects/Claude_101.png'),
  },
  {
    title: 'AI Fluency for Educators',
    type: 'Course',
    issuer: 'Anthropic',
    date: 'Feb - March 2026',
    duration: 'Short Course',
    description: 'Completed AI Fluency for Educators by Anthropic in collaboration with UCC, Ringling College of Art + Design, HEA, and National Forum.',
    imageUrl: mapUrl('/projects/Educators.png'),
  },
  {
    title: 'AI Fluency: Framework & Foundations',
    type: 'Course',
    issuer: 'Anthropic',
    date: 'Feb - March 2026',
    duration: 'Short Course',
    description: 'Completed AI Fluency: Framework & Foundations by Anthropic.',
    imageUrl: mapUrl('/projects/Framework_&_Foundation.png'),
  },
  {
    title: 'AI Fluency for Nonprofits',
    type: 'Course',
    issuer: 'Anthropic & GivingTuesday',
    date: 'Feb - March 2026',
    duration: 'Short Course',
    description: 'Completed AI Fluency for Nonprofits by Anthropic in collaboration with GivingTuesday.',
    imageUrl: mapUrl('/projects/Non_Profit.png'),
  },
  {
    title: 'AI Fluency for Students',
    type: 'Course',
    issuer: 'Anthropic',
    date: 'Feb - March 2026',
    duration: 'Short Course',
    description: 'Completed AI Fluency for Students by Anthropic.',
    imageUrl: mapUrl('/projects/Students.png'),
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Project.deleteMany({});
    await Certificate.deleteMany({});

    const projects = await Project.insertMany(
      projectsData.map((p) => ({
        title: p.title,
        description: p.description,
        longDescription: p.longDescription || p.description,
        tags: p.tags || [],
        category: p.tags || [],
        githubUrl: p.githubUrl || '',
        figmaUrl: p.figmaUrl || '',
        liveUrl: p.liveUrl || '',
        imageUrl: mapUrl(p.imageUrl) || '',
        featured: p.featured || false,
      }))
    );
    console.log(`Seeded ${projects.length} projects`);

    const certificates = await Certificate.insertMany(certificatesData);
    console.log(`Seeded ${certificates.length} certificates`);

    await mongoose.disconnect();
    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
