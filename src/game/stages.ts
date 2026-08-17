export interface StageConfig {
  id: number;
  name: string;
  durationSeconds: number;
  spawnIntervalSeconds: number;
  obstacleIntervalSeconds: number;
  bossAtSeconds: number;
  groundColor: number;
  skyColorTop: number;
  skyColorBottom: number;
  enemySpeedMultiplier: number;
}

export const STAGES: StageConfig[] = [
  {
    id: 1,
    name: "FANTASY ZONE",
    durationSeconds: 60,
    spawnIntervalSeconds: 2.2,
    obstacleIntervalSeconds: 4,
    bossAtSeconds: 55,
    groundColor: 0xff2266,
    skyColorTop: 0x220044,
    skyColorBottom: 0x662299,
    enemySpeedMultiplier: 1,
  },
  {
    id: 2,
    name: "CRYSTAL CANYON",
    durationSeconds: 70,
    spawnIntervalSeconds: 1.9,
    obstacleIntervalSeconds: 3.5,
    bossAtSeconds: 65,
    groundColor: 0x22ccff,
    skyColorTop: 0x001133,
    skyColorBottom: 0x0055aa,
    enemySpeedMultiplier: 1.15,
  },
  {
    id: 3,
    name: "INFERNO CORE",
    durationSeconds: 80,
    spawnIntervalSeconds: 1.6,
    obstacleIntervalSeconds: 3,
    bossAtSeconds: 75,
    groundColor: 0xff6600,
    skyColorTop: 0x220000,
    skyColorBottom: 0x881100,
    enemySpeedMultiplier: 1.3,
  },
];

/** ステージIDに対応する設定を取得する。存在しない場合はエラーを投げる */
export function getStageConfig(stageId: number): StageConfig {
  const stage = STAGES.find((s) => s.id === stageId);
  if (!stage) {
    throw new Error(`存在しないstageIdです: ${stageId}`);
  }
  return stage;
}

/** 次のステージIDを返す。最終ステージの場合はnull(クリア扱い) */
export function nextStageId(currentStageId: number): number | null {
  const next = STAGES.find((s) => s.id === currentStageId + 1);
  return next ? next.id : null;
}
