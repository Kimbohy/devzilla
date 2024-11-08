import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  domain: string;
  expertise: string;
}

interface MentorsRecommendedProps {
  mentors: Mentor[];
}

const MentorsRecommended: React.FC<MentorsRecommendedProps> = ({ mentors }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-4">
        <FaStar className="mr-2 text-yellow-500" />
        <h3 className="text-xl font-semibold">Mentors Recommandés</h3>
      </div>
      <div className="space-y-4">
        {mentors.map((mentor) => (
          <Link href={`/mentors/${mentor.id}`} key={mentor.id}>
            <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <Image
                src={mentor.avatar}
                alt={mentor.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h4 className="font-medium">{mentor.name}</h4>
                <p className="text-sm text-gray-500">
                  {mentor.domain} - {mentor.expertise}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MentorsRecommended;
