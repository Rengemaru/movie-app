import { useParams } from "react-router";
import { useEffect, useState } from "react";

type MovieDetailJson = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: string;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type Movie = {
  id: string,
  original_title: string,
  overview: string,
  poster_path: string,
  year: number,
  rating: number,
  runtime: number,
  score: number,
  genres: string[],
}

function MovieDetail(){
  // useParams
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  const fetchMovieDetail = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ja`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    const data = (await response.json()) as MovieDetailJson;
    setMovie({
          id: data.id,
          original_title: data.original_title,
          overview: data.overview,
          poster_path: data.poster_path,
           year: Number(data.release_date.split("-")[0]),
          rating: data.vote_average,
          runtime: data.runtime,
          score: data.vote_count,
          genres: data.genres.map((genre: { id: number; name: string}) => genre.name),
        });
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [])

  return(
    <div>
      {movie && (
      <div>
        <h2>{movie.original_title}</h2>
        <img src={`https://media.themoviedb.org/t/p/w300_and_h450_face/${movie.poster_path}`} />
        <p>{movie.overview}</p>
        <p>{movie.year}</p>
        <p>{movie.rating}</p>
        <p>{movie.runtime}</p>
        <p>{movie.score}</p>
        <p>{movie.genres}</p>
      </div>
      )}
    </div>
  )
}

export default MovieDetail;