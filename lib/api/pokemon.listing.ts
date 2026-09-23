import { apiClient } from "@/lib/api/client";
import type { PokemonListResponse } from "@/types/pokemon";

export async function getPokemonList(
    limit = 20,
    offset = 0
): Promise<PokemonListResponse> {
    return apiClient<PokemonListResponse>(
        `/pokemon?limit=${limit}&offset=${offset}`
    );
}