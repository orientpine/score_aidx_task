import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const imagesDir = path.resolve(projectRoot, 'public', 'images');

async function ensureDir(dirPath) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch {}
}

async function getTargets() {
    const entries = await fs.readdir(imagesDir, { withFileTypes: true });
    return entries
        .filter((e) => e.isFile())
        .map((e) => e.name)
        .filter((name) => /\.(png|jpe?g)$/i.test(name));
}

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function convertAll() {
    await ensureDir(imagesDir);

    let targets;
    try {
        targets = await getTargets();
    } catch (err) {
        console.error(`이미지 폴더를 읽는 중 오류: ${err?.message ?? err}`);
        process.exit(1);
    }

    if (targets.length === 0) {
        console.log('대상 PNG/JPG 이미지가 없습니다.');
        return;
    }

    let created = 0;
    for (const name of targets) {
        const input = path.join(imagesDir, name);
        const output = path.join(imagesDir, name.replace(/\.(png|jpe?g)$/i, '.webp'));
        try {
            if (await fileExists(output)) {
                console.log(`건너뜀: ${path.basename(output)} (이미 존재)`);
                continue;
            }
            await sharp(input).webp({ quality: 80 }).toFile(output);
            created += 1;
            console.log(`생성: ${path.basename(output)}`);
        } catch (err) {
            console.error(`실패: ${name} -> ${path.basename(output)} | ${err?.message ?? err}`);
        }
    }
    console.log(`완료: 생성 ${created}개 / 전체 ${targets.length}개`);
}

convertAll();


