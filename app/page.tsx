import { PokemonList } from "@/components/pokemon-list";
import { getPokemonList } from "@/lib/api/pokemon.listing";

const PAGE_SIZE = 24;


export default async function Home() {
  const response = await getPokemonList(PAGE_SIZE, 0);

  return (
    <PokemonList
      initialItems={response.results}
      initialCount={response.count}
    />
  );
}
