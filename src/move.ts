import { Coordinate } from "./coordinate";

class Move {
  public coordinate1: Coordinate;
  public coordinate2: Coordinate;

  constructor(coordinate1: Coordinate, coordinate2: Coordinate) {
    this.coordinate1 = coordinate1;
    this.coordinate2 = coordinate2;
  }
}

export { Move };
