import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sharp from 'sharp';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceImage = join(__dirname, '../public/icons/logo.png'); // Your logo file
const outputDir = join(__dirname, '../public/icons');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  try {
    // Create output directory if it doesn't exist
    await mkdir(outputDir, { recursive: true });

    // Generate each icon size
    await Promise.all(
      sizes.map((size) =>
        sharp(sourceImage)
          .resize(size, size)
          .toFile(join(outputDir, `icon-${size}x${size}.png`))
          .then(() => console.log(`✅ Generated icon-${size}x${size}.png`))
          .catch(err => console.error(`❌ Error generating icon-${size}x${size}.png:`, err.message))
      )
    );

    console.log('\n🎉 All icons generated successfully!');
    console.log('Icons are saved in:', outputDir);
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    console.log('\n💡 Make sure you have placed your logo.png file in the public folder');
    process.exit(1);
  }
}

// Run the function
generateIcons().catch(console.error);
