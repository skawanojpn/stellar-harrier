import { describe, expect, it } from "vitest";
import { addScore, scoreForEnemy } from "../src/game/score";

describe("scoreForEnemy", () => {
  it("敵種別ごとのスコアを返す", () => {
    expect(scoreForEnemy("grunt")).toBe(100);
    expect(scoreForEnemy("shooter")).toBe(200);
    expect(scoreForEnemy("boss")).toBe(5000);
  });
});

describe("addScore", () => {
  it("現在のスコアに撃破スコアを加算する", () => {
    expect(addScore(1000, "grunt")).toBe(1100);
  });

  it("スコアが負の場合はエラーを投げる", () => {
    expect(() => addScore(-1, "grunt")).toThrow(
      "currentは0以上である必要があります。",
    );
  });
});
