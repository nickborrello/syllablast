import { Coordinate } from "./coordinate";

class Board {
  public syllables: string[][];
  public finalSyllables: string[][];

  constructor(initial: string[][], finalSyllables: string[]) {
    this.syllables = JSON.parse(JSON.stringify(initial)); // Deep copy
    this.finalSyllables = this.parseWords(finalSyllables);
  }

  hasWon(): boolean {
    return this.score() == 16;
  }

  score(): number {
    let score = 0;
    for (let i = 0; i < this.syllables.length; i++) {
      for (let j = 0; j < this.syllables[i].length; j++) {
        if (this.isValid(new Coordinate(i, j))) {
          score++;
        } else {
          continue;
        }
      }
    }
    return score;
  }

  swapSyllables(coordinate1: Coordinate, coordinate2: Coordinate) {
    const temp = this.syllables[coordinate1.row][coordinate1.column];
    this.syllables[coordinate1.row][coordinate1.column] =
      this.syllables[coordinate2.row][coordinate2.column];
    this.syllables[coordinate2.row][coordinate2.column] = temp;
  }

  isValid(coordinate: Coordinate): boolean {
    const rowSyllables = this.syllables[coordinate.row].map(
      (syllable) => syllable
    );
    let currentRow = null;
    for (let i = 0; i <= coordinate.column; i++) {
      if (i == 0) {
        for (let j = 0; j <= 3; j++) {
          if (rowSyllables[0] == this.finalSyllables[j][0]) {
            currentRow = j;
            break;
          }
        }
        if (currentRow == null) {
          return false;
        }
      }
      // Any other row
      else {
        if (currentRow != null) {
          if (rowSyllables[i] == this.finalSyllables[currentRow][i]) {
            continue;
          } else {
            return false;
          }
        }
      }
    }
    return true;
  }

  parseWords(words: string[]): string[][] {
    return words.map((word: string) => word.split(","));
  }
}

export { Board };
