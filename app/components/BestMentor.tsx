import Image from "next/image";

export default function BestMentor() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Meilleur Mentor</h3>
      <div className="flex items-center space-x-4">
        <div className="relative h-16 w-16">
          <Image
            src="/avatar.svg"
            alt="avatar"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold">Kimbohy Marisika</h4>
          <p className="text-sm text-gray-500">Développement Personnel</p>
        </div>
      </div>
    </div>
  );
}
