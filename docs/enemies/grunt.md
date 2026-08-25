# グラント（`kind: "grunt"`）

- 登場: ステージ1 FANTASY ZONE、2 VOID GARDEN、3 FROZEN NEBULA、4 CRYSTAL CANYON
- HP: 1（弾1発で撃破） / スコア: 100 / 移動速度基準値: 22
- メッシュ: `buildGenericEnemyMesh(size, false)`（緑色のicosahedron、size=1）

## 移動

基準となる汎用パターン（サインカーブによるX/Y方向の揺れ＋Z方向の直進接近）のみ。
個別の特殊な動きは持たない。

## 姿勢遷移

named pose のような姿勢ステートは持たない。個別のアニメーション演出もなく、
汎用のゆっくりとした自転（Y軸回転）のみ行う。

## 攻撃

攻撃できない（接触ダメージのみ）。もっとも基本的な汎用エネミー。
