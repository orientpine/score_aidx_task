import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve(process.cwd(), 'public', 'images');
const inputName = process.argv[2];

if (!inputName) {
    console.error('사용법: node scripts/convert-single.mjs <파일명.png|jpg>');
    process.exit(1);
}

const inputPath = path.join(imagesDir, inputName);
const outputPath = path.join(
    imagesDir,
    inputName.replace(/\.(png|jpe?g)$/i, '.webp')
);

try {
    await fs.access(inputPath);
} catch {
    console.error(`입력 파일이 존재하지 않습니다: ${inputPath}`);
    process.exit(1);
}

try {
    await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
    console.log(`생성: ${path.basename(outputPath)}`);
} catch (err) {
    console.error(`실패: ${path.basename(inputPath)} -> ${path.basename(outputPath)} | ${err?.message ?? err}`);
    process.exit(1);
}


