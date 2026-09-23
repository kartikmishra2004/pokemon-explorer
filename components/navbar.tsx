import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-8xl items-center gap-3 px-6">
        <Link href="/" className="flex items-center gap-1 text-sm font-thin tracking-tight text-[var(--foreground)]">
          <Image src="/images/pokemon-icon.svg" alt="Pokemon logo" width={24} height={24} />
          <span>POKEMON EXPLORER</span>
        </Link>
      </div>
    </header>
  );
}
