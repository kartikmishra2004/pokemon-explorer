import { apiClient } from "@/lib/api/client";
import type { PokemonEncounter } from "@/types/pokemon";

export async function getPokemonEncounters(id: string): Promise<PokemonEncounter[]> {
  return apiClient<PokemonEncounter[]>(`/pokemon/${id}/encounters`);
}
