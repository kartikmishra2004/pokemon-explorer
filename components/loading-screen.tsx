import Image from "next/image";

type LoadingScreenProps = {
  label: string;
};

export function LoadingScreen({ label }: LoadingScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center" role="status" aria-label={label}>
      <Image
        src="/images/pokemon-icon.svg"
        alt=""
        width={40}
        height={40}
        className="animate-spin opacity-70"
      />
    </div>
  );
}
