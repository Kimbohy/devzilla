"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaLinkedin, FaClipboard } from "react-icons/fa";
import { usePathname } from "next/navigation";
import axios from "axios";

const ShareProfile = () => {
  const userId = usePathname()?.split("/")[2];
  const [profileLink, setProfileLink] = useState(
    `http://localhost:3000/profil/${userId}`
  );
  const [userData, setUserData] = useState<{
    nom: string;
    photoProfil: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users?user-id=${userId}`
        );
        if (response.data.success) {
          setUserData(response.data.data);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleShare = (platform: string) => {
    const shareUrl = profileLink;
    switch (platform) {
      case "clipboard":
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert("Profile link copied to clipboard!");
        });
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
      default:
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        {userData && (
          <div className="flex items-center mb-6">
            <Image
              src={userData.photoProfil}
              alt={userData.nom}
              width={64}
              height={64}
              className="rounded-full mr-4"
            />
            <h2 className="text-2xl font-bold">{userData.nom}</h2>
          </div>
        )}
        <h1 className="text-3xl font-bold mb-4 text-center">
          Share Your Profile
        </h1>
        <p className="mb-6 text-center">
          Share the profile link on social media:
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={() => handleShare("facebook")}
            className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
          >
            <FaFacebook className="mr-2" /> Facebook
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="flex items-center justify-center bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors w-full md:w-auto"
          >
            <FaTwitter className="mr-2" /> Twitter
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="flex items-center justify-center bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors w-full md:w-auto"
          >
            <FaLinkedin className="mr-2" /> LinkedIn
          </button>
          <button
            onClick={() => handleShare("clipboard")}
            className="flex items-center justify-center bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors w-full md:w-auto"
          >
            <FaClipboard className="mr-2" /> Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareProfile;
