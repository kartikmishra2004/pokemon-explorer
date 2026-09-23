"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPokemonList } from "@/lib/api/pokemon.listing";
import type { PokemonListItem } from "@/types/pokemon";

const PAGE_SIZE = 24;
const cardStyles = [
  {
    border: "border-t-[var(--yellow)]",
    sprite: "bg-[linear-gradient(135deg,var(--yellow)_0_12%,transparent_12%_88%,var(--yellow)_88%)]",
  },
  {
    border: "border-t-[#8ed9c4]",
    sprite: "bg-[linear-gradient(135deg,#8ed9c4_0_12%,transparent_12%_88%,#8ed9c4_88%)]",
  },
  {
    border: "border-t-[#9dbcf4]",
    sprite: "bg-[linear-gradient(135deg,#9dbcf4_0_12%,transparent_12%_88%,#9dbcf4_88%)]",
  },
  {
    border: "border-t-[#f5a4b4]",
    sprite: "bg-[linear-gradient(135deg,#f5a4b4_0_12%,transparent_12%_88%,#f5a4b4_88%)]",
  },
];

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
    <div className="mx-auto w-full max-w-[1440px] space-y-8">
      <section className="relative min-h-[270px] overflow-hidden rounded-3xl border-2 border-[var(--foreground)] bg-[var(--red)] text-[#fffdf8] shadow-[8px_8px_0_var(--foreground)] max-sm:shadow-[5px_5px_0_var(--foreground)]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_24px,rgba(255,255,255,0.08)_24px_26px)]" />
        <div className="relative z-10 max-w-[620px] p-8 sm:p-12 lg:p-16">
          <h1 className="my-3 text-5xl font-black leading-[0.9] tracking-[-0.04em] text-[#fffdf8] sm:text-7xl lg:text-[6.6rem]">
            Explore the wild.
          </h1>
          <p className="m-0 max-w-[390px] text-base leading-relaxed text-white/85">
            A bright little index of creatures, moves, and endless adventure.
          </p>
        </div>
        <div className="absolute -bottom-[72px] right-[9%] w-[270px] rotate-12 max-sm:-right-[100px] max-sm:opacity-70">
          <Image src="/images/pokemon-icon.svg" alt="" width={270} height={270} />
        </div>
      </section>

      <div className="flex items-center justify-between gap-5 px-0.5 max-sm:flex-col max-sm:items-stretch">
        <div>
          <p className="m-0 text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-[var(--red)]">
            Choose your next encounter
          </p>
          <p className="mt-1 text-[0.85rem] text-[var(--ink-soft)]">
            {filteredItems.length} showing on this page
          </p>
        </div>
        <label className="flex min-h-[50px] w-full max-w-[390px] items-center gap-2.5 rounded-[10px] border-2 border-[var(--foreground)] bg-[var(--panel)] px-3.5 shadow-[4px_4px_0_var(--yellow)] focus-within:border-[var(--red)] focus-within:shadow-[4px_4px_0_var(--red)] max-sm:max-w-none">
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
        <div className="rounded-lg border-2 border-dashed border-[var(--border)] p-7 text-center text-[var(--muted)]" role="status">
          Loading your next encounters...
        </div>
      ) : filteredItems.length ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-[18px] md:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((pokemon, index) => {
            const pokemonId = pokemon.url.split("/").filter(Boolean).pop() ?? "";
            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`;
            const style = cardStyles[index % cardStyles.length];

            return (
              <article
                key={pokemon.name}
                className={`group relative min-h-[225px] overflow-hidden rounded-lg border-2 border-t-8 ${style.border} border-[var(--foreground)] bg-[var(--panel)] p-3 shadow-[5px_5px_0_var(--border)] transition-transform duration-200 hover:-translate-y-1.5 hover:rotate-[-1deg] hover:shadow-[8px_10px_0_var(--foreground)] sm:min-h-[260px] sm:p-4`}
              >
                <div className="mt-1 flex items-center justify-between text-[0.72rem] font-extrabold tracking-[0.1em] text-[var(--muted)]">
                  <span>#{pokemonId.padStart(3, "0")}</span>
                  <span className="h-2 w-2 rounded-full bg-[var(--card-accent,var(--red))]" aria-hidden="true" />
                </div>
                <div className={`my-1 flex h-[115px] items-center justify-center sm:h-[145px] ${style.sprite}`}>
                  <Image
                    src={sprite}
                    alt=""
                    width={150}
                    height={150}
                    className="h-[115px] w-[115px] object-contain transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105 sm:h-[145px] sm:w-[145px]"
                  />
                </div>
                <div className="flex items-end justify-between gap-2 max-sm:flex-col max-sm:items-start">
                  <h2 className="m-0 text-[1.1rem] font-black capitalize text-[var(--foreground)]">
                    {pokemon.name}
                  </h2>
                  <Link
                    href={`/pokemon/${pokemonId}`}
                    aria-label={`View ${pokemon.name} details`}
                    className="text-[0.72rem] font-black uppercase text-[var(--red)] no-underline hover:text-[var(--blue)]"
                  >
                    Inspect -&gt;
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

      <div className="flex items-center justify-between gap-3 pt-1.5">
        <button
          onClick={() => setOffset((current) => Math.max(0, current - PAGE_SIZE))}
          disabled={offset === 0 || loading}
          className="min-w-[110px] rounded-lg border-2 border-[var(--foreground)] bg-[var(--panel)] px-3.5 py-2.5 text-xs font-extrabold text-[var(--foreground)] transition-colors hover:bg-[var(--yellow)] disabled:cursor-not-allowed disabled:opacity-35"
        >
          &lt;- Previous
        </button>
        <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-[var(--blue)] font-black text-[#fffdf8]">
          {String(page).padStart(2, "0")}
        </span>
        <button
          onClick={() => setOffset((current) => current + PAGE_SIZE)}
          disabled={offset + PAGE_SIZE >= count || loading}
          className="min-w-[110px] rounded-lg border-2 border-[var(--foreground)] bg-[var(--panel)] px-3.5 py-2.5 text-xs font-extrabold text-[var(--foreground)] transition-colors hover:bg-[var(--yellow)] disabled:cursor-not-allowed disabled:opacity-35"
        >
          Next -&gt;
        </button>
      </div>
    </div>
  );
}
