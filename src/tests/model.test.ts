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

  beforeEach(() => {
    model = new Model(config1);
    coord1 = new Coordinate(0, 0);
    coord2 = new Coordinate(1, 1);
  });

  test("should set selected syllables with valid input", () => {
    const selectedSyllables = [coord1, coord2];
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
    coord1 = new Coordinate(0, 0);
    coord2 = new Coordinate(1, 1);
  });

  test("should undo the last move when moves exist and board has not been won", () => {
    model.swapSyllables(coord1, coord2);

    expect(model.getMoveCount()).toBe(1);

    model.undo();

    expect(model.getMoveCount()).toBe(0);

    expect(model.board.syllables[0][0]).toBe(model.config.initial[0][0]);
    expect(model.board.syllables[1][1]).toBe(model.config.initial[1][1]);
  });

  test("should not undo if no moves exist", () => {
    model.undo();

    expect(model.getMoveCount()).toBe(0);

    expect(model.board.syllables[0][0]).toBe(model.config.initial[0][0]);
    expect(model.board.syllables[1][1]).toBe(model.config.initial[1][1]);
  });

  test("should not undo if the board has been won", () => {
    vi.spyOn(model.board, "hasWon").mockReturnValue(true);

    model.swapSyllables(coord1, coord2);

    expect(model.getMoveCount()).toBe(1);

    model.undo();

    expect(model.getMoveCount()).toBe(1);
  });
});
