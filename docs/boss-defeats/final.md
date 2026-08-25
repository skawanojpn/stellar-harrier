# ABYSS ZERO（`bossType: "final"`）撃破演出

- 演出分類: **爆発(多段)**（`spawnBossDefeatExplosions`）
- SE分類: 機械系（`playMechanicalDeathExplosionSound`、現状ダミー）
- 総演出時間: 約1.4秒（`BOSS_DEFEAT_EXPLOSION_DURATION_SECONDS`。最終ボスとして
  一番長い/派手な演出にしたい場合は今後この値を伸ばして良い）

## 選定理由

最終ボスとして、既存の最も派手な演出（多段爆発）をそのまま最大規模で使用する。
全ボスの中で最もインパクトのある退場にするのが自然。

## 演出詳細

`scaler.md`と同一の`spawnBossDefeatExplosions`をそのまま使用する。将来的に、
爆発の段数や規模を最終ボス専用に強化したい場合は、このファイルと
`BOSS_DEFEAT_PAUSE_SECONDS_BY_TYPE.final`の値を合わせて更新すること。
