# ステージ6: INFERNO CORE

- `id: 6` / ボス: `cerberus`（CERBERUS、三頭の地獄の犬） / テーマ: `"inferno"`
- 所要時間: 72秒 / 敵速度倍率: 1.35

## コンセプト

地獄の中心。炎を吐く三頭の地獄の犬（CERBERUS）が待ち構える。地獄の中心へ
向かう地中トンネルの演出があり、天井にも地面と同じ紋様を配置することで、
上下を地面で挟まれたトンネル内を進んでいるように見せる
（`theme: "inferno"`、実装は`buildCeiling`参照）。

## 配色

- 地面: `0xff6600`
- 空（上）: `0x220000`
- 空（下）: `0x881100`

## 登場エネミー

`enemyKinds: ["shooter", "dasher", "dasher", "weaver", "ember_imp"]`

- 大きく蛇行して避けにくいweaverをここで初登場させる。
- エンバーインプを追加（`docs/enemies/ember_imp.md`参照）。自機の位置へ
  ダイブしてから撤退し、炎の軌跡を残す、INFERNO COREらしい攻撃的な
  エネミー。

## 登場障害物

`obstacleKinds: INFERNO_OBSTACLE_KINDS = ["pillar", "magma_boulder", "obsidian_spike"]`

マグマの岩塊や黒曜石の尖塔など、地獄らしい障害物を配置する。

## ボス

CERBERUS（三頭の地獄の犬）。詳細は`docs/boss-behaviors/cerberus.md`・
`docs/boss-defeats/cerberus.md`を参照。
