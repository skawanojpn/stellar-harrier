# ステージ7: SWEETHEART GROVE

- `id: 7` / ボス: `fairy_queen`（QUEEN TITANIA） / テーマ: `"fairy"`
- 所要時間: 70秒 / 敵速度倍率: 1.4

## コンセプト

パステルな花畑ステージ: 既存ステージと混同しないよう、明るいピンク〜黄〜
紫のキャンディカラーでまとめる。妖精モチーフの唯一のステージで、
`theme: "fairy"`により専用の環境演出が有効になる。

## 配色

- 地面: `0xff99cc`
- 空（上）: `0xffccee`
- 空（下）: `0xffee99`

## 登場エネミー

`enemyKinds: FAIRY_ENEMY_KINDS = ["fairy", "pixie", "cupid", "imp"]`
（詳細は`docs/enemies/fairy.md`・`docs/enemies/pixie.md`・
`docs/enemies/cupid.md`・`docs/enemies/imp.md`を参照）

このステージ専用の妖精系4種のみで構成され、`grunt`/`shooter`系は登場しない。

## 登場障害物

`obstacleKinds: FAIRY_OBSTACLE_KINDS = ["heart_pillar", "lollipop", "flower_arch", "mushroom"]`

ハート型の柱・キャンディ・花のアーチ・きのこなど、キャンディカラーの
世界観に合わせた障害物を配置する。

このステージの登場エネミー4種・障害物4種、およびボス（QUEEN TITANIA）は
全てGeminiサブエージェントによるデザインへ刷新済み（詳細な造形と
`userData.updateLoop`常時アニメーションを追加）。

## ボス

QUEEN TITANIA（内部的な`bossType`は`fairy_queen`）。詳細は
`docs/boss-behaviors/fairy_queen.md`・`docs/boss-defeats/fairy_queen.md`を
参照。
