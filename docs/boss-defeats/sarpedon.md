# ASSAULT TRIAD（`bossType: "sarpedon"`）撃破演出

- 演出分類: **爆発**（`spawnBossDefeatExplosions`）
- SE分類: 機械系（`playMechanicalDeathExplosionSound`、現状ダミー）
- 総演出時間: 約1.4秒（`BOSS_DEFEAT_EXPLOSION_DURATION_SECONDS`）

## 選定理由

3体のドム風機動兵という機械的なモチーフから、爆発演出が最も自然。

## 演出詳細

`scaler.md`と同一の`spawnBossDefeatExplosions`をそのまま使用する。位置をランダムに
ずらしながら120ms間隔で6回連続の爆発パーティクルバーストを発生させる。
