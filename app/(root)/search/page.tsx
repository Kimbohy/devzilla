"use client";

import SearchResults from "@/components/SearchResults";
import { useState } from "react";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<
    "all" | "users" | "publications" | "domains"
  >("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger search
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 relative">
        <div className="flex flex-row items-center space-y-4 md:space-y-0 md:space-x-4 gap-2">
          {/* Search Input */}
          <div className="w-full relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users, publications, domains..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden bg-primary text-white p-2 rounded-lg !m-0"
          >
            {isFilterOpen ? <FaTimes /> : <FaFilter />}
          </button>

          {/* Filter Dropdown (Mobile and Desktop) */}
          <div
            className={`
    ${isFilterOpen ? "block" : "hidden"} 
    md:block 
    absolute md:static 
    inset-x-0 
    bg-white 
    md:bg-transparent 
    shadow-lg md:shadow-none 
    rounded-t-xl md:rounded-none 
    z-50 md:z-auto
    p-4 md:p-0
    transform md:translate-y-0
    ${isFilterOpen ? "translate-y-0" : "translate-y-full"}
  `}
          >
            <select
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value as typeof searchType);
                setIsFilterOpen(false);
              }}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All</option>
              <option value="users">Users</option>
              <option value="publications">Publications</option>
              <option value="domains">Domains</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="hidden md:block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Search
          </button>
        </div>

        {/* Mobile Search Button */}
        <button
          type="submit"
          className="md:hidden w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Search
        </button>
      </form>

      {/* Overlay for mobile filter */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Search Results */}
      <SearchResults searchTerm={searchTerm} searchType={searchType} />
    </div>
  );
}
