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

export interface Ability extends Base {
  description: string;
}

export interface Form extends Base {
  bsts: number[];
  abilities: string[]
}

export interface Species extends Base {
  forms: Form[]
}
