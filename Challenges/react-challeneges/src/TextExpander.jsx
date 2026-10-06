import { useState } from "react";

export default function TextExpander({
  children,
  limit = 10,
  toggleColor = "blue",
  toggleSize = "16",
  textFontSize = "16",
  expandText = "Show More",
  collapseText = "Show Less"
}) {
  const [wordLimit, setWordLimit] = useState(limit);

  const text = children;
  let words = text?.split(" ");

  const textStyles = {
    fontSize: `${textFontSize}px`,
  };

  const spanStyles = {
    color: toggleColor,
    fontSize: `${toggleSize}px`,
    cursor: "pointer",
  };

  return (
    <div>
      <p style={textStyles}>
        {words?.length > wordLimit ? (
          <>
            {words?.slice(0, wordLimit).join(" ") + "... "}
            <span
              style={spanStyles}
              onClick={() => setWordLimit(words?.length)}
            >
              {expandText}
            </span>
          </>
        ) : (
          <>
            {text + " "}
            <span style={spanStyles} onClick={() => setWordLimit(limit)}>
              {collapseText}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
