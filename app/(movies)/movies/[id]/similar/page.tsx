import { IParams } from "../page";
import styles from "@styles/home.module.css";
import Movie from "@components/movie";
import { URL } from "@constants/api";

async function getSimiliarMovie(id: string) {
  const response = await fetch(`${URL}/${id}/similar`);
  const json = await response.json();
  return json;
}

export default async function SimilarPage({ params: { id } }: IParams) {
  const movies = await getSimiliarMovie(id);

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
