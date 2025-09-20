const root = '../../polishedcrystal';

export const paths = {
	root,
	abilities: {
		names: `${root}/data/abilities/names.asm`,
		descriptions: `${root}/data/abilities/descriptions.asm`
	},
	addresses: `${root}-3.1.1.sym`,
	growthRates: `${root}/data/growth_rates.asm`,
	items: {
		names: `${root}/data/items/names.asm`,
		descriptions: `${root}/data/items/descriptions.asm`,
		attributes: `${root}/data/items/attributes.asm`
	},
	moves: {
		names: `${root}/data/moves/names.asm`,
		moves: `${root}/data/moves/moves.asm`
	},
	pokemon: {
		names: `${root}/data/pokemon/names.asm`,
		forms: `${root}/constants/pokemon_constants.asm`,
		mons: `${root}/data/pokemon/base_stats/`
	},
	versions: {
		game: `${root}/../`,
		save: `${root}/constants/misc_constants.asm`
	}
};

export default paths;
