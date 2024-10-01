import { Move } from "./move";
import { config1, config2, config3 } from "./puzzles";
import { Board } from "./board";
import { Coordinate } from "./coordinate";

class Model {
  private moves: Move[] = [];
  public board: Board;
  public config: { name: string; words: string[]; initial: string[][] };
  private configs = [config1, config2, config3];
  public selectedSyllables: Coordinate[] = [];

  constructor(config: { name: string; words: string[]; initial: string[][] }) {
    this.config = config;
    this.board = new Board(this.config.initial, this.config.words);
    this.moves = [];
  }

  reset() {
    console.log("Board Before Reset: " + this.board.syllables[0][0]);
    this.board = new Board(this.config.initial, this.config.words);
    console.log("Board After Reset: " + this.board.syllables[0][0]);
    this.moves = [];
  }

  getMoveCount(): number {
    return this.moves.length;
  }

  swapSyllables(coordinate1: Coordinate, coordinate2: Coordinate) {
    this.moves.push(new Move(coordinate1, coordinate2));
    this.board.swapSyllables(coordinate1, coordinate2);
  }

  setSelectedSyllables(selectedSyllables: Coordinate[]) {
    this.selectedSyllables = selectedSyllables;
  }

  undo() {
    console.log("moves:" + this.moves.length);
    console.log("won:" + this.board.hasWon());
    if (this.moves.length > 0 && !this.board.hasWon()) {
      const lastMove = this.moves.pop();
      console.log(
        "Last move: " + lastMove?.coordinate1 + " " + lastMove?.coordinate2
      );
      if (lastMove) {
        this.board.swapSyllables(lastMove.coordinate2, lastMove.coordinate1);
      }
    } else {
      console.log("Cannot undo move");
    }
  }
}

export { Model };
