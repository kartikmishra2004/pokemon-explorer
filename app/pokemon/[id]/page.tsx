import Image from "next/image";
import Link from "next/link";
import { getPokemonDetails } from "@/lib/api/pokemon.detail";

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

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--link-bg-hover)]"
      >
        Back to Pokemon
      </Link>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-2xl bg-[var(--panel-alt)]">
            {officialImage ? (
              <Image src={officialImage} alt={pokemon.name} width={120} height={120} className="h-full w-full object-contain" />
            ) : null}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Pokemon</p>
            <h1 className="mt-2 text-3xl font-semibold capitalize text-[var(--foreground)]">{pokemon.name}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span key={type.type.name} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs capitalize text-[var(--foreground)]">
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Gallery</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Official artwork", src: officialImage },
              { label: "Front sprite", src: frontImage },
              { label: "Home artwork", src: homeImage },
              { label: "Showdown front", src: showdownFrontImage },
              { label: "Showdown shiny", src: showdownShinyImage },
              { label: "Showdown back", src: showdownBackImage },
            ].map(
              (image) =>
                image.src ? (
                  <div key={image.label} className="overflow-hidden rounded-2xl bg-[var(--panel-alt)] p-3">
                    <Image src={image.src} alt={`${pokemon.name} ${image.label}`} width={120} height={120} className="h-24 w-full object-contain" />
                  </div>
                ) : null
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Basic</h2>
          <div className="space-y-3 text-sm text-[var(--foreground)]">
            <p><span className="text-[var(--muted)]">ID:</span> #{pokemon.id}</p>
            <p><span className="text-[var(--muted)]">Base XP:</span> {pokemon.base_experience}</p>
            <p><span className="text-[var(--muted)]">Order:</span> {pokemon.order}</p>
            <p><span className="text-[var(--muted)]">Height:</span> {pokemon.height / 10} m</p>
            <p><span className="text-[var(--muted)]">Weight:</span> {pokemon.weight / 10} kg</p>
            <p><span className="text-[var(--muted)]">Species:</span> {pokemon.species?.name}</p>
            <p><span className="text-[var(--muted)]">Default:</span> {pokemon.is_default ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Stats</h2>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>
                <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-wide text-[var(--muted)]">
                  <span>{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--panel-alt)]">
                  <div
                    className="h-full rounded-full bg-[var(--foreground)]"
                    style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Abilities</h2>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.ability.name}
                className="rounded-full bg-[var(--panel-alt)] px-3 py-2 text-sm capitalize text-[var(--foreground)]"
              >
                {ability.ability.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Game versions</h2>
          {(() => {
            const versions = Array.from(
              new Set(
                pokemon.moves.flatMap((move) =>
                  move.version_group_details?.map((detail) => detail.version_group.name) ?? []
                )
              )
            ).slice(0, 8);

            return versions.length ? (
              <div className="flex flex-wrap gap-2">
                {versions.map((version) => (
                  <span key={version} className="rounded-full border border-[var(--border)] px-2 py-1 text-xs capitalize text-[var(--foreground)]">
                    {version.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--muted)]">No version data available.</p>
            );
          })()}
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Quick facts</h2>
          <div className="space-y-3 text-sm text-[var(--foreground)]">
            <p><span className="text-[var(--muted)]">Moves:</span> {pokemon.moves.length}</p>
            <p><span className="text-[var(--muted)]">Abilities:</span> {pokemon.abilities.length}</p>
            <p><span className="text-[var(--muted)]">Types:</span> {pokemon.types.length}</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Moves</h2>
        <div className="flex flex-wrap gap-2">
          {pokemon.moves.slice(0, 12).map((move) => (
            <span key={move.move.name} className="rounded-full border border-[var(--border)] px-2 py-1 text-xs capitalize text-[var(--foreground)]">
              {move.move.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}