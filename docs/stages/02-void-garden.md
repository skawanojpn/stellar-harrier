# ステージ2: VOID GARDEN

- `id: 2` / ボス: `tomos`（TOMOS、花の魔物） / テーマ: `undefined`（汎用背景）
- 所要時間: 65秒 / 敵速度倍率: 1.1

## コンセプト

幻想世界（FANTASY ZONE）に到着したと思ったら、人の手が入っていたはずの
西洋庭園が主のいないまま静まり返っていた、という肩透かしの庭園。
トピアリー（刈り込み仕立ての生垣）や噴水など西洋庭園らしい意匠を配し、
深緑を基調にした静かで空虚な色調にする。

## 配色

- 地面: `0x99ff66`
- 空（上）: `0x0a1a00`
- 空（下）: `0x335500`

## 登場エネミー

`enemyKinds: ["grunt", "grunt", "shooter", "shooter", "marble_statue"]`

- shooterの比率を上げ、撃ってくる敵への対応に慣れさせる。
- オービター（`dom`）は無機質な機械デザインで西洋庭園の世界観と噛み合わない
  ため`domEnabled: false`に変更し、代わりに大理石像（`marble_statue`、
  `docs/enemies/marble_statue.md`参照）を追加した。見た目は暫定プレースホルダーで、
  最終的な「大理石のダビデ像のような敵」デザインは
  `docs/gemini-agent-instructions.md`の指示に沿って別途差し替える予定。

## 登場障害物

`obstacleKinds: VOID_OBSTACLE_KINDS = ["topiary", "fountain", "withered_tree"]`

トピアリー（刈り込み仕立ての生垣）や噴水など西洋庭園らしい意匠に、枯れ木を
混ぜることで「手入れされていたはずの庭が主を失った空虚さ」を表現する。
石灯籠（`stone_lantern`）は和風の意匠が浮くため、ステージ5 YOZAKURAへ
移設した（`docs/stages/05-yozakura.md`参照）。

## ボス

TOMOS（花の魔物）。詳細は`docs/boss-behaviors/tomos.md`・
`docs/boss-defeats/tomos.md`を参照。
