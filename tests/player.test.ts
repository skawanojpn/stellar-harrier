import { describe, expect, it } from "vitest";
import { clampPosition, loseLife } from "../src/game/player";

describe("clampPosition", () => {
  const bounds = { minX: -5, maxX: 5, minY: -3, maxY: 3 };

  it("範囲内の座標はそのまま返す", () => {
    expect(clampPosition({ x: 1, y: 1 }, bounds)).toEqual({ x: 1, y: 1 });
  });

  it("範囲外の座標は境界にクランプする", () => {
    expect(clampPosition({ x: 10, y: -10 }, bounds)).toEqual({ x: 5, y: -3 });
  });

  it("boundsのmin/max関係が不正な場合はエラーを投げる", () => {
    expect(() =>
      clampPosition({ x: 0, y: 0 }, { minX: 5, maxX: -5, minY: 0, maxY: 0 }),
    ).toThrow("boundsのmin/max関係が不正です。");
  });
});

describe("loseLife", () => {
  it("残機を1減らす", () => {
    expect(loseLife(3)).toBe(2);
  });

  it("0未満にはならない", () => {
    expect(loseLife(0)).toBe(0);
  });
});
