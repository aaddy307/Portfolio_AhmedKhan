import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagesDir = path.resolve(__dirname, '../public/projects');
const results = [];

async function uploadAll() {
  const files = fs.readdirSync(imagesDir);

  console.log(`Found ${files.length} images in public/projects/\n`);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'].includes(ext)) continue;

    try {
      console.log(`Uploading: ${file}...`);
      const result = await cloudinary.v2.uploader.upload(filePath, {
        folder: 'Ahmed_Portfolio',
        resource_type: 'image',
      });

      results.push({ local: file, cloudinary: result.secure_url });
      console.log(`  ✓ Uploaded: ${result.secure_url}`);
    } catch (error) {
      console.error(`  ✗ Failed: ${file} - ${error.message}`);
    }
  }

  console.log('\n=== ALL UPLOADS COMPLETE ===\n');

  console.log('Image URL Mapping:');
  console.log(JSON.stringify(results, null, 2));

  console.log('\nReplace these in your code:\n');
  results.forEach((r) => {
    console.log(`  "/projects/${r.local}" → "${r.cloudinary}"`);
  });
}

uploadAll().catch(console.error);
