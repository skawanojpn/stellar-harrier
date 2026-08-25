# TOMOS（`bossType: "tomos"`）撃破演出

- 演出分類: **弾ける/散る**（`spawnBossDefeatDisperse`）
- SE分類: 生物系（`playBiologicalDeathCrySound`、現状ダミー）
- 総演出時間: 約0.9秒（`BOSS_DEFEAT_DISPERSE_DURATION_SECONDS`）

## 選定理由

花の怪物というモチーフ、および6枚の花弁でガードするという固有ギミック（`docs/boss-behaviors/tomos.md`参照）
を踏まえ、撃破時も「花弁が弾け散る」演出にする。

## 演出詳細

平面（`PlaneGeometry(0.35, 0.5)`）の花びら状パーティクルを14個、ピンク(`0xff99cc`)と
緑(`0x99ff88`)を交互に色付けして、ボスの位置から放射状かつ上向きに弾き飛ばす
（重力加速度4で徐々に落下）。カメラシェイクも軽く伴う。
