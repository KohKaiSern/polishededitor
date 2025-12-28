import { extractIDs } from './common';
import { splitRead } from './utils';
import type { GrowthRate } from './types';

function extractCFs(growthRates: GrowthRate[], CFS: string[]): GrowthRate[] {
  let index = 0;
  for (let lineNo = 0; lineNo < CFS.length; lineNo++) {
    if (!CFS[lineNo].startsWith('growth_rate')) continue;
    growthRates.find((g) => g.index === index)!.coefficients = CFS[lineNo]
      .match(/-?\d+/g)!
      .slice(0, 5)
      .map(Number);
    index++;
  }
  return growthRates;
}

const growthRates: {
  polished: GrowthRate[];
  faithful: GrowthRate[];
} = {
  polished: [],
  faithful: []
};

const NULL_GROWTHRATE: GrowthRate = {
  id: null,
  index: -1,
  coefficients: []
};

const files = await Promise.all([
  'constants/pokemon_data_constants.asm',
  'data/growth_rates.asm',
].map(path => splitRead(path)))

for (const PF of ['polished', 'faithful'] as const) {
  growthRates[PF] = extractIDs(
    growthRates[PF],
    files[0][PF],
    NULL_GROWTHRATE,
    'NUM_HATCH_RATES',
    'NUM_GROWTH_RATES'
  );
  growthRates[PF] = extractCFs(growthRates[PF], files[1][PF]);
}

export default growthRates;
