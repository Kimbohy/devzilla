import Image from "next/image";

interface PublicationProps {
  data: {
    id: string;
    content: string;
    image: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
  };
}

export default function Publication({ pub }: { pub: PublicationProps }) {
  return (
    <div className="max-w-[550px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="p-4 flex items-center space-x-4">
        <div className="relative h-12 w-12">
          <Image
            src={pub.data.user.avatar}
            alt="avatar"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-gray-900">{pub.data.user.name}</h1>
          <span className="text-sm text-gray-500">{pub.data.createdAt}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-2">
        <p className="text-gray-800 whitespace-pre-wrap">{pub.data.content}</p>
      </div>

      {/* Image */}
      {pub.data.image && (
        <div className="mt-2 relative w-full aspect-square">
          <Image
            src={pub.data.image}
            alt="publication content"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center space-x-6">
        <button className="flex items-center space-x-2 group">
          <div className="relative w-6 h-6 group-hover:scale-110 transition-transform">
            <Image
              src="/smiley.svg"
              alt="smiley"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm text-gray-600 group-hover:text-gray-900">
            Happy
          </span>
        </button>

        <button className="flex items-center space-x-2 group">
          <div className="relative w-6 h-6 group-hover:scale-110 transition-transform">
            <Image src="/sad.svg" alt="sad" fill className="object-contain" />
          </div>
          <span className="text-sm text-gray-600 group-hover:text-gray-900">
            Sad
          </span>
        </button>

        <button className="flex items-center space-x-2 group">
          <div className="relative w-6 h-6 group-hover:scale-110 transition-transform">
            <Image
              src="/comment.svg"
              alt="comment"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm text-gray-600 group-hover:text-gray-900">
            Comment
          </span>
        </button>
      </div>
    </div>
  );
}
