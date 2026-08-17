export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface Position {
  x: number;
  y: number;
}

/** 自機の位置を移動可能範囲(Bounds)内に収める */
export function clampPosition(position: Position, bounds: Bounds): Position {
  if (bounds.minX > bounds.maxX || bounds.minY > bounds.maxY) {
    throw new Error("boundsのmin/max関係が不正です。");
  }
  return {
    x: Math.min(Math.max(position.x, bounds.minX), bounds.maxX),
    y: Math.min(Math.max(position.y, bounds.minY), bounds.maxY),
  };
}

/** 残機を1減らす。0未満にはならない */
export function loseLife(currentLives: number): number {
  return Math.max(0, currentLives - 1);
}
