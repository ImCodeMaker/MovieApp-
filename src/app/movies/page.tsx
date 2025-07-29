"use client";
import { MovieCardPage } from "@/components/movies.card.component";
import Movie from "@/interfaces/movies.interface";
import moviesFetcher from "@/services/movies.services";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MoviesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const pageFromUrl = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState<number>(
    pageFromUrl ? parseInt(pageFromUrl, 10) : 1
  );
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const movieData: Movie[] = await moviesFetcher(currentPage);

        if (movieData == null || movieData.length == 0) {
          setError("There was an error fetching the movies.");
        }
        setLoading(false);
        setError(null);
        setData(movieData);
      } catch (error) {
        console.error("There was an error fetching the movies", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updateURL(newPage);
    }
  };

  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    updateURL(newPage);
  };

  if (error) {
    return (
      <section className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-red-400 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-black to-gray-800">
        <div className="flex flex-col items-start justify-start p-4">
          <h1 className="font-extrabold text-white text-3xl mb-4">Movies</h1>
          <div className="bg-white h-1 w-[95dvw] rounded-md"></div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center space-x-2 text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <span className="text-lg">Loading movies...</span>
            </div>
          </div>
        )}

        {!loading && (
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-6">
              {data.map((movie) => (
                <div key={movie.id}>
                  <MovieCardPage
                    movie_id={movie.id}
                    image={movie.poster_path}
                    title={movie.title}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && data.length > 0 && (
          <div className="flex items-center justify-center gap-6 py-8">
            <button
              onClick={handlePrevious}
              disabled={currentPage <= 1 || loading}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-3">
              <span className="text-white font-medium text-lg">
                Page {currentPage}
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
            >
              Next
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        )}

        {!loading && data.length === 0 && !error && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">No movies found</h2>
              <p className="text-gray-400">Try refreshing the page or check back later.</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}