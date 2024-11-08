import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function PublicationActions({
  pubId,
  setShowComments,
  showComments,
}: {
  pubId: string;
  setShowComments: (show: boolean) => void;
  showComments: boolean;
}) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target as Node)
      ) {
        setShowShareMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShare = async (platform: string) => {
    const shareUrl = `${window.location.origin}/publication/${pubId}`;

    switch (platform) {
      case "clipboard":
        try {
          await navigator.clipboard.writeText(shareUrl);
          alert("Lien copié dans le presse-papiers !");
        } catch (err) {
          console.error("Échec de la copie :", err);
        }
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="relative px-4 py-3 border-t border-gray-100 flex items-center space-x-6">
      <div className="flex items-center space-x-6">
        <button className="flex items-center space-x-2 group">
          <div className="relative w-6 h-6 group-hover:scale-110 transition-transform">
            <Image
              src="/smiley.svg"
              alt="smiley"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm text-gray-600 group-hover:text-gray-900">
            Happy
          </span>
        </button>

        <button className="flex items-center space-x-2 group">
          <div className="relative w-6 h-6 group-hover:scale-110 transition-transform">
            <Image src="/sad.svg" alt="sad" fill className="object-contain" />
          </div>
          <span className="text-sm text-gray-600 group-hover:text-gray-900">
            Sad
          </span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 group"
        >
          <div className="relative w-6 h-6 group-hover:scale-110 transition-transform">
            <Image
              src="/comment.svg"
              alt="comment"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm text-gray-600 group-hover:text-gray-900">
            {showComments
              ? "Masquer les commentaires"
              : "Voir les commentaires"}
          </span>
        </button>

        <div ref={shareMenuRef} className="relative">
          <button
            className="flex items-center space-x-2 group"
            onClick={() => setShowShareMenu(!showShareMenu)}
          >
            <div className="relative w-6 h-6 group-hover:scale-110 transition-transform">
              <Image
                src="/share.svg"
                alt="share"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900">
              Partager
            </span>
          </button>

          {showShareMenu && (
            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-10">
              <button
                onClick={() => handleShare("clipboard")}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Image src="/link.svg" alt="copy link" width={16} height={16} />
                <span>Copier le lien</span>
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Image
                  src="/facebook2.svg"
                  alt="facebook"
                  width={16}
                  height={16}
                />
                <span>Partager sur Facebook</span>
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Image
                  src="/x-twitter.svg"
                  alt="twitter"
                  width={16}
                  height={16}
                />
                <span>Partager sur X</span>
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Image
                  src="/linkedin2.svg"
                  alt="linkedin"
                  width={16}
                  height={16}
                />
                <span>Partager sur LinkedIn</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
