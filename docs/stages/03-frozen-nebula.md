# ステージ3: FROZEN NEBULA

- `id: 3` / ボス: `godani`（GODANI、双頭クリスタル龍） / テーマ: `undefined`（汎用背景）
- 所要時間: 68秒 / 敵速度倍率: 1.18

## コンセプト

氷の世界に棲む双頭クリスタルドラゴン。他の青系ステージ（FANTASY ZONEの
空色、CRYSTAL CANYONのデジタル青）と差別化するため、FROZEN NEBULAだけは
白みを強めた氷雪らしい配色（地面は白に近い氷色、空も白っぽく霞んだ雪原の
空）にする。

## 配色

- 地面: `0xccf2ff`
- 空（上）: `0x335577`
- 空（下）: `0xdff0ff`

## 登場エネミー

`enemyKinds: ["grunt", "shooter", "shooter", "dasher", "frost_wisp"]`

- 高速で直線的に突っ込んでくるdasherをここで初登場させる。
- 低速で漂う氷の精霊フロストウィスプを追加（`docs/enemies/frost_wisp.md`
  参照）。短射程の扇状ミニ弾幕を放つ、このステージ唯一の遠隔攻撃系エネミー
  以外の追加要素。

## 登場障害物

`obstacleKinds: FROZEN_OBSTACLE_KINDS = ["pillar", "ice_crystal", "icicle_cluster"]`

氷の結晶・つららの群れなど、雪原らしい障害物を配置する。

## ボス

GODANI（双頭クリスタル龍）。詳細は`docs/boss-behaviors/godani.md`・
`docs/boss-defeats/godani.md`を参照。
