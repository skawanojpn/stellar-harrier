# ステージ9: HALL OF LEGENDS（ボスラッシュ専用）

- `id: 9` / ボス: `bossSequence`で8体を連戦 / テーマ: `undefined`（汎用背景）
- 所要時間: 20秒（雑魚エネミー波のみ。ボス自体の所要時間は含まない） /
  敵速度倍率: 1.4

## コンセプト

これまでの全ステージのボスが勢揃いする、ボスラッシュ専用ステージ。
`bossAtSeconds`による単発ボス出現ではなく、`bossSequence`で指定した順に
ボスを1体ずつ連戦させる特殊構成。

## 配色

- 地面: `0x9955ff`
- 空（上）: `0x0a0022`
- 空（下）: `0x440066`

## ボス出現順（`bossSequence`）

1. `scaler`（SCALER）
2. `tomos`（TOMOS）
3. `godani`（GODANI）
4. `sarpedon`（ASSAULT TRIAD）
5. `sumo`（ONIMARU）
6. `cerberus`（CERBERUS）
7. `fairy_queen`（QUEEN TITANIA）
8. `barbarian`（MOAI）

各ボスの技演出・撃破演出は`docs/boss-behaviors/`・`docs/boss-defeats/`の
該当ファイルをそのまま参照する（ボスラッシュ専用の別演出は持たない）。

## 登場エネミー・障害物

このステージには`enemyKinds`/`obstacleKinds`が設定されておらず、雑魚
エネミー・障害物は（実質的に）出現しない構成になっている。8体のボス連戦
そのものが本ステージのコンテンツである。
