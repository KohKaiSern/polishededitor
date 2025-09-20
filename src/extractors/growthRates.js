import { readFileSync } from 'fs';
import reduce from './lib/reduce.js';
import paths from './lib/paths.js';

let growthRates = {};

const extractGrowthRates = (data) => {
	data = data.split('\n');
	data = data.map((line) => line.trim());
	data = data.filter((line) => line.includes('growth_rate '));
	for (let growthRate of data) {
		growthRates[reduce(growthRate.split(';').at(1).trim())] = growthRate
			.split(';')
			.at(0)
			.slice(12, -1)
			.split(',')
			.map((x) => parseInt(x.trim()));
	}
};

//#1: Growth Rates
let raw = readFileSync(paths.growthRates, 'utf-8');
extractGrowthRates(raw);

export default growthRates;
