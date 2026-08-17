import type { EnemyKind } from "./score";

export interface SpawnEvent {
  time: number;
  kind: EnemyKind;
  laneX: number;
}

export interface StageDefinition {
  /** ステージの長さ(秒) */
  durationSeconds: number;
  /** ボスが出現する時刻(秒)。undefinedならボス無し */
  bossAtSeconds?: number;
}

const LANE_X_POSITIONS = [-6, -3, 0, 3, 6];

/**
 * 一定間隔でgrunt/shooterを交互に出現させ、bossAtSecondsが指定されていれば
 * ステージ終盤にbossを1体追加するスケジュールを生成する。
 * laneXはLANE_X_POSITIONSを周期的に割り当てる(出現位置に単純な変化を持たせるため)。
 */
export function generateSpawnSchedule(
  stage: StageDefinition,
  intervalSeconds: number,
): SpawnEvent[] {
  if (intervalSeconds <= 0) {
    throw new Error("intervalSecondsは正の数である必要があります。");
  }
  if (stage.durationSeconds <= 0) {
    throw new Error("durationSecondsは正の数である必要があります。");
  }

  const events: SpawnEvent[] = [];
  let index = 0;
  for (
    let t = intervalSeconds;
    t < stage.durationSeconds;
    t += intervalSeconds
  ) {
    const kind: EnemyKind = index % 2 === 0 ? "grunt" : "shooter";
    const laneX = LANE_X_POSITIONS[index % LANE_X_POSITIONS.length] ?? 0;
    events.push({ time: t, kind, laneX });
    index += 1;
  }

  if (stage.bossAtSeconds !== undefined) {
    events.push({ time: stage.bossAtSeconds, kind: "boss", laneX: 0 });
  }

  return events.sort((a, b) => a.time - b.time);
}
