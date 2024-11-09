import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making API requests

export default function PublicationHeader({
  user: initialUser,
  createdAt,
  type,
}: {
  user: { id: string; name: string; avatar: string };
  createdAt: string;
  type: string;
}) {
  const [user, setUser] = useState(initialUser); // State to hold user information
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage errors

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `localhost:8080/users?user-id=${user.id}`
        );
        if (response.data) {
          setUser(response.data); // Update user state with fetched data
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("User not found."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchUser(); // Call the fetch function
  }, [user.id]); // Dependency array includes user.id

  if (loading) {
    return <div>Loading user information...</div>; // Loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Error state
  }

  return (
    <div className="p-3 md:p-4 flex items-center space-x-3 md:space-x-4">
      <Link
        href={`/profile/${user.id}`}
        className="relative h-10 w-10 md:h-12 md:w-12"
      >
        <Image
          src={user.avatar}
          alt="avatar"
          fill
          className="rounded-full object-cover"
          style={{ zIndex: 0 }}
        />
      </Link>
      <div className="flex flex-col gap-1">
        <Link href={`/profile/${user.id}`}>
          <h1 className="font-semibold text-sm md:text-base text-gray-900 cursor-pointer">
            {user.name}
          </h1>
        </Link>
        <div className="flex items-center space-x-2">
          <span className="text-xs md:text-sm text-gray-500">{createdAt}</span>
          {type && (
            <span className="text-[10px] md:text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full cursor-default">
              {type}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
