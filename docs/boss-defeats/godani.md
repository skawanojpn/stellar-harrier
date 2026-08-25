# GODANI（`bossType: "godani"`）撃破演出

- 演出分類: **砕け散る**（`spawnBossDefeatShatterIce`、氷カラー版の`spawnBossDefeatShatter`）
- SE分類: 生物系（`playBiologicalDeathCrySound`、現状ダミー）
- 総演出時間: 約0.9秒（`BOSS_DEFEAT_SHATTER_DURATION_SECONDS`）

## 選定理由

双頭クリスタルドラゴンというモチーフ（結晶＝氷のイメージ）から、砕けて散らばる
氷の破片で表現する。

## 演出詳細

立方体（`BoxGeometry(0.18, 0.18, 0.18)`）の破片パーティクルを16個、薄水色(`0xaaeeff`)で
ボスの位置から放射状に飛び散らせる。重力加速度9で他の演出より早く落下し、
「重い結晶が砕けて地面に落ちていく」印象を出す。カメラシェイクも伴う。
