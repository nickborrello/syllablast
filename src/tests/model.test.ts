import { Coordinate } from "../coordinate";
import { Model } from "../model";
import { config1 } from "../puzzles";
import { describe, it, expect, vi, beforeEach, test } from "vitest";

describe("Model", () => {
  let model: Model;

  beforeEach(() => {
    model = new Model(config1);
  });

  it("should initialize with the correct configuration", () => {
    expect(model.getMoveCount()).toBe(0);
  });

  it("should reset the board and clear moves", () => {
    model.swapSyllables(new Coordinate(0, 0), new Coordinate(0, 1));
    expect(model.getMoveCount()).toBe(1);

    model.reset();
    expect(model.getMoveCount()).toBe(0);
  });

  it("should return the correct score", () => {
    const score = model.board.score();
    expect(score).toBe(0);
  });

  it("should return the correct move count", () => {
    expect(model.getMoveCount()).toBe(0);

    model.swapSyllables(new Coordinate(0, 0), new Coordinate(0, 1));
    expect(model.getMoveCount()).toBe(1);
  });

  it("should swap syllables and track moves", () => {
    const coord1 = new Coordinate(0, 0);
    const coord2 = new Coordinate(0, 1);
    model.swapSyllables(coord1, coord2);

    expect(model.getMoveCount()).toBe(1);
  });
});

describe("setSelectedSyllables Tests", () => {
  let model: Model;
  let coord1: Coordinate;
  let coord2: Coordinate;
  let selectedSyllables: Coordinate[];

  beforeEach(() => {
    model = new Model(config1);
    coord1 = new Coordinate(0, 0);
    coord2 = new Coordinate(1, 1);
  });

  test("should set selected syllables with valid input", () => {
    let selectedSyllables = [coord1, coord2];
    model.setSelectedSyllables([coord1, coord2]);
    console.log(model.selectedSyllables);
    expect(model.selectedSyllables).toEqual(selectedSyllables);
  });

  test("should set selected syllables with an empty array", () => {
    model.setSelectedSyllables([]);
    console.log(model.selectedSyllables);
    expect(model.selectedSyllables).toEqual([]);
  });
});

describe("undo Tests", () => {
  let model: Model;
  let coord1: Coordinate;
  let coord2: Coordinate;

  beforeEach(() => {
    model = new Model(config1);
    coord1 = new Coordinate(0, 0); // Valid coordinates (adjust as necessary)
    coord2 = new Coordinate(1, 1); // Valid coordinates (adjust as necessary)
  });

  test("should undo the last move when moves exist and board has not been won", () => {
    // Perform a move
    model.swapSyllables(coord1, coord2);

    // Verify that the move was added
    expect(model.getMoveCount()).toBe(1);

    // Undo the move
    model.undo();

    // After undo, there should be no moves left
    expect(model.getMoveCount()).toBe(0);

    // Check if the syllables were swapped back
    expect(model.board.syllables[0][0]).toBe(model.config.initial[0][0]);
    expect(model.board.syllables[1][1]).toBe(model.config.initial[1][1]);
  });

  test("should not undo if no moves exist", () => {
    // Try to undo with no moves made
    model.undo();

    // Ensure move count is still 0
    expect(model.getMoveCount()).toBe(0);

    // Ensure the board hasn't changed
    expect(model.board.syllables[0][0]).toBe(model.config.initial[0][0]);
    expect(model.board.syllables[1][1]).toBe(model.config.initial[1][1]);
  });

  test("should not undo if the board has been won", () => {
    // Mock the hasWon method to simulate a winning condition
    vi.spyOn(model.board, "hasWon").mockReturnValue(true);

    // Perform a move
    model.swapSyllables(coord1, coord2);

    // Verify the move was made
    expect(model.getMoveCount()).toBe(1);

    // Try to undo after board has been won
    model.undo();

    // Ensure the move is not undone since the board is won
    expect(model.getMoveCount()).toBe(1);
  });
});
