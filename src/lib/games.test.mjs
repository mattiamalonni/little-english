import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { createRound, games, scoreRound, shuffle } from "./games.ts";

for (const game of games) {
  test(`${game.id}: vocabulary has unique names and a visual for every word`, () => {
    assert.ok(game.words.length >= 21);
    assert.equal(
      new Set(game.words.map((word) => word.english)).size,
      game.words.length,
    );
    assert.equal(
      new Set(game.words.map((word) => word.italian)).size,
      game.words.length,
    );
    for (const word of game.words) {
      assert.equal(
        [word.image, word.color, word.number].filter(
          (value) => value !== undefined,
        ).length,
        1,
      );
      if (word.image) {
        assert.ok(
          existsSync(
            new URL(
              `../../public/illustrations/${word.image}.svg`,
              import.meta.url,
            ),
          ),
          `Missing image for ${word.english}`,
        );
      }
    }
  });
  test(`${game.id}: six distinct questions and four valid choices`, () => {
    for (let iteration = 0; iteration < 100; iteration++) {
      const round = createRound(game.id);
      assert.equal(round.questions.length, 6);
      assert.equal(
        new Set(round.questions.map(({ word }) => word.english)).size,
        6,
      );
      for (const question of round.questions) {
        assert.equal(question.options.length, 4);
        assert.equal(
          new Set(question.options.map((word) => word.english)).size,
          4,
        );
        assert.ok(question.options.includes(question.word));
        assert.ok(question.options.every((word) => game.words.includes(word)));
      }
    }
  });
  test(`${game.id}: replay changes first question even with identical randomness`, () => {
    const previous = createRound(game.id, undefined, () => 0.5);
    const next = createRound(game.id, previous, () => 0.5);
    assert.notEqual(
      next.questions[0].word.english,
      previous.questions[0].word.english,
    );
    assert.deepEqual(next.answers, []);
  });
}

test("numbers cover zero through twenty without gaps", () => {
  const numbers = games.find((game) => game.id === "numbers");
  assert.deepEqual(
    numbers.words.map((word) => word.number),
    Array.from({ length: 21 }, (_, index) => index),
  );
});

test("expanded vocabulary sizes", () => {
  assert.deepEqual(
    Object.fromEntries(games.map((game) => [game.id, game.words.length])),
    {
      colors: 24,
      animals: 40,
      objects: 32,
      verbs: 24,
      food: 32,
      numbers: 21,
    },
  );
});

test("score counts only correct answers", () => {
  const [correct, incorrect] = games[0].words;
  assert.equal(scoreRound([]), 0);
  assert.equal(
    scoreRound([
      { word: correct, selected: correct },
      { word: correct, selected: incorrect },
    ]),
    1,
  );
});

test("shuffle preserves input", () => {
  const input = [1, 2, 3, 4];
  assert.deepEqual(shuffle(input, () => 0).sort(), input);
  assert.deepEqual(input, [1, 2, 3, 4]);
});
