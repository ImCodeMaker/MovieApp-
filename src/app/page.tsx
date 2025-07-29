"use client";
import { indexPageImages } from "@/constants/index.page";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import moviesFetcher from "@/services/movies.services";
import Movie from "@/interfaces/movies.interface";
import { MoviesCard } from "@/components/index.page.card.componets";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [movieIndex, setCurrentMovieIndex] = useState<number>(8);
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const selectedMovie = data[movieIndex];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const movies: Movie[] = await moviesFetcher(1);

        if (!movies || movies.length === 0) {
          throw new Error("No movies found, try again.");
        }

        setData(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      const next = (currentIndex + 1) % indexPageImages.length;
      setNextIndex(next);
      
      setTimeout(() => {
        setCurrentIndex(next);
        setIsTransitioning(false);
      }, 700); 
      
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentImage = indexPageImages[currentIndex];
  const nextImage = indexPageImages[nextIndex];

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-900 via-black to-gray-800">
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          src={currentImage.image}
          alt={currentImage.title}
          fill
          quality={100}
          priority
          unoptimized
        />

        <Image
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            isTransitioning ? "opacity-100" : "opacity-0"
          }`}
          src={nextImage.image}
          alt={nextImage.title}
          fill
          quality={100}
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10"></div>

        <div className="absolute bottom-6 left-6 text-left px-4 z-20">
          <h1 className="text-white text-4xl font-extrabold drop-shadow-md transition-all duration-700">
            {isTransitioning ? nextImage.title : currentImage.title}
          </h1>

          <p className="text-white text-lg mt-4 drop-shadow-sm max-w-2xl transition-all duration-700">
            {isTransitioning ? nextImage.text : currentImage.text}
          </p>
          <div className="space-x-3">
            <Link
              href="/login"
              className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get your Tickets
            </Link>
            <Link
              href="#"
              className="inline-block mt-4 px-6 py-2 border border-white rounded-md text-white font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/20 hover:border-gray-300"
            >
              Watch Trailer
            </Link>
          </div>
        </div>

        <div className="absolute bottom-4 right-6 flex space-x-2 z-20">
          {indexPageImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white shadow-lg"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => {
                if (index !== currentIndex) {
                  setIsTransitioning(true);
                  setNextIndex(index);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 700);
                }
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full bg-gradient-to-b from-black via-gray-900 to-black py-8">
        <div className="container mx-auto px-6">
          <h1 className="font-extrabold text-2xl mb-4 text-transparent bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text">
            Our Popular Movies
          </h1>
          <div className="mb-8 h-1 w-96 bg-gradient-to-r from-red-600 via-red-400 to-transparent rounded-full"></div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
                Loading Movies...
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-64">
              <div className="text-center p-6 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-700">
                <p className="text-red-200">Error: {error}</p>
              </div>
            </div>
          )}

          {!loading && !error && selectedMovie && (
            <div className="w-full">
              <div className="relative w-full h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-rose-700 via-red-800 to-neutral-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                <Image
                  src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                  alt={selectedMovie.title || "Movie backdrop"}
                  fill
                  className="object-contain bg-gradient-to-br from-black via-gray-900 to-black rounded-md"
                  quality={90}
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                  <h2 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
                    {selectedMovie.title}
                  </h2>
                  <p className="text-white/90 text-sm line-clamp-3 drop-shadow-md">
                    {selectedMovie.overview}
                  </p>
                  <div className="mt-3 flex items-center space-x-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      ⭐ {selectedMovie.vote_average?.toFixed(1)}
                    </span>
                    <span className="text-white/80 text-sm bg-gradient-to-r from-gray-800 to-gray-700 px-3 py-1 rounded-full border border-gray-600">
                      {selectedMovie.release_date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-gradient-to-b from-black via-gray-900 to-black py-8">
        <div className="container mx-auto px-6">
          <h1 className="font-extrabold text-2xl mb-4 text-transparent bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text">
            Popular movies this Week
          </h1>
          <div className="mb-8 h-1 w-96 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent rounded-full"></div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
                Loading Movies...
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-64">
              <div className="text-center p-6 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-700">
                <p className="text-red-200">Error: {error}</p>
              </div>
            </div>
          )}

          {!loading && !error && selectedMovie && (
            <div className="flex flex-row items-start gap-4 overflow-x-auto px-4 py-6">
              {data.slice(0, 5).map((movie, key) => (
                <MoviesCard
                  key={key}
                  image={movie.poster_path}
                  title={movie.original_title}
                  movie_id={movie.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}