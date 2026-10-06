import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

export default function StarRating({
  maxRating = 5,
  color = "#FFF220",
  size = 48,
  messages = [],
  defaultRating=0,
  setMovieRating
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleSetRating(param) {
    setRating((prev) => (prev === param ? param - 1 : param));
    setMovieRating((prev) => (prev === param ? param - 1 : param));
  }

  function handleHoverIn(param) {
    setTempRating(param);
  }

  function handleHoverOut() {
    setTempRating(0);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    fontSize: `${size / 1.5}px`,
    color: color,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, index) => (
          <Star
            key={index}
            handleSetRating={handleSetRating}
            index={index + 1}
            rating={rating || tempRating}
            handleHoverIn={handleHoverIn}
            handleHoverOut={handleHoverOut}
            color={color}
            size={size}
          />
        ))}
      </div>
      {/* <p style={textStyle}>rating || tempRating || ""}</p> */}
      <p style={textStyle}>
        {tempRating
          ? messages?.[tempRating - 1] || tempRating
          : rating
          ? messages?.[rating - 1] || rating
          : ""}
      </p>
    </div>
  );
}

function Star({
  handleSetRating,
  index,
  rating,
  handleHoverIn,
  handleHoverOut,
  color,
  size,
}) {
  const fillColor = index <= rating ? color : "none";
  const strokeColor = color;

  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    cursor: "pointer",
    display: "block",
  };

  return (
    <span
      style={starStyle}
      onClick={() => handleSetRating(index)}
      onMouseEnter={() => handleHoverIn(index)}
      onMouseLeave={() => handleHoverOut()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        stroke={strokeColor}
        fill={fillColor}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </span>
  );
}
