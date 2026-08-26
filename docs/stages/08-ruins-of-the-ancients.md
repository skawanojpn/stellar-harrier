# ステージ8: RUINS OF THE ANCIENTS

- `id: 8` / ボス: `barbarian`（MOAI） / テーマ: `undefined`（汎用背景）
- 所要時間: 75秒 / 敵速度倍率: 1.45

## コンセプト

失われた古代文明の遺跡。モアイ像が守護する神殿。

## 配色

- 地面: `0x998866`
- 空（上）: `0x1a1400`
- 空（下）: `0x554411`

## 登場エネミー

`enemyKinds: ["shooter", "dasher", "weaver", "weaver", "guardian_relic"]`

- weaverの比率を上げ、終盤らしい回避難度にする。
- ガーディアンレリックを追加（`docs/enemies/guardian_relic.md`参照）。
  MOAIボスの縮小版のような意匠を持つ、低速・高耐久（HP2）の浮遊石頭で、
  低速ホーミング弾を放つ。`domEnabled: true`/`tomosEnabled: true`により
  `dom`・`tomos`（雑魚版）も別途抽選対象になる。

## 登場障害物

`obstacleKinds: ANCIENT_OBSTACLE_KINDS = ["pillar", "ruins", "floating_island", "fallen_statue"]`

崩れた遺跡や倒れた石像など、古代文明の遺物らしい障害物を配置する。

## ボス

MOAI（内部的な`bossType`は`barbarian`）。詳細は
`docs/boss-behaviors/barbarian.md`・`docs/boss-defeats/barbarian.md`を参照。
