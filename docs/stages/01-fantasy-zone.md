# ステージ1: FANTASY ZONE

- `id: 1` / ボス: `scaler`（SCALER、東洋の龍） / テーマ: `undefined`（汎用背景）
- 所要時間: 60秒 / 敵速度倍率: 1.0（全ステージ中最も遅い、導入ステージ）

## コンセプト

爽快なブルー基調の導入ステージ。赤系はINFERNO CORE（地獄）等の過酷な
ステージに譲り、FANTASY ZONEは明るく開放的な青空〜水平線の色調にする
（FROZEN NEBULA/CRYSTAL CANYONの氷/デジタルな青とは違う、爽やかな空色を
意識）。プレイヤーが初めて操作に慣れるための最初のステージという位置づけ。

## 配色

- 地面: `0x2288ff`
- 空（上）: `0x0a2a66`
- 空（下）: `0x3399ee`

## 登場エネミー

`enemyKinds: ["grunt", "grunt", "shooter", "sprite"]`

- グラント・シューターの基礎編成に、導入ステージ向けの低速・低脅威な
  スプライトを追加（`docs/enemies/sprite.md`参照）。
- 高速なdasher・大きく蛇行するweaverはまだ出さない。

## 登場障害物

`obstacleKinds: FANTASY_OBSTACLE_KINDS = ["pillar", "crystal_shard", "floating_island", "rainbow_arch"]`

幻想世界らしい、結晶の欠片や虹のアーチといった非現実的な障害物を配置する。

## ボス

SCALER（東洋の龍）。詳細は`docs/boss-behaviors/scaler.md`・
`docs/boss-defeats/scaler.md`を参照。
