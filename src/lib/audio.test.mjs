import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { audioFilename, wordAudioPath } from "./audio.ts";
import { games } from "./games.ts";

test("audio filenames are shared by playback and generation", () => {
  assert.equal(audioFilename("Light blue"), "light-blue.mp3");
  assert.equal(audioFilename("Twenty-one"), "twenty-one.mp3");
  assert.equal(
    wordAudioPath("Tree"),
    "/audio/tree.mp3",
  );
});

test("every distinct vocabulary word has a local MP3 recording", async () => {
  const words = [...new Set(games.flatMap((game) =>
    game.words.map((word) => word.english)))];
  assert.equal(new Set(words.map(audioFilename)).size, words.length);
  for (const word of words) {
    const data = await readFile(new URL(`../../public${wordAudioPath(word)}`, import.meta.url));
    assert.ok(data.length > 1000, `Empty or truncated audio: ${word}`);
    assert.ok(
      data.subarray(0, 3).toString() === "ID3" ||
      (data[0] === 0xff && (data[1] & 0xe0) === 0xe0),
      `Invalid MP3: ${word}`,
    );
  }
});
