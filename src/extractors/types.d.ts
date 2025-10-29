export interface Base {
  id: string;
  index: string;
  name: string;
}

export interface Items extends Base {
  category: string;
}
