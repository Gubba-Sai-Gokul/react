import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import useMovies from "./useMovie";
import useLocalStorage from "./useLocalStorage";
import useKey from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = "ea7b1b10";

export default function App() {
  const [watched, setWatched] = useLocalStorage([], "watched");

  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, loading, errorOccurred } = useMovies(query);

  function handleAddWatched(movie) {
    setWatched((watched) => {
      let index = watched.findIndex((item) => item?.imdbID === movie.imdbID);

      if (index === -1) {
        return [...watched, movie];
      }

      return watched;
    });

    // We can perform adding watched movie in this state updation function but the problem is we need to perform the same deletion from local storage on delete function. We can use useffected watched dependency to synchronize the operations.
    // const updatedWatched = () => {
    //   let index = watched.findIndex((item) => item?.imdbID === movie.imdbID);

    //   if (index === -1) {
    //     return [...watched, movie];
    //   }

    //   return watched;
    // };

    // localStorage.setItem("watched", JSON.stringify(updatedWatched()));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  // useEffect(() => {
  //   localStorage.setItem("watched", JSON.stringify(watched));
  // }, [watched]);

  return (
    <>
      <NavBar>
        <Search
          query={query}
          setQuery={setQuery}
          handleCloseMovie={handleCloseMovie}
        />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {loading ? <Loader /> : <MoviesList movies={movies}></MoviesList>} */}
          {loading && <Loader />}
          {errorOccurred && <Error message={errorOccurred} />}
          {!loading && !errorOccurred && (
            <MoviesList
              movies={movies}
              setSelectedId={setSelectedId}
            ></MoviesList>
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              handleCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  // useEffect(() => {
  //   const el = document.querySelector('.search');
  //   el.focus();
  // }, []);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });
  

  // useEffect(() => {
  //   function callBack(e) {
  //     if (e.key === "Enter") {
  //       if (document.activeElement === inputEl.current) return;
  //       inputEl.current.focus();
  //       setQuery("");
  //     }
  //   }

  //   document.addEventListener("keydown", callBack);

  //   return () => {
  //     document.removeEventListener("keydown", callBack);
  //   };
  // }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <Button isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

function MoviesList({ movies, setSelectedId }) {
  if (movies.length === 0) {
    return (
      <div className="noMovies">
        <p>Search for a movie</p>
      </div>
    );
  }

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} setSelectedId={setSelectedId} />
      ))}
    </ul>
  );
}

function Movie({ movie, setSelectedId }) {
  return (
    <li
      onClick={() =>
        setSelectedId((prevId) =>
          prevId === movie?.imdbID ? null : movie?.imdbID
        )
      }
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({
  handleCloseMovie,
  selectedId,
  setSelectedId,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie?.imdbID === selectedId
  )?.userRating;

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newMovie);
    setSelectedId(null);
  }

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
      );
      const data = await res.json();
      setIsLoading(false);
      setMovie(data);
    }

    getMovieDetails();
  }, [selectedId]);

  // Cleanup function will run on component unmount and also to clean up what side effect did so it will run before every effect happens to clean up.
  useEffect(() => {
    if (!title) return;
    // console.log(`Useffect runned for ${title}`);

    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usepopcorn";
      // console.log(`Cleanup effect for movie ${title} `);
    };
  }, [title]);

  useKey("Escape", handleCloseMovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedId(null)}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>You rated this movie with {watchedUserRating} ⭐</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    setMovieRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie?.imdbID)}
        ></button>
      </div>
    </li>
  );
}

function Button({ isOpen, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function Error({ message }) {
  return <p className="error">{message}</p>;
}
