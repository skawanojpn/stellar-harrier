# ボス行動仕様書

各ボスの「どう動くべきか」（移動・姿勢遷移・攻撃パターン・HP/フェーズ・固有ギミック）を、
実装から独立したドキュメントとしてここに記録する。

## 運用ルール

- **この仕様書が正**。ボスの動きを変更したいときは、まずこのファイル群を編集してから
  「この内容で実装して」と依頼する運用にする。
- 実装本体（`src/index.html`）は単一ファイル構成を崩さない。ボスごとにファイルを分けているのは
  このドキュメントのみで、コード自体は分割しない。
- 見た目（3Dメッシュ）は `assets/characters/bosses/build*Mesh.js` が別途担当している。
  このドキュメントは**動き**（移動・攻撃・HP等の振る舞い）専用で、メッシュの形状やマテリアルには触れない。
- 実装後、コードとこのドキュメントに差分が生まれたら、都度このドキュメントを更新する
  （このドキュメントが古いまま放置されるのが一番避けたい状態）。
- `STAGE_LIST.md` にはステージ表の一部として各ボスの一言サマリがあるが、詳細版はこちら。
  矛盾があればこちらを正とする。

## ファイル一覧

| ファイル                         | ボスID (`bossType`) | ボス名        | 登場ステージ        |
| -------------------------------- | ------------------- | ------------- | ------------------- |
| [scaler.md](scaler.md)           | `scaler`            | SCALER        | 1: FANTASY ZONE     |
| [tomos.md](tomos.md)             | `tomos`             | TOMOS         | 2: VOID GARDEN      |
| [godani.md](godani.md)           | `godani`            | GODANI        | 3: FROZEN NEBULA    |
| [sarpedon.md](sarpedon.md)       | `sarpedon`          | ASSAULT TRIAD | 4: CRYSTAL CANYON   |
| [sumo.md](sumo.md)               | `sumo`              | ONIMARU       | 5: YOZAKURA         |
| [cerberus.md](cerberus.md)       | `cerberus`          | CERBERUS      | 6: INFERNO CORE     |
| [fairy_queen.md](fairy_queen.md) | `fairy_queen`       | QUEEN TITANIA | 7: SWEETHEART GROVE |
| [barbarian.md](barbarian.md)     | `barbarian`         | MOAI          | 8: ABSYMBEL         |
| [final.md](final.md)             | `final`             | ABYSS ZERO    | 10: ABYSS ZERO      |

ステージ9（HALL OF LEGENDS）は上記8体を`scaler → tomos → godani → sarpedon → sumo → cerberus → fairy_queen → barbarian`の順で
連戦するボスラッシュ専用ステージで、`bossType: "generic"`として実装されている（固有の行動は持たない。個別ファイルは作らず、
このREADMEの記載のみとする）。

## 共通仕様

以下は個別ファイルでは繰り返さず、ここに一括で記載する。

- ボスは接触ダメージのみプレイヤーに与え、プレイヤーの体当たりでは倒せない
  （プレイヤーが被弾するだけで、ボス側はダメージを受けない）。
- 発射間隔などの`fireTimer`系の数値は、難易度倍率（`getDifficultyMultiplier()`）で割られてスケーリングされる。
  ドキュメント中の秒数は基準難易度（倍率1）での値。
- 通常ボスは画面奥（Z軸）を行き来する共通の接近パトロールパターンを持ち、
  `BOSS_ENGAGE_RANGE_BY_TYPE`で定義される範囲内のランダムなZ値まで接近して、遠端(`Z = -90`)まで後退する
  往復を繰り返す。個別ファイルでは「標準の奥行きパトロール」とだけ書き、この往復自体の説明は省略する。
  この標準パトロールを使わない場合（例: scaler, cerberus, sarpedon, sumoの独自移動）は、個別ファイルに明記する。
