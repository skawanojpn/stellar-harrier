# ステージ5: YOZAKURA

- `id: 5` / ボス: `sumo`（ONIMARU、鬼の相撲取り） / テーマ: `"yokai"`
- 所要時間: 68秒 / 敵速度倍率: 1.3

## コンセプト

逢魔が時の宵闇: 富士のシルエットと桜吹雪に映える、ピンク〜オレンジ〜紫の
黄昏グラデーション。和風妖怪モチーフの唯一のステージで、`theme: "yokai"`
により専用の環境演出（富士山・桜吹雪など）が有効になる。

## 配色

- 地面: `0x774488`
- 空（上）: `0x2a0e33`
- 空（下）: `0xdd5588`

## 登場エネミー

`enemyKinds: YOKAI_ENEMY_KINDS`（姫・義経・河童・琵琶法師の和風妖怪
4種専用ロースター。詳細は`docs/enemies/princess.md`・
`docs/enemies/yoshitsune.md`・`docs/enemies/frog.md`・
`docs/enemies/biwa_hoshi.md`を参照）

他ステージの`grunt`/`shooter`系とは完全に独立した、このステージ専用の
編成になっている。

## 登場障害物

`obstacleKinds: YOKAI_OBSTACLE_KINDS = ["sotoba", "gravestone", "bamboo", "stone_lantern"]`

卒塔婆・墓石・竹林・石灯籠など、和風の不気味さを演出する障害物を配置する。
石灯籠はステージ2 VOID GARDENの西洋庭園リニューアルに伴い、和風の意匠が
合うこのステージへ移設したもの（`docs/stages/02-void-garden.md`参照）。

このステージの登場エネミー4種・障害物4種は全てGeminiサブエージェントに
よるデザインへ刷新済み（`biwa_hoshi`は琵琶法師から怨霊髑髏へモチーフ変更、
他は既存コンセプトのまま詳細な造形と`userData.updateLoop`常時アニメーション
を追加）。

## ボス

ONIMARU（鬼の相撲取り、内部的な`bossType`は`sumo`）。詳細は
`docs/boss-behaviors/sumo.md`・`docs/boss-defeats/sumo.md`を参照。
