# 敵キャラクター仕様書

ボス以外の敵キャラクター（雑魚敵という呼び方はせず「エネミー」と呼ぶ）の「どう動くべきか」
（移動・攻撃パターン・HP・スコア）を、実装から独立したドキュメントとしてここに記録する。

## 運用ルール

- **この仕様書が正**。動きを変更したいときは、まずこのファイル群を編集してから
  「この内容で実装して」と依頼する運用にする（`docs/boss-behaviors/`と同じ運用）。
- 見た目（3Dメッシュ）は `assets/characters/enemies/build*Mesh.js` が別途担当している。
  このドキュメントは**動き**（移動・攻撃・HP等の振る舞い）専用。
- 実装後、コードとこのドキュメントに差分が生まれたら、都度このドキュメントを更新する。

## ファイル一覧

| ファイル                               | `kind`           | 表示名               | HP  | スコア                         | 登場ステージ                           |
| -------------------------------------- | ---------------- | -------------------- | --- | ------------------------------ | -------------------------------------- |
| [grunt.md](grunt.md)                   | `grunt`          | グラント             | 1   | 100                            | 1, 2, 3, 4                             |
| [shooter.md](shooter.md)               | `shooter`        | シューター           | 1   | 200                            | 1, 2, 3, 4, 6, 8, 10                   |
| [dasher.md](dasher.md)                 | `dasher`         | ダッシャー           | 1   | 150                            | 3, 4, 6, 8, 10                         |
| [weaver.md](weaver.md)                 | `weaver`         | ウィーバー           | 1   | 250                            | 6, 8, 10                               |
| [dom.md](dom.md)                       | `dom`            | オービター           | 2   | 400                            | `domEnabled`のステージ（2,3,4,6,8,10） |
| [tomos_mob.md](tomos_mob.md)           | `tomos`          | トモス兵             | 1   | 未設定（要修正候補、下記参照） | `tomosEnabled`のステージ（8,10）       |
| [princess.md](princess.md)             | `princess`       | 姫                   | 1   | 300                            | 5（YOZAKURA）                          |
| [yoshitsune.md](yoshitsune.md)         | `yoshitsune`     | 義経                 | 1   | 220                            | 5（YOZAKURA）                          |
| [frog.md](frog.md)                     | `frog`           | 河童                 | 1   | 120                            | 5（YOZAKURA）                          |
| [biwa_hoshi.md](biwa_hoshi.md)         | `biwa_hoshi`     | 琵琶法師             | 1   | 280                            | 5（YOZAKURA）                          |
| [fairy.md](fairy.md)                   | `fairy`          | フェアリー           | 1   | 260                            | 7（SWEETHEART GROVE）                  |
| [pixie.md](pixie.md)                   | `pixie`          | ピクシー             | 1   | 180                            | 7（SWEETHEART GROVE）                  |
| [cupid.md](cupid.md)                   | `cupid`          | キューピッド         | 1   | 320                            | 7（SWEETHEART GROVE）                  |
| [imp.md](imp.md)                       | `imp`            | インプ               | 1   | 150                            | 7（SWEETHEART GROVE）                  |
| [sprite.md](sprite.md)                 | `sprite`         | スプライト           | 1   | 130                            | 1（FANTASY ZONE）                      |
| [frost_wisp.md](frost_wisp.md)         | `frost_wisp`     | フロストウィスプ     | 1   | 240                            | 3（FROZEN NEBULA）                     |
| [glitch_drone.md](glitch_drone.md)     | `glitch_drone`   | グリッチドローン     | 1   | 270                            | 4（CRYSTAL CANYON）                    |
| [ember_imp.md](ember_imp.md)           | `ember_imp`      | エンバーインプ       | 1   | 230                            | 6（INFERNO CORE）                      |
| [guardian_relic.md](guardian_relic.md) | `guardian_relic` | ガーディアンレリック | 2   | 450                            | 8（RUINS OF THE ANCIENTS）             |
| [shade.md](shade.md)                   | `shade`          | シェイド             | 1   | 300                            | 10（ABYSS ZERO）                       |

`aida`（`buildAidaMesh`、ギャラリー表示名「アイーダ護衛兵」）は実装・メッシュとも存在するが、
現在どのステージの`enemyKinds`にも含まれておらず、隠しコマンドのCharacter Galleryでのみ確認できる
未使用キャラクターである。削除するかどうかは未判断のため、このドキュメント対象からは除外しつつ
実装はそのまま残してある（削除する場合はユーザーの判断を仰ぐこと）。

## 共通仕様

- HPは`dom`/`guardian_relic`（2）を除き全キャラ1（弾1発で撃破）。
- 移動は基本的に「サインカーブによる左右・上下の揺れ＋奥から手前への直進」という共通パターンを
  ベースにしており、個別ファイルには**このベースからの差分のみ**を記載する
  （`dasher`のうねり抑制+高速化、`weaver`の大きな蛇行、`dom`の緩やかなヨー揺れ、
  `tomos`の顎の開閉、`princess`/`cupid`/`pixie`のメッシュ内蔵`updateLoop`、
  `glitch_drone`のテレポート、`ember_imp`の自機追従ダイブ、`shade`の透明度脈動など）。
- 攻撃できるキャラは`dom`/`shooter`/`weaver`/`princess`/`biwa_hoshi`/`fairy`/`cupid`/
  `frost_wisp`/`glitch_drone`/`guardian_relic`の10種のみ（`pixie`はワンド状のメッシュ・
  弾発射口を持つが、現状は発射ロジックに組み込まれておらず攻撃しない——今後の修正候補）。
  攻撃できるキャラの発射間隔は基本2.5秒（難易度倍率で短縮）で、`dom`のみ実際のマズル位置から
  発射、`weaver`/`guardian_relic`はホーミング弾、`frost_wisp`は扇状ミニ弾幕、`glitch_drone`は
  テレポート直後の即時発射、他はすべて発射時点の自機方向への直進弾となる。
- **既知の要修正候補**: `tomos`（雑魚版）のスコアが`scoreForEnemy`の明示テーブルに存在せず、
  フォールバック値5000が適用されている（他のどのキャラよりも高いスコアになってしまっている）。
  意図的な高得点設定なのか単なる設定漏れなのか要確認。
