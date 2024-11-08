import Image from "next/image";
import Link from "next/link";

export default function Domain({
  name,
  icon,
  isOnSideBar,
  className,
}: {
  name: string;
  icon: string;
  isOnSideBar?: boolean;
  className?: string;
}) {
  return (
    <Link href={`/domaine/${name}`}>
      <div
        className={`flex items-center gap-3 w-full px-3 py-1 transition-all cursor-pointer ${className}`}
      >
        <Image src={icon} alt="icon" width={50} height={50} />
        <span
          className={`text-white text-xl hidden ${isOnSideBar && "md:block"}`}
        >
          {name}
        </span>
      </div>
    </Link>
  );
}
