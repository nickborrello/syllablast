import { parse } from "path";
import { Coordinate } from "./coordinate";

class Board {
  private syllables: string[][];
  public finalSyllables: string[][];

  constructor(syllables: string[][], finalSyllables: string[]) {
    this.syllables = syllables;
    this.finalSyllables = this.parseWords(finalSyllables);
  }

  hasWon(): boolean {
    return this.score() == this.finalSyllables.length;
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

  // Validates whether the row of the given coordinate forms a complete word from the solution
  isValid(coordinate: Coordinate): boolean {
    // Retrieve the row of syllables where the coordinate is located
    const rowSyllables = this.syllables[coordinate.row].map(
      (syllable) => syllable
    );

    console.log(rowSyllables);

    // for each syllable in the row
    let currentRow = 0;
    for (let i = 0; i <= coordinate.column; i++) {
      // first syllable
      if (i == 0) {
        // check for the first syllable in the finalSyllables
        for (let j = 0; j < this.finalSyllables.length; j++) {
          // if the syllable is found, set the currentRow to the index of the syllable
          if (rowSyllables[i] == this.finalSyllables[j][0]) {
            currentRow = j;
            break;
          } else {
            continue;
          }
        }
      } else {
        // check for the next syllables in the finalSyllables
        if (rowSyllables[i] == this.finalSyllables[currentRow][i]) {
          continue;
        } else {
          console.log(
            rowSyllables[i] + " =/= " + this.finalSyllables[currentRow][i]
          );
          return false;
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
