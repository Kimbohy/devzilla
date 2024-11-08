"use client";
import { useState } from "react";
import PublicationComments from "./PublicationComments";
import PublicationHeader from "./PublicationHeader";
import PublicationContent from "./PublicationContent";
import PublicationImage from "./PublicationImage";
import PublicationActions from "./PublicationActions";

export interface PublicationProps {
  data: {
    id: string;
    content: string;
    image: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    type: string;
    createdAt: string;
  };
}

export default function Publication({ pub }: { pub: PublicationProps }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="max-w-[550px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <PublicationHeader
        user={pub.data.user}
        createdAt={pub.data.createdAt}
        type={pub.data.type}
      />
      <PublicationContent content={pub.data.content} />
      {pub.data.image && <PublicationImage image={pub.data.image} />}
      <PublicationActions
        pubId={pub.data.id}
        setShowComments={setShowComments}
        showComments={showComments}
      />
      {showComments && (
        <div className="mt-4 mx-3">
          <PublicationComments publicationId={pub.data.id} />
        </div>
      )}
    </div>
  );
}
