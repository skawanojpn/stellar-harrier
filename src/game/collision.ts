export interface Circle {
  x: number;
  y: number;
  radius: number;
}

/** 2つの円が重なっているかを判定する(当たり判定は簡略化して円同士の衝突で扱う) */
export function circlesIntersect(a: Circle, b: Circle): boolean {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distanceSq = dx * dx + dy * dy;
  const radiusSum = a.radius + b.radius;
  return distanceSq <= radiusSum * radiusSum;
}
