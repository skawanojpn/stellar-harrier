export type EnemyKind = "grunt" | "shooter" | "boss";

const SCORE_BY_KIND: Record<EnemyKind, number> = {
  grunt: 100,
  shooter: 200,
  boss: 5000,
};

/** 敵種別に応じた撃破スコアを返す */
export function scoreForEnemy(kind: EnemyKind): number {
  return SCORE_BY_KIND[kind];
}

/** 直前のスコアに撃破スコアを加算した新しいスコアを返す */
export function addScore(current: number, kind: EnemyKind): number {
  if (current < 0) {
    throw new Error("currentは0以上である必要があります。");
  }
  return current + scoreForEnemy(kind);
}
