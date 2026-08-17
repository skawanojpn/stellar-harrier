import { describe, expect, it } from "vitest";
import { circlesIntersect } from "../src/game/collision";

describe("circlesIntersect", () => {
  it("重なっている円はtrueを返す", () => {
    expect(
      circlesIntersect({ x: 0, y: 0, radius: 2 }, { x: 1, y: 0, radius: 2 }),
    ).toBe(true);
  });

  it("離れている円はfalseを返す", () => {
    expect(
      circlesIntersect({ x: 0, y: 0, radius: 1 }, { x: 10, y: 0, radius: 1 }),
    ).toBe(false);
  });

  it("外接している円(境界値)はtrueを返す", () => {
    expect(
      circlesIntersect({ x: 0, y: 0, radius: 1 }, { x: 2, y: 0, radius: 1 }),
    ).toBe(true);
  });
});
