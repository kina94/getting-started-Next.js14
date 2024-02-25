import MovieCredits from "@components/movie-credits";
import { IParams } from "../page";

export default function CreditsPage({ params: { id } }: IParams) {
  return <MovieCredits id={id} />;
}
