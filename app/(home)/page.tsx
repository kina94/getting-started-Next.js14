import { Metadata } from "next";
import Movie from "../../components/movie";

export const metadata: Metadata = {
  title: "Home",
};

export const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
import styles from "../../styles/home.module.css";

async function getMovies() {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
        />
      ))}
    </div>
  );
}
