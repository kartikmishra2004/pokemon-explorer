"use client";

import Image from "next/image";
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

  return (
    <div className="mx-auto mt-16 w-full max-w-[1440px] space-y-10">
      <section className="relative min-h-[270px] overflow-hidden rounded-[28px] border-2 border-[var(--foreground)] bg-[var(--panel-alt)] text-[var(--foreground)] shadow-[7px_7px_0_var(--foreground)] max-sm:shadow-[4px_4px_0_var(--foreground)]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_24px,rgba(63,72,82,0.06)_24px_26px)]" />
        <div className="relative z-10 flex h-full w-full items-start p-7 sm:p-11 lg:p-14 max-sm:pr-28">
          <div className="w-full max-w-[620px]">
            <h1 className="my-0 text-[3.2rem] font-black leading-[0.82] tracking-[-0.04em] text-[var(--blue)] sm:text-7xl lg:text-[6.6rem] max-sm:max-w-[170px] max-sm:text-[3rem]">
              Find Pokemons
            </h1>
            <p className="mt-3 m-0 max-w-[390px] text-base leading-relaxed text-[var(--red)] max-sm:max-w-[180px] max-sm:text-[0.82rem] max-sm:leading-relaxed">
              Browse the Pokemonexplorer.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-[52px] right-[9%] w-[270px] max-sm:-bottom-[26px] max-sm:right-[4%] max-sm:w-[160px]">
          <Image src="/images/pokemon-icon.svg" alt="" width={270} height={270} />
        </div>
      </section>

      <div className="flex items-end justify-between gap-8 border-b border-[var(--border)] px-1 pb-5 max-sm:flex-col max-sm:items-stretch max-sm:gap-4">
        <div>
          <p className="m-0 text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-[var(--red)]">
            Browse Pokemon
          </p>
          <p className="mt-1 text-[0.85rem] text-[var(--ink-soft)]">
            {filteredItems.length} of {items.length} shown
          </p>
        </div>
        <label className="flex min-h-[48px] w-full max-w-[390px] items-center gap-2.5 rounded-full border border-[var(--foreground)] bg-[var(--panel)] px-4 shadow-[3px_3px_0_var(--yellow)] focus-within:border-[var(--red)] focus-within:shadow-[3px_3px_0_var(--red)] max-sm:max-w-none">
          <span className="rotate-[-45deg] text-xl font-black text-[var(--red)]" aria-hidden="true">/</span>
          <span className="sr-only">Search Pokemon by name</span>
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setOffset(0);
            }}
            placeholder="Search by name..."
            className="min-w-0 flex-1 border-0 bg-transparent text-[0.95rem] text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
          />
          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="border-0 bg-transparent font-extrabold text-[var(--muted)]"
              aria-label="Clear search"
            >
              x
            </button>
          ) : null}
        </label>
      </div>

      {loading ? (
        <div className="flex min-h-40 items-center justify-center" role="status" aria-label="Loading Pokemon">
          <Image
            src="/images/pokemon-icon.svg"
            alt=""
            width={48}
            height={48}
            className="animate-spin grayscale opacity-60"
          />
        </div>
      ) : filteredItems.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-7 sm:gap-y-12 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-9">
          {filteredItems.map((pokemon) => {
            const pokemonId = pokemon.url.split("/").filter(Boolean).pop() ?? "";
            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`;

            return (
              <article key={pokemon.name} className="group min-w-0">
                <div className="flex aspect-square items-center justify-center bg-[var(--panel-alt)] p-3 transition-colors group-hover:bg-[var(--border)] sm:p-5">
                  <Image
                    src={sprite}
                    alt=""
                    width={150}
                    height={150}
                    className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-xs font-bold tracking-wide text-[var(--muted)]">#{pokemonId.padStart(4, "0")}</p>
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
                  <h2 className="m-0 min-w-0 break-words text-lg font-black capitalize text-[var(--foreground)] sm:text-2xl">
                    {pokemon.name}
                  </h2>
                  <Link
                    href={`/pokemon/${pokemonId}`}
                    aria-label={`View ${pokemon.name} details`}
                    className="shrink-0 text-xs font-extrabold uppercase text-[var(--red)] no-underline hover:text-[var(--blue)] sm:ml-auto"
                  >
                    View -&gt;
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="rounded-lg border-2 border-dashed border-[var(--border)] p-7 text-center text-[var(--muted)]">
          {search.trim()
            ? `No Pokemon found for "${search}" on this page.`
            : "No Pokemon found."}
        </p>
      )}

      <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] pt-5">
        <button
          onClick={() => setOffset((current) => Math.max(0, current - PAGE_SIZE))}
          disabled={offset === 0 || loading}
          className="min-w-[110px] rounded-sm border-2 border-[var(--foreground)] bg-[var(--panel)] px-3.5 py-2.5 text-xs font-extrabold text-[var(--foreground)] transition-colors hover:bg-[var(--yellow)] disabled:cursor-not-allowed disabled:opacity-35"
        >
          &lt;- Previous
        </button>
        <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-[var(--blue)] font-black text-[var(--panel)]">
          {String(page).padStart(2, "0")}
        </span>
        <button
          onClick={() => setOffset((current) => current + PAGE_SIZE)}
          disabled={offset + PAGE_SIZE >= count || loading}
          className="min-w-[110px] rounded-[14px] border-2 border-[var(--foreground)] bg-[var(--panel)] px-4 py-2.5 text-xs font-extrabold text-[var(--foreground)] transition-colors hover:bg-[var(--yellow)] disabled:cursor-not-allowed disabled:opacity-35"
        >
          Next -&gt;
        </button>
      </div>
    </div>
  );
}
