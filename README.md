# Polished Editor

Polished Editor is a save editor for the Pokémon Polished Crystal ROM Hack by Sylvie (Rangi42). It allows users to upload save files, edit PC Boxed Pokémon & Bag Contents, and download the edited save. In addition, the save editor auto-updates by extracting relevant game data from the game files.

## Features

- View all 20 Boxes of Pokémon
- Edit a Pokémon's Species, Form, Ability, Held Item, Level, Moveset, Determinant Values, Effort Values, Nature, Gender, Shininess & Happiness
- View the Items, Medicine, Balls and Berries slot of the player's Bag
- Add, delete and modify items in these four slots

## Tech Stack

- Svelte5 (Frontend)
- SvelteKit (Meta-Framework)
- Tailwind CSS v4 (Utility-First Styling)
- Flowbite-Svelte (UI Components)

## Project Structure

`src/extractors`

- Extracts data from game files and outputs JSON files

`src/lib/data`

- Said JSON files

`src/lib/components`

- Contains the frontend of the project
- `parsers` contains the functions that convert the raw save files into formatted data and vice versa

## License

This project is licensed under the MIT License.

## Acknowledgements

- Pokémon Polished Crystal by Sylvie (Rangi42) and contributors
- Cammy for setting the technical groundwork in data extraction, and providing the sprite GIFs
- Emi for setting the technical groundwork in NewBox parsing and save editing
- FIQ for developing NewBox and writing the relevant documentation for its structure, and for coming up with the idea for this project
- Darsh for helping me with the NewBox extraction algorithm
- Svelte, Flowbite-Svelte and Tailwind CSS
