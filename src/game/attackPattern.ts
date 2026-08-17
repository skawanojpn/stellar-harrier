export interface Vector2 {
  x: number;
  y: number;
}

/**
 * fromからtoへ向かう単位ベクトルを中心に、count発を均等な角度で扇状に広げた
 * 方向ベクトルの配列を返す(spreadRadiansが扇全体の開き角度)。
 */
export function fanShotDirections(
  from: Vector2,
  to: Vector2,
  count: number,
  spreadRadians: number,
): Vector2[] {
  if (count <= 0) {
    throw new Error("countは正の整数である必要があります。");
  }

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const baseAngle = Math.atan2(dy, dx);

  if (count === 1) {
    return [{ x: Math.cos(baseAngle), y: Math.sin(baseAngle) }];
  }

  const directions: Vector2[] = [];
  const step = spreadRadians / (count - 1);
  const startAngle = baseAngle - spreadRadians / 2;
  for (let i = 0; i < count; i++) {
    const angle = startAngle + step * i;
    directions.push({ x: Math.cos(angle), y: Math.sin(angle) });
  }
  return directions;
}
