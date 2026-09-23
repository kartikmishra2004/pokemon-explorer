import { apiClient } from "@/lib/api/client";
import type { Pokemon } from "@/types/pokemon";

export async function getPokemonDetails(id: string): Promise<Pokemon> {
    return apiClient<Pokemon>(`/pokemon/${id}`);
}