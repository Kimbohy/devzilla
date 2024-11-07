"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// fake data:
const _publications = [
  { id: 1, title: "Publication 1" },
  { id: 2, title: "Publication 2" },
  { id: 3, title: "Publication 3" },
];

export default function Page() {
  const router = useRouter();
  const { domaineName } = router.query;
  const [publications, setPublications] = useState<
    { id: number; title: string }[]
  >([]);

  useEffect(() => {
    if (domaineName) {
      //   fetch(`/api/publications?domain=${domaineName}`)
      //     .then((response) => response.json())
      //     .then((data) => setPublications(data));
      setPublications(_publications);
    }
  }, [domaineName]);

  return (
    <div>
      <h1>{domaineName}</h1>
      <ul>
        {publications.map((publication) => (
          <li key={publication.id}>{publication.title}</li>
        ))}
      </ul>
    </div>
  );
}
