"use client";
import React from "react";
import { Model } from "../model";
import { config1, config2, config3 } from "../puzzles";
import { redrawBoard } from "../boundary";
import { Coordinate } from "@/coordinate";

export default function Home() {
  const [model, setModel] = React.useState(new Model(config1));
  const [redraw, setRedraw] = React.useState(0);

  const boardRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    redrawBoard(model, boardRef.current);
  }, [model, redraw]);

  // Function to handle selecting/deselecting a syllable
  function selectSyllable(coord: Coordinate) {
    // Check if the clicked syllable is already selected
    let selectedSyllables = model.selectedSyllables;
    const index = selectedSyllables.findIndex(
      (syllable) =>
        syllable.row === coord.row && syllable.column === coord.column
    );

    if (index !== -1) {
      // Syllable is already selected, so deselect it
      const newSelection = [...selectedSyllables];
      newSelection.splice(index, 1); // Remove syllable from selection
      model.setSelectedSyllables(newSelection);
    } else {
      // Syllable is not selected, add it to the selection
      if (selectedSyllables.length < 2) {
        model.setSelectedSyllables([...selectedSyllables, coord]);
      }
    }
  }

  function handleClick(e: any) {
    const boardElement = boardRef.current;
    if (!boardElement) {
      return; // Exit early if boardElement is null
    }

    const rect = boardElement.getBoundingClientRect();

    // Calculate which syllable was clicked based on position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const row = Math.floor(y / (rect.height / 4)); // 4x4 grid
    const col = Math.floor(x / (rect.width / 4));

    const coord = new Coordinate(row, col);
    selectSyllable(coord);
    setRedraw(redraw + 1);
  }

  // Handle swapping syllables
  function handleSwap() {
    let selectedSyllables = model.selectedSyllables;
    if (selectedSyllables.length === 2) {
      model.swapSyllables(selectedSyllables[0], selectedSyllables[1]);
      model.setSelectedSyllables([]); // Clear selection after swap
      setRedraw(redraw + 1);
    }
  }

  function handleConfig(config: {
    name: string;
    words: string[];
    initial: string[][];
  }) {
    console.log("Changing configuration to:", config);
    setModel(new Model(config));
    setRedraw(redraw + 1);
    console.log("Config changed to: " + config.name);
  }

  function handleUndo() {
    model.undo();
    setRedraw(redraw + 1);
  }

  function handleReset() {
    console.log("Resetting board...");
    model.reset();
    setRedraw(redraw + 1);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 gap-10">
      <div className="flex items-center justify-between w-96">
        <label data-testid="score" className="score">
          {"Score: " + model.board.score()}
        </label>
        <label data-testid="moves" className="moves">
          {"Total Moves: " + model.getMoveCount()}
        </label>
      </div>
      <div
        data-testid="board"
        className="board grid grid-cols-4 grid-rows-4"
        ref={boardRef}
        onClick={handleClick}
      ></div>
      <div className="controlsGroup flex items-center justify-between">
        <button
          data-testid="swap"
          className="controlButton"
          onClick={handleSwap}
          disabled={model.selectedSyllables.length < 2 || model.board.hasWon()} // Disable button unless 2 syllables are selected
        >
          Swap
        </button>
        <button
          data-testid="undo"
          className="controlButton"
          onClick={handleUndo}
          disabled={model.getMoveCount() === 0 || model.board.hasWon()} // Disable button if no moves have been made
        >
          Undo
        </button>
        <button
          data-testid="reset"
          className="controlButton"
          onClick={handleReset}
          disabled={model.getMoveCount() === 0 || model.board.hasWon()} // Disable button if no moves have been made
        >
          Reset
        </button>
      </div>
      <div className="configGroup flex items-center justify-between">
        <button
          data-testid="1"
          className={`configButton ${
            model.config.name === config1.name ? "border border-white-500" : ""
          }`} // Add border if selected
          onClick={() => handleConfig(config1)}
        >
          1
        </button>
        <button
          data-testid="2"
          className={`configButton ${
            model.config.name === config2.name ? "border border-white-500" : ""
          }`} // Add border if selected
          onClick={() => handleConfig(config2)}
        >
          2
        </button>
        <button
          data-testid="3"
          className={`configButton ${
            model.config.name === config3.name ? "border border-white-500" : ""
          }`} // Add border if selected
          onClick={() => handleConfig(config3)}
        >
          3
        </button>
      </div>
      {model.board.hasWon() && (
        <div className="congratulations-popup">
          <div className="congratulations-message">
            <h2>Congratulations!</h2>
            <p>You've completed the puzzle!</p>
            <button onClick={handleReset}>Play Again</button>
          </div>
        </div>
      )}
    </main>
  );
}
