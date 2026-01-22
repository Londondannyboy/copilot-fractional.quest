// Convert hero images from JPEG to WebP for better performance
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const heroDir = './public/images/hero';

async function convertToWebP() {
  const files = await readdir(heroDir);
  const jpgFiles = files.filter(f => f.endsWith('.jpg'));

  console.log(`Converting ${jpgFiles.length} images to WebP...`);

  for (const file of jpgFiles) {
    const inputPath = join(heroDir, file);
    const outputPath = join(heroDir, file.replace('.jpg', '.webp'));

    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`  ✓ ${file} → ${file.replace('.jpg', '.webp')}`);
  }

  console.log('\nDone! WebP images created.');
}

convertToWebP().catch(console.error);
