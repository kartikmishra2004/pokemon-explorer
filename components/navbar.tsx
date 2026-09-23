import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between gap-3 px-6">
        <Link href="/" className="flex items-center text-[var(--foreground)]">
          <Image src="/images/pokemon.svg" alt="Pokemon Explorer" width={135} height={50} className="h-10 w-auto object-contain" />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
