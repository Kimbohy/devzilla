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

export default function Publication({
  pub,
}: // key,
{
  pub: PublicationProps;
  // key: string;
}) {
  return (
    <div className="max-w-[550px]">
      <div className=" bg-secondary p-2 flex">
        <Image
          src={pub.data.user.avatar}
          alt="publication"
          width={60}
          height={60}
        />
        <div>
          <h1>{pub.data.user.name}</h1>
          <span>{pub.data.createdAt}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p>{pub.data.content}</p>
        <Image
          src={pub.data.image}
          alt="image content"
          width={400}
          height={400}
        />
      </div>
      <div className="flex gap-2 p-2 items-center">
        <Image src="/sad.svg" alt="like" width={40} height={40} />
        <Image src="/smiley.svg" alt="smiley" width={40} height={40} />
        <Image src="/comment.svg" alt="comment" width={40} height={40} />
      </div>
    </div>
  );
}
