import Image from "next/image";
import Link from "next/link";

export default function Domain({
  name,
  icon,
  className,
}: {
  name: string;
  icon: string;
  className?: string;
}) {
  return (
    <Link href={`/domaine/${name}`}>
      <div
        className={`flex items-center gap-3 hover:bg-accent-dark w-full px-3 py-1 transition-all cursor-pointer ${className}`}
      >
        <Image src={icon} alt="icon" width={50} height={50} />
        <span className="text-white hidden md:block">{name}</span>
      </div>
    </Link>
  );
}
