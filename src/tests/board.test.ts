import { Coordinate } from "../coordinate";
import { Board } from "../board";
import { config1, config2 } from "../puzzles";
import { test, expect } from "vitest";

test("isValid returns true if the syllable is in a valid position", () => {
  const board = new Board(
    [
      ["im", "mac", "late", "u"],
      ["af", "fil", "i", "ate"],
      ["un", "der", "wa", "ter"],
      ["in", "vis", "i", "ble"],
    ],
    config1.words
  );
  const coordinate = new Coordinate(0, 1);
  expect(board.isValid(coordinate)).toBe(true);
});

test("isValid returns false if the syllable is in a invalid position", () => {
  const board = new Board(
    [
      ["im", "mac", "late", "u"],
      ["af", "fil", "i", "ate"],
      ["un", "der", "wa", "ter"],
      ["in", "vis", "i", "ble"],
    ],
    config1.words
  );
  const coordinate = new Coordinate(0, 3);
  expect(board.isValid(coordinate)).toBe(false);
});

test("isValid returns false if the syllable is in a invalid position", () => {
  const board = new Board(
    [
      ["im", "mac", "late", "u"],
      ["af", "fil", "wa", "ate"],
      ["un", "der", "i", "ter"],
      ["in", "vis", "wa", "ble"],
    ],
    config1.words
  );
  const coordinate = new Coordinate(2, 2);
  expect(board.isValid(coordinate)).toBe(false);
});

test("score() returns 11", () => {
  const board = new Board(
    [
      ["ex", "am", "ri", "ing"],
      ["in", "for", "ma", "tive"],
      ["re", "in", "force", "ment"],
      ["in", "ma", "te", "al"],
    ],
    config2.words
  );
  expect(board.score()).toBe(11);
});

test("hasWon returns false if the score is not 16", () => {
  const board = new Board(
    [
      ["im", "mac", "late", "u"],
      ["af", "fil", "i", "ate"],
      ["un", "der", "wa", "ter"],
      ["in", "vis", "i", "ble"],
    ],
    config1.words
  );
  expect(board.hasWon()).toBe(false);
});

test("hasWon returns true if the score is 16", () => {
  const board = new Board(
    [
      ["im", "mac", "u", "late"],
      ["af", "fil", "i", "ate"],
      ["un", "der", "wa", "ter"],
      ["in", "vis", "i", "ble"],
    ],
    config1.words
  );
  expect(board.hasWon()).toBe(true);
});

test("swapSyllables results in two syllables being swapped", () => {
  const board = new Board(
    [
      ["im", "mac", "u", "late"],
      ["af", "fil", "i", "ate"],
      ["un", "der", "wa", "ter"],
      ["in", "vis", "i", "ble"],
    ],
    config1.words
  );
  board.swapSyllables(new Coordinate(0, 2), new Coordinate(0, 3));
  expect(board.syllables[0][2]).toBe("late");
  expect(board.syllables[0][3]).toBe("u");
});
