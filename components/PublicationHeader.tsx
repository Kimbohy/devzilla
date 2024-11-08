import Image from "next/image";

export default function PublicationHeader({
  user,
  createdAt,
  type,
}: {
  user: { id: string; name: string; avatar: string };
  createdAt: string;
  type: string;
}) {
  return (
    <div className="p-4 flex items-center space-x-4">
      <div className="relative h-12 w-12">
        <Image
          src={user.avatar}
          alt="avatar"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-[2px]">
        <h1 className="font-semibold text-gray-900 relative">{user.name}</h1>
        <div>
          <span className="text-sm text-gray-500">{createdAt}</span>
          {type && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2 cursor-default">
              {type}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
