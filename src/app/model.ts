import { Move } from "./move";
import { config1, config2, config3 } from "./puzzles";
import { Board } from "./board";

class Model {
  private moves: Move[] = [];
  private board: Board;
  private config: { name: string; words: string[]; initial: string[][] };
  private configs = [config1, config2, config3];

  constructor(config: { name: string; words: string[]; initial: string[][] }) {
    this.board = new Board(config1.initial, config1.words);
    this.moves = [];
    this.config = config;
  }

  reset() {
    this.board = new Board(this.config.initial, this.config.words);
    this.moves = [];
  }
}
