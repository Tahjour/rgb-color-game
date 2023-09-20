import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { useCallback, useEffect, useState } from "react";

export default function SpotTheColorGame() {
  const numberOfColors = 9;
  const [colors, setColors] = useState<string[]>([]);
  const [winningColor, setWinningColor] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [newColorsButtonText, setNewColorsButtonText] = useState("New Colors");
  const [headerColor, setHeaderColor] = useState("steelblue");

  const setRandomColors = useCallback((squareNum: number) => {
    let randomColors = [];
    for (let x = 0; x < squareNum; x++) {
      randomColors[x] = randomColorGen();
    }
    return randomColors;
  }, []);

  const newGame = useCallback(() => {
    const newColors = setRandomColors(numberOfColors);
    const newWinningColor = pickRandomColor(newColors);
    setColors(newColors);
    setWinningColor(newWinningColor);
    setHeaderColor("steelblue");
    setNewColorsButtonText("New Colors");
    setStatusMessage("");
  }, [numberOfColors, setRandomColors]);

  useEffect(() => {
    newGame();
  }, [newGame]);

  function randomColorGen() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  function pickRandomColor(colors: string[]) {
    const randomNum = Math.floor(Math.random() * colors.length);
    return colors[randomNum];
  }

  function handleSquareClick(clickedSquareColor: string, clickedSquareColorIndex: number) {
    if (clickedSquareColor === winningColor) {
      setHeaderColor(winningColor);
      setNewColorsButtonText("Play Again?");
      setStatusMessage("CORRECT!");
      const newColors = colors.map((color, index) => {
        return winningColor;
      });
      setColors(newColors);
    } else {
      const newColors = colors.slice();
      newColors[clickedSquareColorIndex] = "transparent";
      setColors(newColors);
      setStatusMessage("TRY AGAIN!");
    }
  }

  function handleNewColorsButtonClick() {
    newGame();
  }

  return (
    <section className="spotTheColorGameBox">
      <h1 style={{ backgroundColor: headerColor }}>
        <span id="winningColorDisplay">{winningColor}</span>
      </h1>

      <div id="statusStripeBox">
        <button onClick={handleNewColorsButtonClick}>{newColorsButtonText}</button>
      </div>

      <span id="statusMessageSpan">{statusMessage}</span>
      <div id="colorSquaresBox">
        {colors.map((color, index) => (
          <div
            key={index}
            className="colorSquare"
            style={{ backgroundColor: color }}
            onClick={() => handleSquareClick(color, index)}
          ></div>
        ))}
      </div>
    </section>
  );
}
