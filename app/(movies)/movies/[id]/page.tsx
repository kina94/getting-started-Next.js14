import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

export default function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <h1>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading move video</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </h1>
  );
}
