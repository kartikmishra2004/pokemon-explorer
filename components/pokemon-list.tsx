"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPokemonList } from "@/lib/api/pokemon.listing";
import type { PokemonListItem } from "@/types/pokemon";

const PAGE_SIZE = 24;

type PokemonListProps = {
  initialItems: PokemonListItem[];
  initialCount: number;
};

export function PokemonList({ initialItems, initialCount }: PokemonListProps) {
  const [items, setItems] = useState<PokemonListItem[]>(initialItems);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(initialCount);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (offset === 0) {
      return;
    }

    const loadPokemon = async () => {
      setLoading(true);

      try {
        const response = await getPokemonList(PAGE_SIZE, offset);
        setItems(response.results);
        setCount(response.count);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [offset]);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = items.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(normalizedSearch)
  );
  const page = Math.floor(offset / PAGE_SIZE) + 1;
  const totalPages = Math.ceil(count / PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Pokemon</h1>
        <label className="w-full sm:max-w-sm">
          <span className="sr-only">Search Pokemon by name</span>
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setOffset(0);
            }}
            placeholder="Search by name..."
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--panel-alt)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--foreground)]"
          />
        </label>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading...</p>
      ) : filteredItems.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredItems.map((pokemon) => {
            const pokemonId = pokemon.url.split("/").filter(Boolean).pop() ?? "";

            return (
              <div
                key={pokemon.name}
                className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-base font-semibold capitalize text-[var(--foreground)]">{pokemon.name}</p>
                <Link
                  href={`/pokemon/${pokemonId}`}
                  className="inline-flex rounded-md bg-[var(--foreground)] px-3 py-2 text-sm font-medium text-[var(--background)] transition hover:opacity-90"
                >
                  View details
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">
          {search.trim()
            ? `No Pokemon found for "${search}" on this page.`
            : "No Pokemon found."}
        </p>
      )}

      <div className="flex items-center justify-between pt-2 text-sm text-[var(--foreground)]">
        <button
          onClick={() => setOffset((current) => Math.max(0, current - PAGE_SIZE))}
          disabled={offset === 0 || loading}
          className="rounded-md border border-[var(--border)] px-3 py-1 disabled:opacity-40"
        >
          Previous
        </button>
        <span>
          Page {page} / {Math.max(totalPages, 1)}
        </span>
        <button
          onClick={() => setOffset((current) => current + PAGE_SIZE)}
          disabled={offset + PAGE_SIZE >= count || loading}
          className="rounded-md border border-[var(--border)] px-3 py-1 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
