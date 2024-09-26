class Coordinate {
  constructor(public x: number, public y: number) {}
}

class Move {
  constructor(public square1: Coordinate, public square2: Coordinate) {}
}

// Example usage:
const start = new Coordinate(0, 0);
const end = new Coordinate(1, 1);
const move = new Move(start, end);

console.log(move);
