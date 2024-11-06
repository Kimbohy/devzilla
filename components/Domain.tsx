import Image from "next/image";

export default function Domain({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 hover:bg-accent-dark w-full px-3 py-1 transition-all cursor-pointer">
      <Image src={icon} alt="icon" width={50} height={50} />
      <span className="text-white hidden md:block">{name}</span>
    </div>
  );
}
