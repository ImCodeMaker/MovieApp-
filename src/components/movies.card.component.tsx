import moviecardInterface from "@/interfaces/moviecard.page.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const MovieCardPage: React.FC<moviecardInterface> = ({
  image,
  title,
  description,
  movie_id
}) => {
  return (
    <Link href={`/movies/${movie_id}`} className="flex flex-col w-64 bg-transparent cursor-pointer group">
      <div className="relative w-full h-96 mb-4 overflow-hidden rounded-lg">
        <Image 
          src={`https://image.tmdb.org/t/p/w500${image}`} 
          alt={`${title} movie poster`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

      </div>
      
      <div className="text-left px-1">
        <h3 className="font-bold text-xl mb-2 text-white leading-tight">
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-gray-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};