# ステージ10: ABYSS ZERO（最終ステージ）

- `id: 10` / ボス: `final`（ABYSS ZERO） / テーマ: `undefined`（汎用背景）
- 所要時間: 90秒（全ステージ中最長） / 敵速度倍率: 1.5（全ステージ中最高）

## コンセプト

太古の神殿が崩れ闇に堕ちた。既存カラーよりわずかに一段暗く禍々しい配色に
調整する。最終ステージとして、これまでに登場した敵種を全て使い切る最も
厳しい編成にする。

## 配色

- 地面: `0xe6b800`
- 空（上）: `0x14000d`
- 空（下）: `0x440019`

## 登場エネミー

`enemyKinds: ["shooter", "dasher", "dasher", "weaver", "weaver", "shade"]`

- これまでに登場した敵種を全て使い切る最も厳しい編成。
- シェイドを追加（`docs/enemies/shade.md`参照）。半透明で不透明度が
  常時脈動する影のエネミーで、最終ステージらしい不気味さを演出する。
  `domEnabled: true`/`tomosEnabled: true`により`dom`・`tomos`（雑魚版）も
  別途抽選対象になる。

## 登場障害物

`obstacleKinds: ABYSS_OBSTACLE_KINDS = ["broken_pillar", "void_rift", "floating_island"]`

崩れた柱や虚無の裂け目など、崩壊した神殿らしい障害物を配置する。

## ボス

ABYSS ZERO（内部的な`bossType`は`final`）。詳細は
`docs/boss-behaviors/final.md`・`docs/boss-defeats/final.md`を参照。
