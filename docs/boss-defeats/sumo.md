# ONIMARU（`bossType: "sumo"`）撃破演出

- 演出分類: **地に崩れ落ちる**（`spawnBossDefeatFall`）
- SE分類: 生物系（`playBiologicalDeathCrySound`、現状ダミー）
- 総演出時間: 約1.0秒（`BOSS_DEFEAT_FALL_DURATION_SECONDS`）

## 選定理由

土俵の力士というモチーフから、爆発ではなく「土俵に崩れ落ちる」演出にする。

## 演出詳細

地面付近の高さ（`y = -3.5`固定）に土煙（茶色`0xcaa46a`の球体パーティクル12個）を
発生させ、地面すれすれの高さでゆっくり広がるように見せる（重力加速度3）。
カメラシェイクも伴う。
