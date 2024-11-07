"use client";
import { toUtf8 } from "@/app/utils";
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

  const [domaineName, setDomaineName] = useState<string>("");

  useEffect(() => {
    if (resolvedParams.domaineName) {
      const utf8DomaineName = toUtf8(resolvedParams.domaineName);
      setDomaineName(utf8DomaineName);
      //   fetch(`/api/publications?domain=${utf8DomaineName}`)
      //     .then((response) => response.json())
      //     .then((data) => setPublications(data));
      setPublications(_publications);
    }
  }, [resolvedParams.domaineName]);

  return (
    <div>
      <h1 className="capitalize">{domaineName}</h1>
      <ul>
        {publications.map((publication) => (
          <li key={publication.id}>{publication.title}</li>
        ))}
      </ul>
    </div>
  );
}
