export interface Base {
  id: string | null;
  index: number;
}

export interface Ability extends Base {
  name: string
  description: string
}
