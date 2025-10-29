declare module 'gifenc' {
  export function GIFEncoder(): any;
  export function quantize(data: Uint8Array, maxColors: number): any;
  export function applyPalette(data: Uint8Array, palette: any): Uint8Array;
}
