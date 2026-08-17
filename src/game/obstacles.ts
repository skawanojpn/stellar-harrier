export interface ObstacleEvent {
  time: number;
  laneX: number;
  kind: "pillar" | "rock";
}

const LANE_X_POSITIONS = [-8, -4, 4, 8];

/**
 * seedを使った線形合同法による決定的疑似乱数(テストで再現可能にするため
 * Math.randomは使わない)。
 */
function createPrng(seed: number): () => number {
  let state = seed % 2147483647;
  if (state <= 0) {
    state += 2147483646;
  }
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

/** intervalSeconds間隔で障害物(柱/岩)を交互に配置するスケジュールを生成する */
export function generateObstacleSchedule(
  durationSeconds: number,
  intervalSeconds: number,
  seed: number,
): ObstacleEvent[] {
  if (durationSeconds <= 0) {
    throw new Error("durationSecondsは正の数である必要があります。");
  }
  if (intervalSeconds <= 0) {
    throw new Error("intervalSecondsは正の数である必要があります。");
  }

  const random = createPrng(seed);
  const events: ObstacleEvent[] = [];
  for (let t = intervalSeconds; t < durationSeconds; t += intervalSeconds) {
    const laneIndex = Math.floor(random() * LANE_X_POSITIONS.length);
    const laneX = LANE_X_POSITIONS[laneIndex] ?? 0;
    const kind = random() < 0.5 ? "pillar" : "rock";
    events.push({ time: t, laneX, kind });
  }
  return events;
}
