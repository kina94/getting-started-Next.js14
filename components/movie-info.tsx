import Link from "next/link";
import { URL } from "@constants/api";
import styles from "@styles/movie-info.module.css";

export async function getMovie(id: string) {
  const response = await fetch(`${URL}/${id}}`);
  return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return (
    <div className={styles.container}>
      <img src={movie.poster_path} className={styles.poster} />
      <div className={styles.info}>
        <h2 className={styles.title}>{movie.title}</h2>
        <h3>★ {movie.vote_average.toFixed(1)}</h3>
        <p>{movie.overview}</p>
        <a href={movie.homepage} target={"_blank"}>
          HomePage &rarr;
        </a>
        <Link prefetch href={`/movies/${id}/credits`}>
          Credits &rarr;
        </Link>
        <Link prefetch href={`/movies/${id}/providers`}>
          Providers &rarr;
        </Link>
        <Link prefetch href={`/movies/${id}/similar`}>
          Similar &rarr;
        </Link>
      </div>
    </div>
  );
}
