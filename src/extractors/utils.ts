import sharp from 'sharp';
import { GIFEncoder, quantize, applyPalette } from 'gifenc';
import { readFileSync, writeFileSync } from 'fs';

//This function acts as a pre-processor to all the used files.
//Its main job is to split a file into two versions, one with
//the Polished information and one with the Faithful information.
//In addition, it performs some global string replacements and removals.
export function splitRead(path: string): { polished: string[]; faithful: string[] } {
  const files: { polished: string[]; faithful: string[] } = { polished: [], faithful: [] };
  const contents = readFileSync(import.meta.dirname + '/../../polishedcrystal/' + path, 'utf-8')
    .split('\n')
    .map((line) =>
      line
        .replaceAll('#', 'Poké')
        .replaceAll('Poke', 'Poké')
        .replaceAll('@', '')
        .replaceAll('¯', ' ')
        .replaceAll('PSYCHIC_M', 'PSYCHIC')
        .trim()
    );
  for (let lineNo = 0; lineNo < contents.length; lineNo++) {
    //Upon encountering a faithful check,
    if (contents[lineNo].includes('if DEF(FAITHFUL)')) {
      lineNo++;
      //Collect all the faithful data.
      while (contents[lineNo] != 'else') {
        files.faithful.push(contents[lineNo]);
        lineNo++;
      }
      lineNo++;
      //Then, collect all the polished data.
      while (contents[lineNo] != 'endc') {
        files.polished.push(contents[lineNo]);
        lineNo++;
      }
    }
    //Normal lines are added to both arrays.
    else {
      files.polished.push(contents[lineNo]);
      files.faithful.push(contents[lineNo]);
    }
  }
  return files;
}

export function capitalize(str: string): string {
  return str.at(0)!.toUpperCase() + str.slice(1).toLowerCase();
}

export function writeJSON(name: string, obj: object): void {
  writeFileSync(import.meta.dirname + '/../../data/' + name + '.json', JSON.stringify(obj));
}

export async function colorize(
  inputPath: string,
  color1: [number, number, number],
  color2: [number, number, number],
  outputPath: string
): Promise<void> {
  const data = await sharp(inputPath).greyscale().raw().toBuffer();
  const metadata = await sharp(inputPath).metadata();

  const levels = Array.from(new Set(data)).sort((a, b) => a - b);

  const palette = [
    [0, 0, 0],
    color2.map(c => c * 8),
    color1.map(c => c * 8),
    [255, 255, 255]
  ];

  const RGBData = Buffer.alloc(data.length * 3);
  for (let i = 0; i < data.length; i++) {
    const [r, g, b] = palette[levels.indexOf(data[i])];
    RGBData[i * 3] = r;
    RGBData[i * 3 + 1] = g;
    RGBData[i * 3 + 2] = b;
  }

  sharp(RGBData, {
    raw: { width: metadata.width!, height: metadata.height!, channels: 3 }
  }).png().toFile(outputPath);
}


export async function createGIF(
  inputPath: string,
  outputPath: string,
  outputName: string,
  animPath: string
): Promise<void> {
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;
  const numFrames = metadata.height / width;

  const frames: Buffer[] = [];
  for (let i = 0; i < numFrames; i++) {
    frames.push(await sharp(inputPath)
      .extract({ left: 0, top: i * width, width: width, height: width })
      .raw()
      .toBuffer());
  }

  const lines = readFileSync(animPath, 'utf-8').split('\n').map(l => l.trim()).filter(l => l);
  const gif = GIFEncoder();

  const processFrameLine = (line: string) => {
    const [frameNum, duration] = line.split(',').map(s => s.trim().split(' ').pop()!);
    const delay = Math.round(parseFloat(duration) * 16.742 / 10);
    const palette = quantize(frames[parseInt(frameNum)], 256);
    const index = applyPalette(frames[parseInt(frameNum)], palette);
    gif.writeFrame(index, width, width, { palette, delay });
  };

  let i = 0;
  while (i < lines.length) {
    if (lines[i].startsWith('setrepeat')) {
      const repeatCount = parseInt(lines[i].split(' ')[1]);
      const start = i + 1;
      const end = lines.findIndex((l, idx) => idx > i && l.startsWith('dorepeat'));

      for (let r = 0; r < repeatCount; r++) {
        for (let j = start; j < end; j++) processFrameLine(lines[j]);
      }
      i = end + 1;
    } else if (lines[i].startsWith('frame')) {
      processFrameLine(lines[i]);
      i++;
    } else {
      i++;
    }
  }
  gif.writeFrame(new Uint8Array(width * width), width, width, { delay: 50, transparent: true });
  gif.finish();
  writeFileSync(`${outputPath}/${outputName}.gif`, Buffer.from(gif.bytes()));
}
