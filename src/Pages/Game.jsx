import React, { useState, useEffect, useCallback } from "react";
import "../App.css";

const words = [
  "APPLE","BRICK","CROWN","DREAM","FLAME",
  "GRASP","HOUSE","JELLY","KNIFE","LAUGH",
  "PLANT","SHINE","STONE","VIRAL","WAVES",
  "CLOUD","BLEND","TRUST","SWEET","HONEY",
  "PRIDE","LEMON","SMILE","SLICK","MOUNT",
  "FROST","GLASS","CHAIR","THING","PEACH",
];

function Game() {
  const randomWord = React.useMemo(
    () => words[Math.floor(Math.random() * words.length)],
    []
  );

  const [grid, setGrid] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({ letter: "", color: "" }))
    )
  );

  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [message, setMessage] = useState("Wordle Game");
  const [keyColors, setKeyColors] = useState({});

  // ✅ HANDLE KEY PRESS
  const handleKey = useCallback((letter) => {
    if (col >= 5 || row >= 6) return;

    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
    newGrid[row][col].letter = letter;

    setGrid(newGrid);
    setCol(col + 1);
    setCurrentWord(currentWord + letter);
  }, [col, row, grid, currentWord]);

  // ✅ HANDLE ENTER
  const handleEnter = useCallback(() => {
    if (col !== 5) return;

    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
    let newKeyColors = { ...keyColors };

    // WIN
    if (currentWord === randomWord) {
      for (let j = 0; j < 5; j++) {
        newGrid[row][j].color = "green";
      }
      setGrid(newGrid);
      setMessage("You Win 🥳🥳");
      setTimeout(() => window.location.reload(), 4500);
      return;
    }

    // Count letters
    const letterCount = {};
    for (let char of randomWord) {
      letterCount[char] = (letterCount[char] || 0) + 1;
    }

    // GREEN first
    for (let j = 0; j < 5; j++) {
      const letter = currentWord[j];
      if (letter === randomWord[j]) {
        newGrid[row][j].color = "green";
        letterCount[letter]--;
        newKeyColors[letter] = "green";
      }
    }

    // YELLOW / GRAY
    for (let j = 0; j < 5; j++) {
      const letter = currentWord[j];

      if (newGrid[row][j].color === "green") continue;

      if (letterCount[letter] > 0) {
        newGrid[row][j].color = "yellow";
        letterCount[letter]--;

        if (newKeyColors[letter] !== "green") {
          newKeyColors[letter] = "yellow";
        }
      } else {
        newGrid[row][j].color = "gray";

        if (!newKeyColors[letter]) {
          newKeyColors[letter] = "gray";
        }
      }
    }

    setGrid(newGrid);
    setKeyColors(newKeyColors);

    // ✅ MOVE STATE UPDATES OUTSIDE
    if (row === 5) {
      setMessage("You Lose ☹️☹️");
      setTimeout(() => window.location.reload(), 4500);
    } else {
      setRow(row + 1);
      setCol(0);
      setCurrentWord("");
    }
  }, [col, currentWord, randomWord, row, grid, keyColors]);

  // ✅ HANDLE BACKSPACE
  const handleBackspace = useCallback(() => {
    if (col === 0) return;

    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
    newGrid[row][col - 1].letter = "";

    setGrid(newGrid);
    setCol(col - 1);
    setCurrentWord(currentWord.slice(0, -1));
  }, [col, row, grid, currentWord]);

  // ✅ KEYBOARD LISTENER
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") handleEnter();
      else if (e.key === "Backspace") handleBackspace();
      else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKey(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEnter, handleBackspace, handleKey]);

  const keyboard = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"],
  ];

  return (
    <div className="mainContainer">
      <h1>{message}</h1>

      {/* GRID */}
      <div className="wordContainer">
        {grid.map((r, i) =>
          r.map((cell, j) => (
            <div key={`${i}-${j}`} className={`cell ${cell.color}`}>
              {cell.letter}
            </div>
          ))
        )}
      </div>

      {/* KEYBOARD */}
      {keyboard.map((rowKeys, i) => (
        <div
          key={i}
          className={
            i === 0
              ? "firstKeyboard"
              : i === 1
              ? "secondKeyboard"
              : "thirdKeyboard"
          }
        >
          {rowKeys.map((key) => (
            <div
              key={key}
              className={`keys ${keyColors[key] || ""}`}
              onClick={() => handleKey(key)}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Game;