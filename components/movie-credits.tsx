import { URL } from "../constants/api";
import styles from "../styles/movie-credits.module.css";

async function getMovieCredits(id: string) {
  const response = await fetch(`${URL}/${id}/credits`);
  return response.json();
}

export default async function MovieCredits({ id }: { id: string }) {
  const credits = await getMovieCredits(id);

  return (
    <div className={styles.container}>
      {credits.map((credit) => (
        <div>
          <img src={credit.profile_path} className={styles.profile} />
          <div className={styles.info}>
            <h2 className={styles.title}>{credit.name}</h2>
            <p className={styles.character}>{credit.character}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
