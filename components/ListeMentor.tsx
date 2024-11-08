import Image from "next/image";
import React from "react";

interface MentorProps {
  data: {
    id: string;
    type: string;
    user: {
      id: string;
      name: string;
      avatar: string;
      domaine: string; // Ensure this is included
    };
  };
}

const ListeMentor: React.FC<{ listes: MentorProps }> = ({ listes }) => {
  return (
    <div className="ml-5 flex flex-col gap-7">
      <div className="flex md:items-center gap-4 ">
        <Image
          src={listes.data.user.avatar}
          alt="avatar"
          width={50}
          height={50}
          className="md:w-[100px] md:h-[100px]"
        />
        <p className="md:text-2xl text-sm">
          <strong>{listes.data.user.name}</strong> est un mentor dans le domaine{" "}
          <strong>{listes.data.user.domaine}</strong>
        </p>
      </div>
    </div>
  );
};

export default ListeMentor;
