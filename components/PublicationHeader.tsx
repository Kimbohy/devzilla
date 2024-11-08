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
    <div className="p-3 md:p-4 flex items-center space-x-3 md:space-x-4">
      <div className="relative h-10 w-10 md:h-12 md:w-12">
        <Image
          src={user.avatar}
          alt="avatar"
          fill
          className="rounded-full object-cover"
          style={{ zIndex: 0 }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-sm md:text-base text-gray-900">
          {user.name}
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-xs md:text-sm text-gray-500">{createdAt}</span>
          {type && (
            <span className="text-[10px] md:text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full cursor-default">
              {type}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
