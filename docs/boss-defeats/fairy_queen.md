# QUEEN TITANIA（`bossType: "fairy_queen"`）撃破演出

- 演出分類: **消える**（`spawnBossDefeatFadeOut`）
- SE分類: 生物系（`playBiologicalDeathCrySound`、現状ダミー）
- 総演出時間: 約1.0秒（`BOSS_DEFEAT_FADE_DURATION_SECONDS`）

## 選定理由

妖精の女王というモチーフから、爆発的に散るのではなく「光の粒になってゆっくり
消えていく」幻想的な演出にする。

## 演出詳細

小さな球体パーティクル（半径0.07）18個を、淡い金色(`0xfff0a0`)で生成し、緩やかに
上昇させながら（重力加速度を負(-1.5)にして浮遊効果を出す）フェードアウトさせる。
爆発演出と違い、カメラシェイクは発生させない（静かな退場を表現するため）。
