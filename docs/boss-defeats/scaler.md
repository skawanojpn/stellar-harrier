# SCALER（`bossType: "scaler"`）撃破演出

- 演出分類: **爆発**（`spawnBossDefeatExplosions`）
- SE分類: 機械系（`playMechanicalDeathExplosionSound`、現状ダミー）
- 総演出時間: 約1.4秒（`BOSS_DEFEAT_EXPLOSION_DURATION_SECONDS`）

## 選定理由

龍type=ドラゴンだが、原作『スペースハリアー』オマージュとして「派手な多段爆発」を
最終ボス級の演出として最初に実装した既存演出をそのまま踏襲する。東洋の龍という
モチーフ自体に「爆発」の必然性は薄いが、ステージ1の顔として最も原作らしい爆発演出を
割り当てる。

## 演出詳細

位置をランダムにずらしながら、120ms間隔で6回連続の爆発パーティクルバーストを発生させる
（`spawnExplosion`を1回あたり12個の球体パーティクルで実行、爆発ごとにスケールが
`2 + index*0.3`で少しずつ大きくなる）。カメラシェイクも伴う。
