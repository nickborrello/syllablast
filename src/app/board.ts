class Board {
  private syllables: string[];
  private finalSyllables: string[];

  constructor(syllables: string[], finalSyllables: string[]) {
    this.syllables = syllables;
    this.finalSyllables = finalSyllables;
  }

  hasWon(): boolean {
    // Implement your logic to determine if the game is won
    return this.syllables.join("") === this.finalSyllables.join("");
  }

  score(): number {
    // Implement your logic to calculate the score
    return this.syllables.length;
  }

  isValid(coordinate: Coordinate): boolean {
    // Implement your logic to validate a coordinate

    return coordinate.x >= 0 && coordinate.y >= 0;
  }
}

interface Coordinate {
  x: number;
  y: number;
}
