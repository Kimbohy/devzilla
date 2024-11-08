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
      domaine: string;
    };
  };
}

const ListeMentor: React.FC<{ listes: MentorProps }> = ({ listes }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform duration-200 hover:shadow-lg hover:scale-105">
      <div className="flex flex-col items-center">
        <Image
          src={listes.data.user.avatar}
          alt={`${listes.data.user.name}'s avatar`}
          width={80}
          height={80}
          className="rounded-full mb-2"
        />
        <p className="font-semibold text-lg text-center">
          {listes.data.user.name}
        </p>
        <p className="text-gray-500 text-sm">{listes.data.user.domaine}</p>
      </div>
    </div>
  );
};

export default ListeMentor;
