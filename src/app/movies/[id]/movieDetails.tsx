"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { moviesFetcherById } from "@/services/movies.services";
import Movie from "@/interfaces/movies.interface";
import Image from "next/image";

export default function MovieDetailClient() {
  const params = useParams();
  const movieId = params.id;
  const [data, setData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!movieId) return;
      
      setLoading(true);
      setError(null);

      try {
        const movies: Movie = await moviesFetcherById(Number(movieId));

        if (!movies) {
          throw new Error("Película no encontrada, intenta de nuevo.");
        }

        setData(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error instanceof Error ? error.message : "Ocurrió un error");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movieId]);

  // Estado de carga
  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="text-white text-xl">Cargando película...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex items-center justify-center min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="text-red-400 text-xl text-center">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  if (!data || !data.backdrop_path) {
    return (
      <main className="flex items-center justify-center min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="text-white text-xl">No se encontró la imagen de la película</div>
      </main>
    );
  }

  return (
    <main className="relative flex items-center justify-center min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Image 
          alt={`Imagen de fondo de ${data.title || data.original_title || 'la película'}`}
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>
      
      {/* Contenido sobre la imagen */}
      <div className="relative z-20 text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          {data.title || data.original_title}
        </h1>
        {data.overview && (
          <p className="text-lg md:text-xl max-w-4xl mx-auto drop-shadow-md opacity-90">
            {data.overview}
          </p>
        )}
        
        {/* Información adicional */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm md:text-base">
          {data.release_date && (
            <span className="bg-black/50 px-3 py-1 rounded-full">
              {new Date(data.release_date).getFullYear()}
            </span>
          )}
          {data.vote_average && (
            <span className="bg-yellow-600/80 px-3 py-1 rounded-full">
              ⭐ {data.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </main>
  );
}