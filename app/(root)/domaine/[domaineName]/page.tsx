"use client";
import { useEffect, useState, use } from "react";

// fake data:
const _publications = [
  { id: 1, title: "Publication 1" },
  { id: 2, title: "Publication 2" },
  { id: 3, title: "Publication 3" },
];

export default function Page({
  params,
}: {
  params: Promise<{ domaineName: string }>;
}) {
  const resolvedParams = use(params);
  const [publications, setPublications] = useState<
    { id: number; title: string }[]
  >([]);

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
      <h1 className="capitalize">{decodedDomaineName}</h1>
      <ul>
        {publications.map((publication) => (
          <li key={publication.id}>{publication.title}</li>
        ))}
      </ul>
    </div>
  );
}
