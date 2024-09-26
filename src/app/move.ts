import { Coordinate } from "./coordinate";

class Move {
  private square1: Coordinate;
  private square2: Coordinate;

  constructor(square1: Coordinate, square2: Coordinate) {
    this.square1 = square1;
    this.square2 = square2;
  }
}

export { Move };
