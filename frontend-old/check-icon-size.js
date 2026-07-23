import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sizeOf from 'image-size';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iconPath = join(__dirname, 'public', 'icons', 'icon-128x128.png');

try {
  const dimensions = sizeOf(iconPath);
  console.log(`Icon dimensions: ${dimensions.width}x${dimensions.height}`);
  
  if (dimensions.width !== 128 || dimensions.height !== 128) {
    console.error('Error: Icon dimensions are not 128x128 pixels');
    process.exit(1);
  } else {
    console.log('Icon dimensions are correct');
    process.exit(0);
  }
} catch (error) {
  console.error('Error checking icon dimensions:', error.message);
  process.exit(1);
}
