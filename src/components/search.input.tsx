"use client";

import { useMovies } from "@/contexts/moviesContexts";
import { useRouter } from "next/navigation";
import { KeyboardEvent } from "react";

export default function SearchInput() {
  const { movieName, setMovieName } = useMovies();
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && movieName.trim()) {
      router.push(`/movies/moviequery?query=${encodeURIComponent(movieName.trim())}`);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for movies... Press Enter"
      value={movieName}
      onChange={(e) => setMovieName(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-72 h-10 rounded-md bg-white px-4 text-sm placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  );
}
