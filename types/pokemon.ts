export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    order: number;
    is_default: boolean;
    location_area_encounters: string;
    species: {
        name: string;
        url: string;
    };
    sprites: PokemonSprites;
    types: PokemonType[];
    abilities: PokemonAbility[];
    stats: PokemonStat[];
    moves: PokemonMove[];
    held_items: HeldItem[];
}

export interface PokemonSprites {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
    other: {
        home?: {
            front_default: string | null;
            front_shiny: string | null;
        };
        showdown?: {
            back_default: string | null;
            front_default: string | null;
            front_shiny: string | null;
        };
        "official-artwork": {
            front_default: string | null;
            front_shiny?: string | null;
        };
        dream_world?: {
            front_default: string | null;
        };
    };
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonMove {
    move: {
        name: string;
        url: string;
    };
    version_group_details?: Array<{
        level_learned_at: number;
        move_learn_method: {
            name: string;
            url: string;
        };
        version_group: {
            name: string;
            url: string;
        };
    }>;
}

export interface HeldItem {
    item: {
        name: string;
        url: string;
    };
    version_details: Array<{
        rarity: number;
        version: {
            name: string;
            url: string;
        };
    }>;
}