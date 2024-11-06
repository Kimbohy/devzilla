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
    </div>
  );
}
