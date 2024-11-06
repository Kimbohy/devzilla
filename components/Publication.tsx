import Image from "next/image";
export default function Publication() {
  return (
    <div className="max-w-96">
      <div className=" bg-secondary p-2 flex">
        <Image src="/avatar.svg" alt="publication" width={60} height={60} />
        <div>
          <h1>Kimbohy Marisika</h1>
          <span>2j</span>
        </div>
      </div>
      <div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
          nesciunt reprehenderit dolore. Non debitis modi, at eaque fugiat,
          nobis sequi quae dignissimos autem ipsum esse enim. Quaerat
          praesentium magnam quae.
        </p>
        <Image src="/hanina.jpg" alt="image content" width={400} height={400} />
      </div>
      <div className="flex gap-2 p-2 items-center">
        <Image src="/sad.svg" alt="like" width={40} height={40} />
        <Image src="/smiley.svg" alt="smiley" width={40} height={40} />
        <Image src="/comment.svg" alt="comment" width={40} height={40} />
      </div>
    </div>
  );
}
