import { createRoot } from "react-dom/client";
import './index.css'
import App from './App.jsx'
import StarRating from "./StarRating.jsx";
import { useState } from "react";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <>
      <StarRating color="blue" maxRating={10} setMovieRating={setMovieRating} />
      <p>This movie is rated with {movieRating}.</p>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <App />
  // <>
  //   <StarRating maxRating={5} defaultRating={3} />
  //   <StarRating
  //     color="red"
  //     size={24}
  //     messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
  //   />
  //   <Test />
  // </>
);
