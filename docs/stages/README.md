# ステージ仕様書

全10ステージ＋ボスラッシュ専用ステージ（HALL OF LEGENDS）の「コンセプト・
配色・登場エネミー・登場障害物・ボス」を、実装から独立したドキュメントとして
ここに記録する。

## 運用ルール

- **この仕様書が正**。ステージの世界観や編成を変更したいときは、まずこの
  ファイル群を編集してから「この内容で実装して」と依頼する運用にする
  （`docs/boss-behaviors/`・`docs/enemies/`と同じ運用）。
- 各ステージの詳細（ボスの技演出、エネミーの動き）は`docs/boss-behaviors/`と
  `docs/enemies/`が別途担当している。このドキュメントは**ステージ単位で
  それらをどう組み合わせているか**（コンセプト・配色・編成ロースター）専用。
- 実装（`src/index.html`内の`STAGES`配列）とこのドキュメントに差分が生まれたら、
  都度このドキュメントを更新する。

## ステージ一覧

| ファイル                                                   | id  | ステージ名            | ボス          | テーマ                       |
| ---------------------------------------------------------- | --- | --------------------- | ------------- | ---------------------------- |
| [01-fantasy-zone.md](01-fantasy-zone.md)                   | 1   | FANTASY ZONE          | SCALER        | 爽快な青空の導入ステージ     |
| [02-void-garden.md](02-void-garden.md)                     | 2   | VOID GARDEN           | TOMOS         | 静かで空虚な深緑の庭園       |
| [03-frozen-nebula.md](03-frozen-nebula.md)                 | 3   | FROZEN NEBULA         | GODANI        | 氷雪の双頭クリスタル龍       |
| [04-crystal-canyon.md](04-crystal-canyon.md)               | 4   | CRYSTAL CANYON        | ASSAULT TRIAD | デジタル/ネオンの結晶谷      |
| [05-yozakura.md](05-yozakura.md)                           | 5   | YOZAKURA              | ONIMARU       | 和風妖怪・逢魔が時の宵闇     |
| [06-inferno-core.md](06-inferno-core.md)                   | 6   | INFERNO CORE          | CERBERUS      | 地獄の中心・炎のトンネル     |
| [07-sweetheart-grove.md](07-sweetheart-grove.md)           | 7   | SWEETHEART GROVE      | QUEEN TITANIA | パステルな花畑・妖精の国     |
| [08-ruins-of-the-ancients.md](08-ruins-of-the-ancients.md) | 8   | RUINS OF THE ANCIENTS | MOAI          | 失われた古代文明の遺跡       |
| [09-hall-of-legends.md](09-hall-of-legends.md)             | 9   | HALL OF LEGENDS       | BOSS RUSH     | 全ボス連戦専用ステージ       |
| [10-abyss-zero.md](10-abyss-zero.md)                       | 10  | ABYSS ZERO            | ABYSS ZERO    | 最終ステージ・闇に堕ちた神殿 |

## 共通仕様

- 各ステージ設定は`src/index.html`の`STAGES`配列（`getStageConfig(stageId)`で
  参照）にオブジェクトとして定義されている。
- `enemyKinds`は「そのステージで抽選されうるエネミーの`kind`のプール」
  （個々のエネミー仕様は`docs/enemies/`を参照）。
- `obstacleKinds`は「そのステージで抽選されうる障害物の`kind`のプール」
  （ステージごとの専用配列は`src/index.html`内、`OBSTACLE_KINDS`宣言直後の
  コメントブロックにまとまっている）。
- HALL OF LEGENDS（id: 9）のみボスラッシュ専用で、`enemyKinds`/
  `obstacleKinds`を持たず、`bossSequence`で指定した8体のボスを順に連戦する。
- ステージ間の切り替え時には地面・空の色が`STAGE_COLOR_FADE_STEP_SECONDS`
  刻みで滑らかにフェードする演出が入る（詳細は実装の`advanceToNextStage()`
  周辺を参照）。
