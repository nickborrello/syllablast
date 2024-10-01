import { Model } from "./model";
import { Board } from "./board";
import { Coordinate } from "./coordinate";
import { config1, config2, config3 } from "./puzzles";

export function drawBoard(board: Board) {}

export function redrawBoard(model: Model, boardObj: any) {
  const board = model.board;
  const syllables = board.syllables;
  const selectedSyllables = model.selectedSyllables;

  boardObj.innerHTML = ""; // Clear the board before redrawing

  for (let row = 0; row < syllables.length; row++) {
    for (let col = 0; col < syllables[row].length; col++) {
      const syllable = syllables[row][col];
      const div = document.createElement("div");

      div.innerHTML = syllable;
      div.className = "syllable";

      // Check if the current syllable is selected
      const isSelected = selectedSyllables.some(
        (selected) => selected.row === row && selected.column === col
      );

      if (isSelected) {
        div.style.border = "2px solid white"; // Add white border to selected syllable
      }

      const isValid = board.isValid(new Coordinate(row, col));

      if (isValid) {
        div.style.backgroundColor = "green"; // Highlight valid syllables
      }

      boardObj.appendChild(div);
    }
  }
}
