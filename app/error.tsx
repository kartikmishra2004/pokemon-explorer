"use client";

import Link from "next/link";

export default function Error({
    reset,
}: {
    reset: () => void;
}) {
    return (
        <main className="mx-auto flex min-h-[85vh] w-full max-w-2xl items-center justify-center px-6 py-12">
            <section className="w-full border-2 border-[var(--foreground)] bg-[var(--panel-alt)] p-7 shadow-[8px_8px_0_var(--foreground)] sm:p-10">
                <h1 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[var(--foreground)] sm:text-5xl">
                    This page could not load.
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-6 text-[var(--ink-soft)]">
                    The API did not return this Pokemon right now. Try again, or go back
                    to the list and choose another one.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="border-2 border-[var(--foreground)] bg-[var(--yellow)] px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-[var(--foreground)] transition hover:bg-[var(--red)] hover:text-white"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="border-2 border-[var(--foreground)] bg-[var(--panel)] px-5 py-3 text-center text-xs font-extrabold uppercase tracking-wide text-[var(--foreground)] no-underline transition hover:bg-[var(--blue)] hover:text-white"
                    >
                        Back to the list
                    </Link>
                </div>
            </section>
        </main>
    );
}