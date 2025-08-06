'use client'
import React, { createContext, useState, ReactNode, useContext } from "react";
import { MovieNameContextType } from "@/interfaces/movies.context";

export const MoviesContext = createContext<MovieNameContextType | undefined>(undefined);

export const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const [movieName, setMovieName] = useState<string>("");

  return (
    <MoviesContext.Provider value={{ movieName, setMovieName }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = (): MovieNameContextType => {
  const context = useContext(MoviesContext);
  if (!context) throw new Error("useMovies must be used dentro de MoviesProvider");
  return context;
};
