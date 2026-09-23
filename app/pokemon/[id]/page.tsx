import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPokemonDetails } from "@/lib/api/pokemon.detail";

const typeStyles = [
  "border-[var(--yellow)] bg-[var(--yellow)]/25",
  "border-[#8ed9c4] bg-[#8ed9c4]/30",
  "border-[#9dbcf4] bg-[#9dbcf4]/30",
];

const statStyles = [
  "bg-[var(--red)]",
  "bg-[var(--blue)]",
  "bg-[#e58b3a]",
  "bg-[#8d6bd8]",
  "bg-[#3eaa76]",
  "bg-[#d85c91]",
];

const moveStyles = [
  "bg-[var(--yellow)]/25",
  "bg-[#8ed9c4]/30",
  "bg-[#9dbcf4]/30",
  "bg-[#f5a4b4]/35",
];

function formatPokemonName(name: string) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pokemon = await getPokemonDetails(id);
  const name = formatPokemonName(pokemon.name);
  const types = pokemon.types.map((type) => type.type.name).join(" and ");

  return {
    title: `${name} | Pokemon Explorer`,
    description: `Explore ${name}, a ${types}-type Pokemon. View its stats, abilities, moves, sprites, and game versions.`,
  };
}

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = await getPokemonDetails(id);

  const officialImage =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ??
    pokemon.sprites?.front_default ??
    "";
  const frontImage = pokemon.sprites?.front_default ?? "";
  const homeImage = pokemon.sprites?.other?.home?.front_default ?? "";
  const showdownFrontImage = pokemon.sprites?.other?.showdown?.front_default ?? "";
  const showdownShinyImage = pokemon.sprites?.other?.showdown?.front_shiny ?? "";
  const showdownBackImage = pokemon.sprites?.other?.showdown?.back_default ?? "";
  const versions = Array.from(
    new Set(
      pokemon.moves.flatMap(
        (move) =>
          move.version_group_details?.map((detail) => detail.version_group.name) ?? []
      )
    )
  ).slice(0, 8);

  const gallery = [
    { label: "Official", src: officialImage },
    { label: "Front", src: frontImage },
    { label: "Home", src: homeImage },
    { label: "Showdown", src: showdownFrontImage },
    { label: "Shiny", src: showdownShinyImage },
    { label: "Back", src: showdownBackImage },
  ];

  return (
    <div className="mx-auto w-full max-w-[1180px] text-[var(--foreground)]">
      <nav className="-mx-6 flex items-center justify-between border-y border-[var(--border)] bg-[var(--panel-alt)] px-6 py-2 text-xs font-bold uppercase tracking-wide sm:mx-0 sm:px-4">
        <Link href="/" className="text-[var(--foreground)] no-underline hover:text-[var(--red)]">
          &lt; Back to list
        </Link>
        <span className="text-[var(--muted)]">#{String(pokemon.id).padStart(4, "0")}</span>
        <span className="hidden text-[var(--muted)] sm:inline">Pokemon dossier</span>
      </nav>

      <header className="border-b-2 border-[var(--foreground)] py-6 text-center sm:py-8">
        <p className="m-0 text-xs font-extrabold uppercase tracking-[0.25em] text-[var(--red)]">Pokemon</p>
        <h1 className="mt-2 text-4xl font-black capitalize tracking-[-0.03em] sm:text-6xl">{pokemon.name}</h1>
        <div className="mt-4 flex justify-center gap-2">
          {pokemon.types.map((type, index) => (
            <span
              key={type.type.name}
              className={`border px-4 py-1 text-xs font-extrabold capitalize ${typeStyles[index % typeStyles.length]}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </header>

      <main>
        <section className="grid border-b-2 border-[var(--foreground)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-h-[360px] items-center justify-center border-b border-[var(--border)] bg-[var(--panel-alt)] p-8 lg:border-b-0 lg:border-r">
            {officialImage ? (
              <Image
                src={officialImage}
                alt={pokemon.name}
                width={360}
                height={360}
                className="h-auto max-h-[360px] w-full max-w-[360px] object-contain drop-shadow-[0_14px_0_rgba(23,35,61,0.16)]"
              />
            ) : null}
          </div>

          <div className="p-6 sm:p-8">
            <p className="m-0 max-w-lg text-sm leading-6 text-[var(--ink-soft)]">
              A field guide entry for {pokemon.name}, catalogued by its core abilities, battle profile, and known forms.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-[var(--border)] py-5 text-sm sm:grid-cols-3">
              {[
                ["Height", `${pokemon.height / 10} m`],
                ["Weight", `${pokemon.weight / 10} kg`],
                ["Base XP", pokemon.base_experience],
                ["Species", pokemon.species?.name],
                ["Order", pokemon.order],
                ["Default", pokemon.is_default ? "Yes" : "No"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="m-0 text-[0.65rem] font-extrabold uppercase tracking-wide text-[var(--muted)]">{label}</p>
                  <p className="mt-1 font-black capitalize">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 text-xs font-extrabold uppercase tracking-wide text-[var(--muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--red)]" />
              Field notes / active entry
            </div>
          </div>
        </section>

        <section className="grid border-b-2 border-[var(--foreground)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-[var(--border)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="m-0 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[var(--red)]">Battle profile</p>
                <h2 className="mt-1 text-2xl font-black">Stats</h2>
              </div>
              <span className="text-xs font-bold text-[var(--muted)]">Base values</span>
            </div>
            <div className="space-y-4">
              {pokemon.stats.map((stat, index) => (
                <div key={stat.stat.name}>
                  <div className="mb-1 flex justify-between text-xs font-extrabold uppercase text-[var(--muted)]">
                    <span>{stat.stat.name}</span>
                    <span className="text-[var(--foreground)]">{stat.base_stat}</span>
                  </div>
                  <div className="h-3 bg-[var(--panel-alt)]">
                    <div
                      className={`h-full ${statStyles[index % statStyles.length]}`}
                      style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="m-0 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[var(--blue)]">Known traits</p>
            <h2 className="mt-1 text-2xl font-black">Abilities</h2>
            <div className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {pokemon.abilities.map((ability) => (
                <div key={ability.ability.name} className="flex items-center justify-between gap-4 py-4">
                  <span className="font-black capitalize">{ability.ability.name}</span>
                  <span className="text-[0.65rem] font-extrabold uppercase tracking-wide text-[var(--muted)]">
                    {ability.is_hidden ? "Hidden" : "Primary"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b-2 border-[var(--foreground)] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="m-0 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[var(--red)]">Visual archive</p>
              <h2 className="mt-1 text-2xl font-black">Forms & animations</h2>
            </div>
            <span className="text-xs font-bold text-[var(--muted)]">{gallery.filter((image) => image.src).length} available views</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-px bg-[var(--border)] sm:grid-cols-6">
            {gallery.map((image) =>
              image.src ? (
                <div key={image.label} className="group bg-[var(--panel)] p-3">
                  <div className="flex h-24 items-center justify-center bg-[var(--panel-alt)] sm:h-28">
                    <Image
                      src={image.src}
                      alt={`${pokemon.name} ${image.label}`}
                      width={130}
                      height={130}
                      className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-2 text-center text-[0.6rem] font-extrabold uppercase tracking-wide text-[var(--muted)]">{image.label}</p>
                </div>
              ) : null
            )}
          </div>
        </section>

        <section className="grid border-b-2 border-[var(--foreground)] lg:grid-cols-2">
          <div className="border-b border-[var(--border)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="m-0 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[var(--red)]">Release timeline</p>
            <h2 className="mt-1 text-2xl font-black">Game versions</h2>
            {versions.length ? (
              <div className="mt-6 grid grid-cols-2 border-l-4 border-[var(--yellow)] sm:grid-cols-3">
                {versions.map((version) => (
                  <span key={version} className="border-b border-r border-[var(--border)] px-3 py-3 text-xs font-extrabold capitalize">
                    {version.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-[var(--muted)]">No version data available.</p>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <p className="m-0 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[var(--blue)]">Quick read</p>
            <h2 className="mt-1 text-2xl font-black">At a glance</h2>
            <div className="mt-6 grid grid-cols-3 divide-x divide-[var(--border)] border-y border-[var(--border)] text-center">
              {[
                [pokemon.moves.length, "Moves"],
                [pokemon.abilities.length, "Abilities"],
                [pokemon.types.length, "Types"],
              ].map(([value, label]) => (
                <div key={label} className="py-4">
                  <p className="m-0 text-2xl font-black">{value}</p>
                  <p className="mt-1 text-[0.6rem] font-extrabold uppercase tracking-wide text-[var(--muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="m-0 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[var(--red)]">Learned repertoire</p>
              <h2 className="mt-1 text-2xl font-black">Moves</h2>
            </div>
            <span className="text-xs font-bold text-[var(--muted)]">Showing 12 of {pokemon.moves.length}</span>
          </div>
          <div className="mt-6 grid grid-cols-2 border-l-4 border-[var(--red)] sm:grid-cols-3 md:grid-cols-4">
            {pokemon.moves.slice(0, 12).map((move, index) => (
              <span key={move.move.name} className={`border-b border-r border-[var(--border)] px-3 py-3 text-xs font-extrabold capitalize ${moveStyles[index % moveStyles.length]}`}>
                {move.move.name}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
