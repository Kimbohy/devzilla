const topics = [
  "Innovation Technologique",
  "Développement Personnel",
  "Créativité Artistique",
  "Entrepreneuriat Social",
];

export default function TrendingTopics() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Trending Topics</h3>
      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic}
            className="bg-gray-100 px-3 py-2 rounded-full text-sm text-gray-700 hover:bg-primary/10 transition-colors cursor-pointer"
          >
            #{topic}
          </div>
        ))}
      </div>
    </div>
  );
}
