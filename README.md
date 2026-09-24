# Pokemon Explorer
# Pokemon Explorer

A small Pokedex browser built with Next.js and the
[PokeAPI](https://pokeapi.co/). The list keeps the first page on the server,
then loads later pages when you move through the collection. Each Pokemon page
shows the data I found most useful while browsing: measurements, base stats,
abilities, sprites, game versions, and a short move list.

## Requirements
## Setup

- Node.js 20 or newer
- npm

## Run the app locally
Install the dependencies from the project folder:
Create a `.env` file in the project root:
Start the development server:
Open [http://localhost:3000](http://localhost:3000) in a browser.

## Notes

- Search filters the Pokemon on the current page.
- The app uses the artwork and sprite URLs returned by PokeAPI.
- The API is public, so a slow or unavailable response will affect the page.

   ```bash
   npm install
   ```

3. Create a file named `.env` in the project root and add:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://pokeapi.co/api/v2
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.