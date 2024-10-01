import { Model } from "./model";
import { Coordinate } from "./coordinate";

export function redrawBoard(model: Model, boardObj: any) {
  const board = model.board;
  const syllables = board.syllables;
  const selectedSyllables = model.selectedSyllables;

  boardObj.innerHTML = "";

  for (let row = 0; row < syllables.length; row++) {
    for (let col = 0; col < syllables[row].length; col++) {
      const syllable = syllables[row][col];
      const div = document.createElement("div");

      div.innerHTML = syllable;
      div.className = "syllable";

      const isSelected = selectedSyllables.some(
        (selected) => selected.row === row && selected.column === col
      );

      if (isSelected) {
        div.style.border = "2px solid white";
      }

      const isValid = board.isValid(new Coordinate(row, col));

      if (isValid) {
        div.style.backgroundColor = "green";
      }

      boardObj.appendChild(div);
    }
  }
}
