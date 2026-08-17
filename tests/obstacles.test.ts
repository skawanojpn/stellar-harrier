import { describe, expect, it } from "vitest";
import { generateObstacleSchedule } from "../src/game/obstacles";

describe("generateObstacleSchedule", () => {
  it("intervalSeconds間隔で障害物を生成する", () => {
    const events = generateObstacleSchedule(10, 4, 1);
    expect(events.map((e) => e.time)).toEqual([4, 8]);
  });

  it("同じseedなら同じ結果を返す(決定的)", () => {
    const a = generateObstacleSchedule(20, 3, 42);
    const b = generateObstacleSchedule(20, 3, 42);
    expect(a).toEqual(b);
  });

  it("異なるseedなら異なる配置になりうる", () => {
    const a = generateObstacleSchedule(20, 3, 1);
    const b = generateObstacleSchedule(20, 3, 2);
    expect(a).not.toEqual(b);
  });

  it("kindはpillarまたはrockのみ", () => {
    const events = generateObstacleSchedule(30, 2, 7);
    for (const e of events) {
      expect(["pillar", "rock"]).toContain(e.kind);
    }
  });

  it("durationSecondsが0以下の場合はエラーを投げる", () => {
    expect(() => generateObstacleSchedule(0, 1, 1)).toThrow(
      "durationSecondsは正の数である必要があります。",
    );
  });

  it("intervalSecondsが0以下の場合はエラーを投げる", () => {
    expect(() => generateObstacleSchedule(10, 0, 1)).toThrow(
      "intervalSecondsは正の数である必要があります。",
    );
  });
});
