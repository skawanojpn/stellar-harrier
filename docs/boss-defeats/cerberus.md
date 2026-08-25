# CERBERUS（`bossType: "cerberus"`）撃破演出

- 演出分類: **爆発**（`spawnBossDefeatExplosions`）
- SE分類: 生物系（`playBiologicalDeathCrySound`、現状ダミー。炎の魔獣という生物寄りのモチーフのため）
- 総演出時間: 約1.4秒（`BOSS_DEFEAT_EXPLOSION_DURATION_SECONDS`）

## 選定理由

炎を吐く三頭の番犬というモチーフから、爆発演出（炎の激しい爆散）が視覚的に自然。
SEのみ、生物としての断末魔（機械の爆発音ではなく）を割り当てる。

## 演出詳細

`scaler.md`と同一の`spawnBossDefeatExplosions`をそのまま使用する。
