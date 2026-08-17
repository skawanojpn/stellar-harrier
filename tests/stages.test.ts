import { describe, expect, it } from "vitest";
import { getStageConfig, nextStageId, STAGES } from "../src/game/stages";

describe("getStageConfig", () => {
  it("存在するstageIdの設定を返す", () => {
    expect(getStageConfig(1).name).toBe("FANTASY ZONE");
  });

  it("存在しないstageIdの場合はエラーを投げる", () => {
    expect(() => getStageConfig(999)).toThrow("存在しないstageIdです: 999");
  });
});

describe("nextStageId", () => {
  it("次のステージIdを返す", () => {
    expect(nextStageId(1)).toBe(2);
  });

  it("最終ステージの場合はnullを返す", () => {
    const lastId = STAGES[STAGES.length - 1]?.id ?? 0;
    expect(nextStageId(lastId)).toBeNull();
  });
});
