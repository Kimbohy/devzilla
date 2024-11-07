"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function JoinTheDomain({
  domain,
}: {
  domain: { name: string; icon: string };
}) {
  const [showMore, setShowMore] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowMore(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className="bg-slate-200 flex flex-col p-4 sticky bottom-0 ">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <Image
            src={domain.icon}
            alt="Join the domain"
            width={50}
            height={50}
          />
          <span>
            Rejoignez le domaine <strong>{domain.name}</strong> pour dévelloper
            vos talents
          </span>
          <button
            className=" relative -top-2"
            onClick={() => setShowMore(true)}
          >
            ⓘ
          </button>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Join the domain
        </button>
      </div>
      {showMore && (
        <p className="text-neutral-600">
          Tu doit faire partie du domaine pour pouvoir publier et réagir aux
          publications
        </p>
      )}
    </div>
  );
}
