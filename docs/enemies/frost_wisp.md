# フロストウィスプ（`kind: "frost_wisp"`）

- 登場: ステージ3 FROZEN NEBULA
- HP: 1 / スコア: 240 / 移動速度基準値: 12（全エネミー中最も遅い）
- メッシュ: `buildFrostWispMesh()`（size=1、半透明の氷の八面体＋傾いたリング）

## 移動

基準の汎用パターンのみ。低速で漂うように接近する。

## 姿勢遷移

named pose のような姿勢ステートは持たない。汎用の自転のみ行う。

## 攻撃

- `fireFan(pos, 5, Math.PI * 0.5, 0xaaeeff)` で、自機方向を中心とした
  約90度の扇状に5発のミニ弾幕を放つ（`docs/boss-behaviors/godani.md`の
  氷色ホーミング弾と同系統の色）。
- 発射間隔: 2.5秒（基準値）。
