# STELLAR HARRIER

three.jsを使用した擬似3Dシューティングゲーム。ファンタジー×SFが融合した世界観、スピード感あふれる疑似3D演出、オリジナルBGMで、オールドスクールなアーケードシューターへのオマージュを詰め込んだブラウザゲーム。

**▶ [今すぐプレイ](https://skawanojpn.github.io/stellar-harrier/)**（インストール不要、ブラウザで開くだけ）

## 遊び方

| 操作     | キー                                        |
| -------- | ------------------------------------------- |
| 移動     | 矢印キー / WASD / テンキー / マウスドラッグ |
| ショット | スペースキー / マウスクリック               |
| ポーズ   | ポーズボタン（画面右下）                    |

自機を左右上下に動かして敵弾・障害物をかわしながら、迫りくる敵とステージ最後に待ち受けるボスを撃破してスコアを稼ごう。連続撃破でコンボボーナスも発生する。

## ステージ＆ボス

全10ステージ構成。ステージが進むごとに敵の攻撃も激しくなる。

| ステージ           | ボス                                                       |
| ------------------ | ---------------------------------------------------------- |
| FANTASY ZONE       | SCALER（東洋の龍）                                         |
| VOID GARDEN        | TOMOS（花の怪物）                                          |
| FROZEN NEBULA      | GODANI（双頭クリスタルドラゴン）                           |
| CRYSTAL CANYON     | ASSAULT TRIAD（ドム3体のジェットストリームアタック）       |
| YOZAKURA           | ONIMARU（土俵の力士）                                      |
| INFERNO CORE       | CERBERUS（炎を吐く三頭の地獄の犬）                         |
| SWEETHEART GROVE   | QUEEN TITANIA（花冠と羽を持つ妖精の女王）                  |
| ABSYMBEL           | MOAI（口から波状誘導弾を放つ石像、失われた古代文明の遺跡） |
| HALL OF LEGENDS    | BOSS RUSH（これまでのボスとの連戦）                        |
| ABYSS ZERO（最終） | ABYSS ZERO                                                 |

## 隠し要素

- タイトル画面で **↑×6 → ←×4 → →×3** と入力すると、STAGE / BOSS TEST / ENDING を選べる隠しメニューが開く
- プレイ中に **↑↑↓↓←→←→BA**（コナミコマンド）を入力すると、そのステージクリアまで無敵になる
- ゲームオーバー画面でコナミコマンドを入力すると、ライフ3・スコア0で同じ場面から再開できる

## 開発

```bash
npm install
npm run verify   # typecheck + lint + format:check + test + build
```

- `src/index.html` — ゲーム本体（three.js + Web Audio API、外部バックエンドに依存しない自己完結HTML）
- `src/game/*.ts` — 純粋ロジック（衝突判定・スコア・敵出現パターン等）の参考実装。`tests/` で Vitest によりテスト
- `build.mjs` — `src/index.html` を `dist/index.html` としてコピーするだけのシンプルなビルド

`src/index.html` 内のゲームロジックは vanilla JS で書かれており、`src/game/*.ts` の同名ロジックとは実装が重複している（テストは `src/game/*.ts` 側のみを検証）。

`main` ブランチへの push で GitHub Actions (`.github/workflows/deploy.yml`) が `npm run verify` を実行し、成功すれば GitHub Pages へ自動デプロイする。
