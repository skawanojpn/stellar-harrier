import { describe, expect, it } from "vitest";
import { fanShotDirections } from "../src/game/attackPattern";

describe("fanShotDirections", () => {
  it("count=1の場合はtoへの単一方向を返す", () => {
    const dirs = fanShotDirections(
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      1,
      Math.PI / 4,
    );
    expect(dirs).toHaveLength(1);
    expect(dirs[0]?.x).toBeCloseTo(1);
    expect(dirs[0]?.y).toBeCloseTo(0);
  });

  it("count発の方向ベクトルを返し、中心はtoへの方向と一致する", () => {
    const dirs = fanShotDirections(
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      3,
      Math.PI / 2,
    );
    expect(dirs).toHaveLength(3);
    const center = dirs[1];
    expect(center?.x).toBeCloseTo(1);
    expect(center?.y).toBeCloseTo(0);
  });

  it("各方向ベクトルは単位ベクトルになる", () => {
    const dirs = fanShotDirections(
      { x: 0, y: 0 },
      { x: 3, y: 4 },
      5,
      Math.PI / 3,
    );
    for (const d of dirs) {
      const length = Math.sqrt(d.x * d.x + d.y * d.y);
      expect(length).toBeCloseTo(1);
    }
  });

  it("countが0以下の場合はエラーを投げる", () => {
    expect(() =>
      fanShotDirections({ x: 0, y: 0 }, { x: 1, y: 0 }, 0, 1),
    ).toThrow("countは正の整数である必要があります。");
  });
});
