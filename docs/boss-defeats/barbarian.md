# MOAI（`bossType: "barbarian"`）撃破演出

- 演出分類: **砕け散る**（`spawnBossDefeatShatterStone`、石カラー版の`spawnBossDefeatShatter`）
- SE分類: 機械系（`playMechanicalDeathExplosionSound`、現状ダミー。石像＝無機物として扱う）
- 総演出時間: 約0.9秒（`BOSS_DEFEAT_SHATTER_DURATION_SECONDS`）

## 選定理由

古代文明の石像というモチーフから、砕けて崩れ落ちる演出にする。

## 演出詳細

`godani.md`と同じ`spawnBossDefeatShatter`ヘルパーを使うが、色を石灰色(`0x9a9a9a`)に
変えて呼び出す（`spawnBossDefeatShatterStone`）。立方体の破片が16個、放射状に飛び散り、
重力加速度9で地面に落ちていく。
