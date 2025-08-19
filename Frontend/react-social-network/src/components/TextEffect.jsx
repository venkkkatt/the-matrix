import React, { useState } from "react";

const TextEffect = ({ text }) => {
  const letters = "abcdefghijklmnopqrstuvwxyz01";
  const [displayedText, setDisplayedText] = useState(text);

  let interval = null;

  const handleMouseOver = () => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      setDisplayedText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * 28)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 25);
  };

  return (
    <h1
      onMouseOver={handleMouseOver}
      data-value={text}
      //   className="text-3xl text-matrix-green font-poppins"
      style={{ cursor: "pointer" }}>
      {displayedText}
    </h1>
  );
};

export default TextEffect;
