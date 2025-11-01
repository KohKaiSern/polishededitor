export interface Base {
  id: string | null
  index: number
}

export interface Ability extends Base {
  name: string
  description: string
}

export interface Location extends Base {
  name: string
}

export interface Move extends Base {
  name: string
  description: string
  basePower: number
  type: string
  accuracy: number
  powerPoints: number
  effectChance: number
  category: string
}
