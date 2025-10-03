//A collection of utility functions used throughout the project.

import pokemon from '$data/pokemon.json'

export const getPokemon = (monSpecies, PF) => pokemon[PF].find(pokemon => pokemon.name === monSpecies)
export const getForm = (monSpecies, monForm, PF) => getPokemon(monSpecies, PF).forms.find(form => form.name === monForm)



