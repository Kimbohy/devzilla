import Image from "next/image";
export default function PublicationImage({ image }: { image: string }) {
  return (
    <div className="mt-2 relative w-full aspect-square md:aspect-video">
      <Image
        src={image}
        alt="publication content"
        fill
        className="object-cover"
      />
    </div>
  );
}
