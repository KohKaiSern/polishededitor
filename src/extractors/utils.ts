import { readFileSync, writeFileSync } from "fs";
//This function acts as a pre-processor for all the files used in the extraction
//process. It replaces some important values, splits every file into individual lines,
//and most importantly, produces a Polished & Faithful version of each file.
//Every file must go through this pre-processor, with the exception of:
//1. Symbols
//2. [SAVE VERSION FILE]
//3. [GAME VERSION FILE]
//4. Charmap
//The data here is guaranteed to be equivalent between the PF split.
export function splitRead(path: string): { polished: string[]; faithful: string[]; } {
  const files: { polished: string[]; faithful: string[] } = { polished: [], faithful: [] }
  const contents = readFileSync(import.meta.dirname + '/../../polishedcrystal/' + path, 'utf-8')
    .split('\n')
    .map((line) =>
      line
        .replaceAll('#', 'Poké')
        .replaceAll('Poke', 'Poké')
        .replaceAll('@', '')
        .replaceAll('¯', ' ')
        .trim()
    );
  for (let lineNo = 0; lineNo < contents.length; lineNo++) {
    //Check for PF split
    if (/if !?DEF\(FAITHFUL\)/.test(contents[lineNo])) {
      const PF = contents[lineNo].includes('!') ? 'polished' : 'faithful'
      lineNo++;
      while (!/else|endc/.test(contents[lineNo])) {
        files[PF].push(contents[lineNo])
        lineNo++
      }
      if (contents[lineNo] === 'else') {
        while (contents[lineNo] != 'endc') {
          files[PF === 'polished' ? 'faithful' : 'polished'].push(contents[lineNo])
          lineNo++
        }
      }
      continue
    }
    files.polished.push(contents[lineNo])
    files.faithful.push(contents[lineNo])
  }
  return files
}

//This function just writes the exported data into JSON files at a centralized locaiton.
export function writeJSON(name: string, obj: object): void {
  writeFileSync(import.meta.dirname + '/../data/' + name + '.json', JSON.stringify(obj));
}
