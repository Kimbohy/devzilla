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
    <div
      ref={ref}
      className="bg-slate-200 flex flex-col p-4 sticky bottom-0 w-full rounded-lg shadow-md"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
        <div className="flex gap-3 items-center mb-2 md:mb-0">
          <Image
            src={domain.icon}
            alt="Join the domain"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-sm md:text-base">
            Rejoignez le domaine <strong>{domain.name}</strong> pour développer
            vos talents
          </span>
          <button
            className="relative -top-2 text-sm md:text-base"
            onClick={() => setShowMore(true)}
          >
            ⓘ
          </button>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 md:w-auto">
          Rejoindre le domaine
        </button>
      </div>
      {showMore && (
        <p className="text-neutral-600 text-sm md:text-base mt-2">
          Tu dois faire partie du domaine pour pouvoir publier et réagir aux
          publications.
        </p>
      )}
    </div>
  );
}
