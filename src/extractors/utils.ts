import { GifEncoder } from '@skyra/gifenc';
import { createWriteStream } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import sharp from 'sharp';

//Parses a file and splits it into two files - one containing the Polished data
//and the other containing the Faithful data. It also performs some string replacements,
//and removes comments, empty lines and macro definitions.
export async function splitRead(path: string): Promise<{ polished: string[]; faithful: string[] }> {
	const files: { polished: string[]; faithful: string[] } = { polished: [], faithful: [] };
	const raw = readFile(import.meta.dirname + '/../../polishedcrystal/' + path, 'utf-8');
	const contents = (await raw)
		.split('\n')
		.map((line) =>
			line
				.replaceAll('#', 'Poké')
				.replaceAll('Poke', 'Poké')
				.replaceAll('@', '')
				.replaceAll('¯', ' ')
				.replaceAll('PSYCHIC_M', 'PSYCHIC')
				.split(';')
				.at(0)!
				.trim()
		)
		.filter((line) => line != '');
	for (let lineNo = 0; lineNo < contents.length; lineNo++) {
		//Check for PF split
		if (/if !?DEF\(FAITHFUL\)/.test(contents[lineNo])) {
			const PF = contents[lineNo].includes('!') ? 'polished' : 'faithful';
			lineNo++;
			while (!/else|endc/.test(contents[lineNo])) {
				files[PF].push(contents[lineNo]);
				lineNo++;
			}
			if (contents[lineNo] === 'else') {
				lineNo++;
				while (contents[lineNo] != 'endc') {
					files[PF === 'polished' ? 'faithful' : 'polished'].push(contents[lineNo]);
					lineNo++;
				}
			}
			continue;
		}
		if (contents[lineNo].startsWith('MACRO')) {
			while (!contents[lineNo].startsWith('ENDM')) lineNo++;
			continue;
		}
		files.polished.push(contents[lineNo]);
		files.faithful.push(contents[lineNo]);
	}
	return files;
}

export async function writeJSON(name: string, obj: object): Promise<void> {
	writeFile(import.meta.dirname + `/../data/${name}.json`, JSON.stringify(obj, null, 2));
}

//Applies a palette to a 2-bit-per-pixel PNG.
export async function applyPalette(
	inputPath: string,
	outputPath: string,
	color1: number[],
	color2: number[]
): Promise<void> {
	const data = await sharp(import.meta.dirname + '/../../polishedcrystal/' + inputPath)
		.greyscale()
		.raw()
		.toBuffer();
	const metadata = await sharp(
		import.meta.dirname + '/../../polishedcrystal/' + inputPath
	).metadata();
	const levels = Array.from(new Set(data)).sort((a, b) => a - b);
	const palette = [[0, 0, 0], color2.map((c) => c * 8), color1.map((c) => c * 8), [255, 255, 255]];
	const RGBData = Buffer.alloc(data.length * 3);
	for (let i = 0; i < data.length; i++) {
		const [r, g, b] = palette[levels.indexOf(data[i])];
		RGBData[i * 3] = r;
		RGBData[i * 3 + 1] = g;
		RGBData[i * 3 + 2] = b;
	}
	sharp(RGBData, {
		raw: { width: metadata.width!, height: metadata.height!, channels: 3 }
	})
		.png()
		.toFile(import.meta.dirname + '/../' + outputPath);
}

//Converts a PNG and an anim.asm file into a GIF.
export async function createGIF(
	spritePath: string,
	animPath: string,
	outputPath: string
): Promise<void> {
	const metadata = await sharp(import.meta.dirname + '/../' + spritePath).metadata();
	const frameHeight = metadata.width!;
	const animContent = (await splitRead(animPath)).polished;

	const encoder = new GifEncoder(frameHeight, frameHeight);
	encoder.setRepeat(0).setQuality(1);

	// Create a read stream and pipe it into a file write stream:
	const writeStream = createWriteStream(import.meta.dirname + '/../' + outputPath);
	encoder.createReadStream().pipe(writeStream);
	encoder.start();

	for (let lineNo = 0; lineNo < animContent.length; lineNo++) {
		const line = animContent[lineNo];
		if (line.startsWith('frame ')) {
			const parts = line.split(/\s+|,/);
			const frameIndex = parseInt(parts[1]);
			const duration = parseInt(parts[2]);
			const frameBuffer = await sharp(import.meta.dirname + '/../' + spritePath)
				.extract({
					left: 0,
					top: frameIndex * frameHeight,
					width: frameHeight,
					height: frameHeight
				})
				.ensureAlpha()
				.raw()
				.toBuffer();
			encoder.setDelay(duration * 17);
			encoder.addFrame(new Uint8ClampedArray(frameBuffer));
		} else if (line.startsWith('setrepeat ')) {
			const repeatCount = parseInt(line.split(/\s+/)[1]);
			const repeatStart = lineNo + 1;
			let repeatEnd = repeatStart;
			while (!animContent[repeatEnd].startsWith('dorepeat')) {
				repeatEnd++;
			}
			for (let rep = 0; rep < repeatCount; rep++) {
				for (let j = repeatStart; j < repeatEnd; j++) {
					const frameLine = animContent[j];
					const parts = frameLine.split(/\s+|,/);
					const frameIndex = parseInt(parts[1]);
					const duration = parseInt(parts[2]);
					const frameBuffer = await sharp(import.meta.dirname + '/../' + spritePath)
						.extract({
							left: 0,
							top: frameIndex * frameHeight,
							width: frameHeight,
							height: frameHeight
						})
						.ensureAlpha()
						.raw()
						.toBuffer();
					encoder.setDelay(duration * 17);
					encoder.addFrame(new Uint8ClampedArray(frameBuffer));
				}
			}
			lineNo = repeatEnd;
		}
	}
	encoder.finish();
}
