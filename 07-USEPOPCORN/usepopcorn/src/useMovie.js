import { useEffect } from "react";
import { useState } from "react";

const key = "ea7b1b10";

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong while fetching movies!");
        }

        const data = await res.json();
        // console.log(data);

        if (data.Response === "False") throw new Error("Movie not found!");

        setMovies(data?.Search);
        setError("");
        console.log("Effect");
      } catch (e) {
        // console.error(e);
        if (e.name !== "AbortError") {
          setError(e?.message || "Movie not found");
        }
      } finally {
        setLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setLoading(false);
      setError("");
      return;
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return {movies, loading, errorOccurred}
}
