# ステージ2: VOID GARDEN

- `id: 2` / ボス: `tomos`（TOMOS、花の魔物） / テーマ: `undefined`（汎用背景）
- 所要時間: 65秒 / 敵速度倍率: 1.1

## コンセプト

幻想世界（FANTASY ZONE）に到着したと思ったら虚無だった、という肩透かしの
庭園。深緑を基調にした静かで空虚な色調にする。

## 配色

- 地面: `0x99ff66`
- 空（上）: `0x0a1a00`
- 空（下）: `0x335500`

## 登場エネミー

`enemyKinds: ["grunt", "grunt", "shooter", "shooter"]`

- shooterの比率を上げ、撃ってくる敵への対応に慣れさせる。
- `domEnabled: true`のため、`dom`（オービター）も別途抽選対象になる。

## 登場障害物

`obstacleKinds: VOID_OBSTACLE_KINDS = ["withered_tree", "stone_lantern", "floating_island"]`

枯れ木や石灯籠など、庭園の「空虚さ」を表現する障害物を配置する。

## ボス

TOMOS（花の魔物）。詳細は`docs/boss-behaviors/tomos.md`・
`docs/boss-defeats/tomos.md`を参照。
