import { describe, expect, it } from "vitest";
import { generateSpawnSchedule } from "../src/game/spawner";

describe("generateSpawnSchedule", () => {
  it("intervalSeconds間隔でgrunt/shooterを交互に生成する", () => {
    const events = generateSpawnSchedule({ durationSeconds: 10 }, 3);
    expect(events.map((e) => e.time)).toEqual([3, 6, 9]);
    expect(events.map((e) => e.kind)).toEqual(["grunt", "shooter", "grunt"]);
  });

  it("bossAtSecondsが指定されていればboss出現イベントを末尾付近に追加する", () => {
    const events = generateSpawnSchedule(
      { durationSeconds: 10, bossAtSeconds: 15 },
      5,
    );
    const boss = events.find((e) => e.kind === "boss");
    expect(boss).toEqual({ time: 15, kind: "boss", laneX: 0 });
  });

  it("時系列順にソートされている", () => {
    const events = generateSpawnSchedule(
      { durationSeconds: 20, bossAtSeconds: 5 },
      4,
    );
    const times = events.map((e) => e.time);
    expect(times).toEqual([...times].sort((a, b) => a - b));
  });

  it("intervalSecondsが0以下の場合はエラーを投げる", () => {
    expect(() => generateSpawnSchedule({ durationSeconds: 10 }, 0)).toThrow(
      "intervalSecondsは正の数である必要があります。",
    );
  });

  it("durationSecondsが0以下の場合はエラーを投げる", () => {
    expect(() => generateSpawnSchedule({ durationSeconds: 0 }, 1)).toThrow(
      "durationSecondsは正の数である必要があります。",
    );
  });
});
