// movies.services.ts
import Movie, { MoviesApiResponse } from "@/interfaces/movies.interface";

export default async function moviesFetcher(pageNumber: number): Promise<Movie[]> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; 
  if (!apiKey) {
    throw new Error("API key is not defined.");
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: MoviesApiResponse = await response.json();
    return data.results; 
  } catch (error) {
    throw new Error(
      `Failed to fetch movies: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export  async function moviesFetcherById(movie_id: number): Promise<Movie> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; 
  if (!apiKey) {
    throw new Error("API key is not defined.");
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: Movie = await response.json();
    return data; 
  } catch (error) {
    throw new Error(
      `Failed to fetch movies: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}