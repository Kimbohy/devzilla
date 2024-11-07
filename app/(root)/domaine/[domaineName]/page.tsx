"use client";
import Publication from "@/components/Publication";
import { useEffect, useState, use } from "react";

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

// fake data:
const _publications: PublicationProps[] = [
  {
    data: {
      id: "1",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti nesciunt reprehenderit dolore. Non debitis modi, at eaque fugiat, nobis sequi quae dignissimos autem ipsum esse enim. Quaerat praesentium magnam quae.",
      image: "/hanina.jpg",
      user: {
        id: "1",
        name: "Kimbohy Marisika",
        avatar: "/avatar.svg",
      },
      createdAt: "2j",
    },
  },
  {
    data: {
      id: "2",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti nesciunt reprehenderit dolore. Non debitis modi, at eaque fugiat, nobis sequi quae dignissimos autem ipsum esse enim. Quaerat praesentium magnam quae.",
      image: "/hanina.jpg",
      user: {
        id: "2",
        name: "Kimbohy Marisika",
        avatar: "/avatar.svg",
      },
      createdAt: "2j",
    },
  },
  {
    data: {
      id: "3",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti nesciunt reprehenderit dolore. Non debitis modi, at eaque fugiat, nobis sequi quae dignissimos autem ipsum esse enim. Quaerat praesentium magnam quae.",
      image: "/hanina.jpg",
      user: {
        id: "3",
        name: "Kimbohy Marisika",
        avatar: "/avatar.svg",
      },
      createdAt: "2j",
    },
  },
];

export default function Page({
  params,
}: {
  params: Promise<{ domaineName: string }>;
}) {
  const resolvedParams = use(params);
  const [publications, setPublications] = useState<PublicationProps[]>([]);

  // Decode the URL-encoded domaineName
  const decodedDomaineName = decodeURIComponent(resolvedParams.domaineName);

  useEffect(() => {
    if (decodedDomaineName) {
      //   fetch(`/api/publications?domain=${decodedDomaineName}`)
      //     .then((response) => response.json())
      //     .then((data) => setPublications(data));
      setPublications(_publications);
    }
  }, [decodedDomaineName]);

  return (
    <div>
      {/* <h1 className="capitalize">{decodedDomaineName}</h1> */}
      <div className="flex flex-col items-center gap-2 p-3">
        {publications.map((publication) => (
          <Publication key={publication.data.id} pub={publication} />
        ))}
      </div>
    </div>
  );
}
