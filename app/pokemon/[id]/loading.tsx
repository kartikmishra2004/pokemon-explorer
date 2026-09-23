import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex min-h-40 items-center justify-center" role="status" aria-label="Loading Pokemon details">
            <Image
                src="/images/pokemon-icon.svg"
                alt=""
                width={48}
                height={48}
                className="animate-spin grayscale opacity-60"
            />
        </div>
    );
}