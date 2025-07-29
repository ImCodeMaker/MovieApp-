import React, { useState } from "react";
import Image from "next/image";
import moviesCardInterfaces from "@/interfaces/movie.cards.interface";
import Link from "next/link";

export const MoviesCard: React.FC<moviesCardInterfaces> = ({ image, title, movie_id }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link 
      href={`/movies/${movie_id}`} 
      className="group relative h-64 w-44 sm:h-80 sm:w-52 md:h-[400px] md:w-56 lg:h-[450px] lg:w-60 rounded-xl sm:rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50 active:scale-[0.98] touch-manipulation"
    >
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900/80 animate-pulse">
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
            <div className="h-2 sm:h-3 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/30 to-gray-900/60 flex flex-col items-center justify-center">
          <div className="text-white/40 text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">🎭</div>
          <p className="text-white/60 text-xs sm:text-sm font-light">Unavailable</p>
        </div>
      )}

      {!imageError && (
        <Image
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt={title}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          quality={90}
          sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, (max-width: 1024px) 224px, 240px"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 group-hover:from-black/90 transition-all duration-500"></div>
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
        <h3 className="text-white font-medium text-sm sm:text-base leading-snug mb-2 sm:mb-3 group-hover:text-white/90 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <div className="h-px w-8 sm:w-10 md:w-12 bg-gradient-to-r from-white to-transparent opacity-60 group-hover:opacity-100 group-hover:w-10 sm:group-hover:w-12 md:group-hover:w-14 lg:group-hover:w-16 transition-all duration-500"></div>
      </div>

      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Link>
  );
};