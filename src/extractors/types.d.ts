export interface Base {
	id: string;
	index: number;
	name: string;
}

export interface Item extends Base {
	description: string;
	category: string;
	spritePath: string;
}
