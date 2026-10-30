import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import { createRound, games, scoreRound, shuffle } from "./games.ts";

test("illustrations use readable filenames instead of Unicode codes", () => {
  const files = readdirSync(new URL("../../public/illustrations/", import.meta.url))
    .filter((name) => name.endsWith(".svg"));
  assert.ok(files.length > 0);
  for (const filename of files) {
    assert.match(filename, /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*\.svg$/);
    assert.doesNotMatch(filename, /^[0-9a-f]{4,}(?:-[0-9a-f]+)*\.svg$/);
  }
});

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
      assert.equal("emoji" in word, false);
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
  if (!["colors", "numbers"].includes(game.id)) {
    test(`${game.id}: all words use local SVG illustrations`, () => {
      for (const word of game.words) {
        assert.match(word.image, /^[a-z0-9-]+$/);
        const svg = readFileSync(
          new URL(`../../public/illustrations/${word.image}.svg`, import.meta.url),
          "utf8",
        );
        assert.match(svg, /<svg\b[^>]*viewBox="0 0 [\d.]+ [\d.]+"/);
        const [, width, height] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
        assert.ok(Number(width) > 0 && Number(height) > 0);
        assert.match(svg, /<\/svg>\s*$/);
        assert.doesNotMatch(svg, /<script\b|<foreignObject\b|<image\b|\bon\w+=|(?:href|src)=/i);
      }
    });
  }
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

test("picture-only choices have distinct illustrations", () => {
  for (const id of ["animals", "objects", "food"]) {
    const game = games.find((game) => game.id === id);
    assert.equal(new Set(game.words.map((word) => word.image)).size, game.words.length);
  }
});

test("ambiguous actions, weather and nature show the Italian prompt", () => {
  assert.deepEqual(
    games.filter((game) => game.showItalianPrompt).map((game) => game.id),
    ["verbs", "weather", "nature"],
  );
});

test("card artwork references existing local illustrations", () => {
  const component = readFileSync(
    new URL("../components/english-app.tsx", import.meta.url),
    "utf8",
  );
  const assets = [...component.matchAll(/<Illustration asset="([^"]+)"/g)];
  assert.ok(assets.length > 0);
  for (const [, asset] of assets) {
    assert.ok(
      existsSync(new URL(`../../public/illustrations/${asset}.svg`, import.meta.url)),
      `Missing card illustration: ${asset}`,
    );
  }
  assert.doesNotMatch(component, /word\.emoji|art-emoji/);
  for (const asset of ["sunny", "rainy", "tree", "flower"]) {
    assert.ok(assets.some(([, id]) => id === asset), `Missing new card artwork: ${asset}`);
  }
});

test("numbers cover zero through thirty without gaps", () => {
  const numbers = games.find((game) => game.id === "numbers");
  assert.deepEqual(
    numbers.words.map((word) => word.number),
    Array.from({ length: 31 }, (_, index) => index),
  );
});

test("expanded vocabulary sizes", () => {
  assert.deepEqual(
    Object.fromEntries(games.map((game) => [game.id, game.words.length])),
    {
      colors: 36,
      animals: 52,
      objects: 48,
      verbs: 40,
      food: 48,
      weather: 24,
      nature: 24,
      numbers: 31,
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
