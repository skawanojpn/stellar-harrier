# ステージ4: CRYSTAL CANYON

- `id: 4` / ボス: `sarpedon`（ASSAULT TRIAD、3体のドム編隊） /
  テーマ: `undefined`（汎用背景）
- 所要時間: 72秒 / 敵速度倍率: 1.25

## コンセプト

結晶の谷: デジタルで未来的な世界（ネオン風・データ結晶のイメージ）。
シアン〜青みがかったネオン系カラーにする。

## 配色

- 地面: `0x00ddff`
- 空（上）: `0x000c22`
- 空（下）: `0x0044aa`

## 登場エネミー

`enemyKinds: ["grunt", "shooter", "dasher", "dasher", "glitch_drone"]`

- dasherの比率を上げ、高速突撃への回避に慣れさせる。
- グリッチドローンを追加（`docs/enemies/glitch_drone.md`参照）。約1.5秒
  ごとにテレポートし、直後に単発ショットを撃つ、デジタル世界観に合わせた
  変則的な動きのエネミー。

## 登場障害物

`obstacleKinds: CRYSTAL_OBSTACLE_KINDS = ["data_monolith", "glitch_cube", "floating_island"]`

データの石碑やグリッチした立方体など、デジタル世界らしい障害物を配置する。

## ボス

ASSAULT TRIAD（3体のドム編隊、内部的な`bossType`は`sarpedon`）。詳細は
`docs/boss-behaviors/sarpedon.md`・`docs/boss-defeats/sarpedon.md`を参照。
