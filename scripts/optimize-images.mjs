import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

async function run() {
  const input = 'src/assets/profile.png';
  const outWebp = 'src/assets/profile.webp';
  const outWebpMobile = 'src/assets/profile-mobile.webp';
  
  const originalStats = fs.statSync(input);
  console.log(`Original size: ${(originalStats.size / 1024).toFixed(1)} KB`);

  // Desktop/high-res version (max width 960)
  await sharp(input)
    .resize(960, 1280, { fit: 'cover', position: 'top' })
    .webp({ quality: 80, effort: 6 })
    .toFile(outWebp);

  const desktopStats = fs.statSync(outWebp);
  console.log(`Desktop WebP size: ${(desktopStats.size / 1024).toFixed(1)} KB`);

  // Mobile version (max width 640)
  await sharp(input)
    .resize(640, 853, { fit: 'cover', position: 'top' })
    .webp({ quality: 78, effort: 6 })
    .toFile(outWebpMobile);

  const mobileStats = fs.statSync(outWebpMobile);
  console.log(`Mobile WebP size: ${(mobileStats.size / 1024).toFixed(1)} KB`);
}

run().catch(console.error);
