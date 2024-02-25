import MovieProvider from "@components/movie-provider";
import { IParams } from "../page";

export default function ProvidersPage({ params: { id } }: IParams) {
  return <MovieProvider id={id} />;
}
