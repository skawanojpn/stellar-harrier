# STELLAR HARRIER 開発マスタードキュメント

このファイルは開発再開時に最初に読むべき単一の入口（マスタードキュメント）です。
プロジェクトの全体像・ファイル構成・世界観・開発方針・進行中/今後の課題を一箇所に
まとめています。**今後、開発方針や課題に変化があった場合は都度このファイルを
更新してください。**

旧`ARCHITECTURE.md`・`STAGE_LIST.md`・`追加修正.md`の内容はこのファイルに統合済み
です（3ファイルとも削除済み）。個別の詳細仕様（ボスの技、エネミーの動き、ステージ
コンセプト）は`docs/`配下の各ディレクトリが正であり続けます。本ファイルはそれらへの
ハブ・索引と、横断的な開発方針・経緯の記録を担います。

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [ファイル構成](#ファイル構成)
3. [世界観・ストーリー](#世界観ストーリー)
4. [ステージ・ボス一覧](#ステージボス一覧)
5. [ドキュメント運用ルール](#ドキュメント運用ルール)
6. [開発フロー・ツール](#開発フローツール)
7. [開発方針・レビュー観点](#開発方針レビュー観点)
8. [開発履歴](#開発履歴)
9. [今後の課題](#今後の課題)
10. [次世代構想: STELLAR HARRIER 2](#次世代構想-stellar-harrier-2)

---

## プロジェクト概要

- **ジャンル**: セガ「スペースハリアー」へのオマージュとなる、疑似3Dの奥スクロール型
  シューティングゲーム。地面を疾走しながら奥から迫る敵・障害物を避けつつ撃破し、
  各ステージの最後に待つボスを倒して進んでいく。
- **技術**: three.js（CDN読み込み）+ Web Audio API のみに依存する、外部バックエンド
  不要の自己完結型ブラウザゲーム。
- **公開URL**: https://skawanojpn.github.io/stellar-harrier/
  （`main`ブランチへのpushで GitHub Actions が自動デプロイ）

## ファイル構成

### 全体像

```
stellar-harrier/
├── src/
│   ├── index.html          ← ゲーム本体（実際にプレイされる唯一のコード）
│   └── game/                ← ゲームロジックのテスト用リファレンス実装（TypeScript）
│       ├── attackPattern.ts / collision.ts / obstacles.ts
│       ├── player.ts / score.ts / spawner.ts / stages.ts
├── tests/                    ← src/game/*.ts に対するVitestテスト
├── dist/                     ← ビルド成果物（git管理外、build.mjsが生成）
├── assets/                   ← 編集用複製（git管理外、後述）
│   ├── characters/ / music/ / sfx/ / boss_images/
├── docs/                      ← 仕様書群（git管理対象、後述）
│   ├── DEVELOPMENT.md            ← このファイル
│   ├── TODO-renaming.md
│   ├── boss-behaviors/ / boss-defeats/ / enemies/ / stages/
├── build.mjs / package.json / tsconfig.json / eslint.config.mjs
├── .prettierrc.json / .prettierignore
├── .github/workflows/deploy.yml
└── README.md                  ← プレイヤー向け説明（遊び方中心）
```

### 最重要: `src/index.html` がゲーム本体

**実際にプレイヤーが遊ぶコードは `src/index.html` の1ファイルに全て入っています**
（2026年8月時点で約37,000行）。three.js（CDN読み込み）とWeb Audio APIのみに依存する、
外部バックエンド不要の自己完結型HTMLです。ビルドは`build.mjs`がこのファイルを
`dist/index.html`へコピーするだけで、バンドル・トランスパイルは一切行いません。

内部は大きく3セクションに分かれます（ファイル内に`// ====...`の区切りコメントあり）。

1. **純粋ロジック**（先頭付近） — `src/game/*.ts`と同じ考え方をブラウザ実行用に
   vanilla JSで複製したもの（当たり判定・スコア計算など）
2. **サウンド** — Web Audio APIによるオシレーター合成のチップチューン風SE/BGM
   （外部音源ファイルは一切使わない）
3. **Three.jsシーン構築** — ゲームの大部分を占める本体。ステージ定義（`STAGES`）、
   BGMパターン（`STELLAR_TRACK_DATA`）、敵/ボス/障害物のメッシュ構築・攻撃パターン・
   状態遷移、メインループ（`init`/`loop`/`update`）、隠しコマンド処理などが全て
   ここに含まれる

#### 主な内部ランドマーク（関数・変数名で検索する際の目印）

| 目印                                            | 内容                                                                             |
| ----------------------------------------------- | -------------------------------------------------------------------------------- |
| `var STAGES`                                    | 全ステージの定義配列（id・名前・敵構成・ボス種別・背景色・障害物ロースターなど） |
| `var STELLAR_TRACK_DATA`                        | ステージ/ボスごとのBGMの音符データ                                               |
| `function spawnEnemy`                           | 雑魚エネミー・ボスの生成                                                         |
| `function fireAtPlayer`                         | 敵/ボスごとの攻撃パターン分岐                                                    |
| `function updateBossPerformance`                | ボスごとの固有の動き・演出                                                       |
| `function updateEnemies`                        | 敵の毎フレーム更新（移動・発砲・被弾判定）                                       |
| `function updateEnemyBullets`                   | 敵弾の毎フレーム更新（直進/ホーミング/扇状/寿命管理）                            |
| `function loadStage` / `advanceToNextStage`     | ステージ読み込み・ステージ間遷移（色フェード含む）                               |
| `function startEndingSequence` / `updateEnding` | 最終ボス撃破後のエンディング演出一式                                             |
| `function init`                                 | three.jsシーンの初期構築                                                         |
| `function loop`                                 | メインのアニメーションループ                                                     |
| `function update(dt)`                           | プレイ中（`STATE_PLAYING`）の毎フレーム更新                                      |
| `CHARACTER_GALLERY_ENTRIES`                     | 隠しコマンドのCharacter Galleryに表示される全キャラ/障害物の一覧                 |
| 隠しコマンド付近のコメント                      | タイトル画面のステージ選択メニュー・無敵モードなどの隠し要素                     |

### `src/game/*.ts` は「テスト用の簡易リファレンス実装」（現行仕様とは乖離あり）

`src/game/*.ts`は`src/index.html`内の対応ロジック（衝突判定・スコア計算・敵/障害物の
出現スケジューリングなど）を、Vitestでユニットテストしやすい形でTypeScriptに書き直した
ものです。**ゲームの実行には一切使われません**（HTMLからimportされることもありません）。

**この簡易実装は`src/index.html`の現在の内容から既に大きく乖離しています。**
例えば`stages.ts`は3ステージ・敵種別も`grunt`/`shooter`/`boss`の3種類しかありませんが、
実際の`src/index.html`は10ステージ・敵種別も30種類以上あります。
**`src/game/*.ts`を「現在のゲーム仕様の正」として参照しないでください。**

| ファイル           | 役割                                                  |
| ------------------ | ----------------------------------------------------- |
| `attackPattern.ts` | 扇状弾（fan shot）の方向ベクトル計算                  |
| `collision.ts`     | 円同士の当たり判定（`circlesIntersect`）              |
| `obstacles.ts`     | 障害物（柱/岩）の出現スケジュール生成                 |
| `player.ts`        | 自機の移動範囲クランプ・残機減少                      |
| `score.ts`         | 敵種別ごとのスコア計算                                |
| `spawner.ts`       | 敵の出現スケジュール生成                              |
| `stages.ts`        | ステージ定義・ステージID解決（簡易版、3ステージのみ） |

対応する`tests/*.ts`はそれぞれ同名の`src/game/*.ts`をテストします。

### `assets/` は「編集用の複製」（gitignore対象、ゲームには使われない）

`assets/characters/`・`assets/music/`・`assets/sfx/`には、`src/index.html`内の各
キャラクターメッシュ生成関数（`build*Mesh`）・BGMトラックデータ・効果音関数
（`play*Sound`/`play*Voice`）を、それぞれ1体/1曲/1関数=1ファイルの単位で複製した
ものが入っています。**ゲームはこれらのファイルを一切読み込みません**
（`.gitignore`で除外されており、リポジトリにも含まれません）。

目的は、3万行超の`src/index.html`から特定のキャラクター/曲/効果音のコードだけを
取り出し、他のエディタで集中して編集できるようにすることです。編集後はClaudeに
渡して`src/index.html`側の該当箇所へ手動で統合してもらう運用です
（**自動同期の仕組みはありません**）。各フォルダの`README.md`に詳しい統合手順を
記載しています。

`assets/boss_images/`はボスの見た目を考える際の参考画像（生成AIによるコンセプト
アート）です。ゲーム本体からは独立した参考資料です。

### `docs/` は「仕様のソース・オブ・トゥルース」（git管理対象）

`docs/boss-behaviors/`から始まった運用パターンを、`docs/boss-defeats/`・
`docs/enemies/`・`docs/stages/`にも展開したものです。共通ルール:

- **ドキュメントが正**。振る舞いを変えたい場合はまずここを編集してから実装依頼する。
- 実装（`src/index.html`）とドキュメントに差分が生まれたら、都度ドキュメントを更新する。
- 各ディレクトリに`README.md`（ファイル一覧表・運用ルール・共通仕様）を必ず置く。

| ディレクトリ                                       | 内容                                                             |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| [`docs/boss-behaviors/`](boss-behaviors/README.md) | 各ボスの技・攻撃パターンの仕様                                   |
| [`docs/boss-defeats/`](boss-defeats/README.md)     | 各ボスの撃破演出・断末魔SEの仕様                                 |
| [`docs/enemies/`](enemies/README.md)               | ボス以外のエネミーの移動・攻撃・HP・スコア仕様（全21種）         |
| [`docs/stages/`](stages/README.md)                 | 各ステージのコンセプト・配色・登場エネミー/障害物ロースター      |
| [`docs/TODO-renaming.md`](TODO-renaming.md)        | コード上の内部識別子と表示名の不一致一覧（実装未着手、参照専用） |
| `docs/DEVELOPMENT.md`                              | このファイル                                                     |

`docs/gemini-agent-instructions.md`（キャラクター/障害物デザイン・BGM作曲を
Geminiに委託する際の作業指示書）は、コードと無関係な内部ルーチン文書のため
`.gitignore`対象・ローカルのみで運用する（GitHubへは公開しない）。

### 設定・ビルド・デプロイ関連ファイル

| ファイル                               | 役割                                                                                                                          |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `build.mjs`                            | `src/index.html`を`dist/index.html`にコピーするだけのビルドスクリプト（バンドル等は行わない）                                 |
| `package.json`                         | npm scripts（`typecheck`/`lint`/`format`/`test`/`build`/`verify`）とdevDependencies                                           |
| `tsconfig.json`                        | TypeScriptの型チェック設定。`src/game/**`と`tests/**`のみが対象で、`src/index.html`は対象外（素のJSなので型チェックされない） |
| `eslint.config.mjs`                    | ESLint設定（`src/game/**`・`tests/**`のTS/JSファイルが対象）                                                                  |
| `.prettierrc.json` / `.prettierignore` | コード整形（Prettier）の設定と対象外指定。`src/index.html`も整形対象に含まれる                                                |
| `.github/workflows/deploy.yml`         | `main`ブランチへのpushで`npm run verify`を実行し、成功したら`dist/`をGitHub Pagesへ自動デプロイするワークフロー               |
| `.gitignore`                           | `node_modules/`・`dist/`・`coverage/`・`.DS_Store`・`assets/`等を除外                                                         |

### npm scripts

| コマンド                          | 内容                                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| `npm run typecheck`               | `tsc --noEmit`（`src/game/**`・`tests/**`のみ）                                           |
| `npm run lint`                    | ESLint                                                                                    |
| `npm run format` / `format:check` | Prettierで整形 / チェックのみ（`src/index.html`含む全対象ファイル）                       |
| `npm run test`                    | Vitestで`tests/*.ts`を実行                                                                |
| `npm run build`                   | `build.mjs`を実行し`dist/index.html`を生成                                                |
| `npm run verify`                  | 上記5つ（typecheck→lint→format:check→test→build）を一括実行。**作業完了前に必ず通すこと** |

---

## 世界観・ストーリー

**世界観**: ファンタジーとSFが融合した異世界。主人公は光の速さで宇宙を翔ける戦闘機に
乗り、次々と姿を変える異世界のステージを駆け抜けていく。各ステージは幻想的な庭園から
氷結する宇宙、デジタルな異空間、和の異界、灼熱の業火、甘い罠の楽園、太古の遺跡まで、
一貫した脈絡を持たない断片的な世界の集合体として描かれる。

**ストーリー**: 異世界の扉をくぐった主人公は、幻想と魔法に満ちた世界（FANTASY ZONE）を
旅の起点に、次々と異質な領域を通過していく。華やかな幻想の続きだと思って踏み込んだ先が
実は西洋庭園の廃園だったという肩透かし（VOID GARDEN）から始まり、世界は氷結
（FROZEN NEBULA）、デジタル化（CRYSTAL CANYON）、和の異界（YOZAKURA）へと姿を変え、
旅は業火の試練（INFERNO CORE）でピークを迎える。その直後に油断を誘う甘い楽園
（SWEETHEART GROVE）を経て、失われた古代文明の神殿（RUINS OF THE ANCIENTS）へと
たどり着く。神殿の奥ではこれまで相見えたすべての強敵との総決算（HALL OF LEGENDS）が
待ち受け、その先の最奥（ABYSS ZERO）で、太古の荘厳さが失われ闇そのものと化した根源
との最終決戦を迎える。

## ステージ・ボス一覧

全10ステージ + ボスラッシュ専用ステージ。**各ステージの詳細（コンセプト・配色・
登場エネミー・登場障害物・ボスへのリンク）は[`docs/stages/README.md`](stages/README.md)
が正**です。ここでは概観のみ示します。

| #   | ステージ名            | ボス表示名（内部`bossType`）   | テーマ                       |
| --- | --------------------- | ------------------------------ | ---------------------------- |
| 1   | FANTASY ZONE          | SCALER（`scaler`）             | 爽快な青空の導入ステージ     |
| 2   | VOID GARDEN           | TOMOS（`tomos`）               | 主を失った西洋庭園           |
| 3   | FROZEN NEBULA         | GODANI（`godani`）             | 氷雪の双頭クリスタル龍       |
| 4   | CRYSTAL CANYON        | ASSAULT TRIAD（`sarpedon`）    | デジタル/ネオンの結晶谷      |
| 5   | YOZAKURA              | ONIMARU（`sumo`）              | 和風妖怪・逢魔が時の宵闇     |
| 6   | INFERNO CORE          | CERBERUS（`cerberus`）         | 地獄の中心・炎のトンネル     |
| 7   | SWEETHEART GROVE      | QUEEN TITANIA（`fairy_queen`） | パステルな花畑・妖精の国     |
| 8   | RUINS OF THE ANCIENTS | MOAI（`barbarian`）            | 失われた古代文明の遺跡       |
| 9   | HALL OF LEGENDS       | BOSS RUSH（8体連戦）           | ボスラッシュ専用ステージ     |
| 10  | ABYSS ZERO            | ABYSS ZERO（`final`）          | 最終ステージ・闇に堕ちた神殿 |

ボスラッシュ順（HALL OF LEGENDS）: `scaler → tomos → godani → sarpedon → sumo →
cerberus → fairy_queen → barbarian`（`final`は含まれない。エンディングのボス回想
演出では`final`を含めた9体を振り返る）。

### 命名の経緯（過去の検討からの変更点）

- 「YOKAI SHRINE」→「YOZAKURA」、ボス名「DOHYO GUARDIAN」→「ONIMARU」に変更
- 「JET STREAM DOMS」→「ASSAULT TRIAD」に改名（機構団の攻撃部隊らしい名称へ）
- 「LOST WORLD」構想は不採用、旧ステージ名「ABSYMBEL」も不採用となり、
  古代文明ステージは「RUINS OF THE ANCIENTS」に、最終ステージは「ABYSS ZERO」に確定
- ステージ順序を大幅に並べ替え（VOID GARDEN/FROZEN NEBULA/CRYSTAL CANYONのボス入れ替え含む）
- INFERNO COREのボスをCERBERUS（三頭の炎の番犬）に変更
- 内部識別子（`bossType`/`kind`）と表示名が一致していない箇所は
  [`docs/TODO-renaming.md`](TODO-renaming.md)にリスト化済み（実装は未着手、
  他の作業が一段落してから対応するかどうかを判断する）

---

## ドキュメント運用ルール

1. **`docs/`配下の各仕様書が正**。ゲームの挙動を変えたい時は、まず該当ドキュメントを
   編集してから「この内容で実装して」と依頼する。
2. 実装後、コードとドキュメントに差分が生まれたら、都度ドキュメントを更新する
   （逆に、ドキュメントを直しただけで実装を放置しない）。
3. 新しい`docs/`サブディレクトリを作る場合は、既存の`docs/boss-behaviors/README.md`
   と同じフォーマット（ファイル一覧表・運用ルール・共通仕様・関連ディレクトリへの
   クロスリファレンス）を踏襲する。
4. `assets/`配下の編集用複製ファイルを更新した場合、`src/index.html`への統合は
   自動化されていないため、必ず手動で（Claudeに依頼して）反映させる。
5. 大きな仕様変更・修正依頼を行う際は、このファイル（`docs/DEVELOPMENT.md`）の
   「今後の課題」セクションに事前にメモしておくと、セッションをまたいでも文脈が
   引き継がれやすい。
6. キャラクター/障害物の**見た目のデザイン**とBGMの作曲は、`assets/`配下の
   `.js`ファイル（1関数/1曲=1ファイルの編集用複製）に限り、Gemini等の他の
   AIエージェントに委託できる。委託する場合は`docs/gemini-agent-instructions.md`
   （非公開・ローカル限定の内部ルーチン文書、`.gitignore`対象）をあわせて渡す。
   統合・`npm run verify`・実機確認・コミット/デプロイは引き続きClaude Codeが
   担当する。

---

## 開発フロー・ツール

- **検証**: 実装後は必ず`npm run verify`（typecheck→lint→format:check→test→build）
  を通す。
- **ビジュアル確認**: `python3 -m http.server`で`dist/`を配信し、Playwright CLI
  （`npx --yes --package @playwright/cli playwright-cli`）で操作・スクリーンショット
  確認する。
- **デバッグフック**: `window.__debugXXX`関数は**`dist/index.html`にのみ**一時的に
  注入して使い、確認が終わったら必ず除去して`npm run build`でクリーンな
  `dist/index.html`を再生成する。**`src/index.html`は絶対に汚さない。**
  - IIFEスコープの制約により、`page.evaluate()`から直接ゲーム内部の変数・関数へは
    アクセスできない。必ず`window.__debugXXX = function(){...}`という形でIIFE内から
    明示的に公開する。
  - Playwrightコマンドの発行自体にオーバーヘッドがあり、実時間で動く
    `requestAnimationFrame`ループと手動`update(dt)`呼び出しが二重に時間を進めて
    しまうことがある。短い演出を検証する時は、該当する時間定数を一時的に
    大幅延長（例: 8秒）してから確認し、確認後に元に戻すと安定する。
- **コミット運用**: 作業単位ごとに逐次コミット・pushし、GitHub Pagesへの反映を
  都度確認する（トークン制限で途中終了しても直前までの成果が失われないように
  するため）。

## 開発方針・レビュー観点

過去の実装セッションで確立した、今後も踏襲すべき設計判断:

- **単一ファイルアーキテクチャの維持**: `src/index.html`をゲーム本体とする現行方針は
  意図的なものであり、`src/game/*.ts`への統合や分割は行わない（後継作
  STELLAR HARRIER 2で仕切り直す方針、後述）。
- **ディスパッチテーブルパターン**: `bossType`→関数のマッピング（`BOSS_HIT_SOUND_BY_TYPE`
  等）は今後もボス固有の分岐を増やす際の標準パターンとする。
- **汎用ヘルパー関数の再利用**: `spawnEnemyBulletAt`/`fireFan`/`spawnHomingMissile`/
  `spawnParticleBurst`等、色やパラメータを引数化した汎用関数を優先し、新規敵/ボスの
  追加時もこれらを使い回す。
- **敵弾の生存期間管理**: 自機を常時追尾する`isHoming`系の弾は、Z/Y座標による境界
  削除だけでは不十分（行き過ぎても旋回して戻り続けるため）。新しいホーミング系弾を
  追加する際は必ず`lifeSeconds`のような寿命上限を設定すること。
- **敵の発射位置の妥当性**: 雑魚エネミーの攻撃は`ENEMY_FIRE_MAX_Z`より奥にいる間のみ
  許可される（自機の目の前・後方からの回避不能な発射を防ぐガード）。ボスは
  `BOSS_ENGAGE_RANGE_BY_TYPE`で個別に交戦距離を管理しており、この制約の対象外
  （MOAIのように意図的に自機付近まで迫るボスもいるため）。
- **ステージ遷移中の状態管理**: `stageColorFadeActive`のような非同期の演出フラグが
  立っている間は、`currentStage`がまだ更新されていない可能性があることを常に意識する
  （`stageComplete`のような判定ロジックを演出中にも再評価してしまうと二重発火する
  典型的なバグパターン。2026-08-26の色フェード二重発火バグを参照）。
- **UIの技術監査**: 隠しページ等の開発者向けUIも含め、`impeccable audit`で
  アクセシビリティ・レスポンシブ対応を定期的にチェックする。

---

## 開発履歴

時系列（コミット履歴ベース、要点のみ）:

1. **初期実装** — スペースハリアー風の疑似3Dシューティングの基本骨格（自機移動、
   敵/障害物のスポーン、スコア、簡易ボス）。
2. **10ステージ構成の確立** — 現行のステージ順序・ボス布陣・1UPシステム・SCALER
   （東洋の龍）の再設計を含む大規模拡張。
3. **全ボスメッシュの再設計と戦闘バランス調整**（`606900c`）。
4. **ボス行動ドキュメントの新設**（`docs/boss-behaviors/`）とサウンド/演出の
   細部調整（`097dd57`）— 以降、ボスの仕様変更はドキュメント経由で行う運用が定着。
5. **`追加修正.md`の13項目対応**（2026-08-25〜26、以下のコミット群）:
   - 無敵モード常時シールド表示、ボス警告音とボス出現の間隔調整
   - ボス被弾SE/断末魔SEのダミー実装とディスパッチテーブル化
     （`assets/sfx/boss_hits/`・`assets/sfx/boss_deaths/`新設）
   - ボスごとの固有ビームデザイン（雷・氷・炎・レインボー等）
   - ボス撃破時の退場演出・断末魔SE・撃破後の余韻（`docs/boss-defeats/`新設）
   - ステージ切り替え時の地面/背景の色フェード
   - 雑魚エネミーの名称整理（「雑魚」→「エネミー」）と`docs/enemies/`新設
     （全14種→後に6種追加され計20種）
   - ステージテーマに合わせた障害物デザイン12種の新規追加
   - 新規敵キャラ6種追加（sprite/frost_wisp/glitch_drone/ember_imp/
     guardian_relic/shade）と`docs/stages/`新設（全10ステージ分）
   - 設定メニューのUI/UX改善（`impeccable`スキル使用、ポーズ画面を本格的な
     設定パネルに拡張、BGM/SE音量スライダー追加）
   - `docs/TODO-renaming.md`新設（内部識別子と表示名の不一致を記録、実装は未着手）
   - オールクリア後の演出強化（ユーザー承認を得たうえで実装）:
     ボス回想モンタージュ・エンディングテキスト拡充・祝福パーティクル
   - `docs/`全体のREADME整合性確認、ルート`README.md`にドキュメント索引を追加
6. **ユーザー実プレイ後のバグ修正・追加UI改善**（2026-08-26、`43acc90`）:
   - ステージクリア時の色フェード中に`stageComplete`判定が再度trueになり、
     クリアファンファーレが二重再生・次ステージBGMが鳴らない・ステージバナーが
     短く見えるバグを修正（`stageColorFadeActive`中は判定をスキップするガードを追加）
   - 雑魚エネミーが自機のすぐ近く/背後から発射する回避不能弾を防ぐ
     `ENEMY_FIRE_MAX_Z`ガードを追加
   - 自機を追尾し続けるホーミング弾（`isHoming`）が画面外に出た後も永久に旋回して
     戻り続けるバグを修正（`lifeSeconds`寿命上限を追加、`isHomingToFixedTarget`にも
     防御的に適用）
   - エンディング演出: 最終ステージの配色からエンディング配色への色フェードを追加、
     ボス回想に最終ボスを追加（計9体）、1体あたりの表示時間を1.3倍に、
     オールクリア画面の締めメッセージを4パターン化（撃破時の被弾数に応じて
     選択ロジックを分岐）
   - INFERNO COREの柱障害物を地面〜天井まで届く専用メッシュに変更
   - VOID GARDEN（ステージ2）の障害物を西洋庭園コンセプトに刷新
     （トピアリー・噴水を新設、石灯籠はYOZAKURAへ移設）
   - Character Galleryの矢印キー操作バグ修正（↑↓移動時に3Dプレビューが
     更新されない不具合）と、未収録だった障害物15種の追加登録（全57種を網羅）
   - 隠しENDINGタブをSTAGEタブのリスト末尾に統合、`impeccable audit`による
     隠しページUIの技術監査とレスポンシブ/ARIA対応の修正
7. **SCALERの体型・当たり判定調整**（2026-08-26、`7954ccf`）:
   - サイズを1.5倍(`SCALER_VISUAL_SCALE`)、胴体の横幅を1.25倍(`SCALER_BODY_WIDTH_SCALE`)に拡大
   - 折り返し時に本体衝突で理不尽に被弾する問題を、Playwrightで自機を完全追従させる
     専用デバッグリグで検証。当初「折り返し直後を無敵にするタイマー方式」で実装したが、
     実際の被弾は往路（折り返し前）に起きていたと判明したため撤回し、Z距離ベースの
     対称的な無敵判定（`SCALER_NEAR_COLLISION_SAFE_DISTANCE`）に置き換え
8. **Stage2エネミー刷新とGemini連携指示書の新設**（2026-08-26、`38cfc6b`）:
   - Stage2（VOID GARDEN）から機械的な意匠の`dom`（オービター）を除外
     （`domEnabled: false`）、代わりに新規`marble_statue`（大理石像）を追加。
     見た目は暫定プレースホルダー、動きの仕様（HP/スコア/移動）は確定
   - `docs/gemini-agent-instructions.md`を新設。キャラクター/障害物の見た目
     デザインをGemini等の他AIエージェントに委託するための恒久的な作業指示書
     （編集してよい範囲・厳守ルール・受け渡しフロー・サイズ感の目安を網羅）
   - `assets/characters/obstacles/`の同期漏れ16ファイルを発見し一括修正
9. **Gemini制作の西洋庭園デザイン統合**（2026-08-26、`fd603cb`）:
   - Geminiサブエージェントが`assets/characters/`配下で制作した5つのメッシュ
     デザインを`src/index.html`へ統合（`docs/gemini-handover.md`が引き渡し文書）
   - `buildMarbleStatueMesh`: ダビデ像風のコントラポスト浮遊像＋金の光輪
   - `buildTopiaryMesh`: 古代ローマ風の双柱パーゴラ＋巻きつくアイビー
   - `buildFountainMesh`: 2段式大理石噴水＋滝カーテン・水しぶき
   - `buildWitheredTreeMesh`: ねじれたオリーブ幹＋糸杉風の炎状樹冠
   - `buildTomosBossMesh`: 茎を花弁の奥(-Z)に配置し根張りを強化、鞭蔓を
     3本→6本・長さ約2倍に拡張、常時うねるアニメーションに変更
   - `npm run verify`全通過、Playwrightで実機確認（Stage2実プレイ+Character
     Galleryで5体全て個別レンダリング確認、コンソールエラーなし）

## 今後の課題

このセクションは随時更新し、次回セッション開始時にまず確認すること。

- **Item 10（コード管理名の整理）**: `docs/TODO-renaming.md`に一覧化済みだが実装は
  未着手。他の実装作業が一段落してから、ユーザーの判断のもとで着手するかどうかを
  決める。
- **`pixie`の未発射問題**: `docs/enemies/pixie.md`に記載の既知の不具合
  （ワンド状のメッシュを持つが発射ロジックに組み込まれていない）。修正候補。
- **`tomos`（雑魚版）のスコア未設定**: `scoreForEnemy()`の明示テーブルに存在せず、
  フォールバック値5000が適用されている（`docs/enemies/README.md`に記載）。
  意図的な高得点なのか設定漏れなのか要確認。
- **`aida`（未使用キャラ）の扱い**: `buildAidaMesh`は実装・Character Galleryへの
  登録済みだが、どのステージの`enemyKinds`にも含まれていない。削除するか
  ステージに組み込むか、ユーザーの判断待ち。
- **`shade`の透明度演出とタイミングの非同期**: `docs/enemies/shade.md`に記載の
  既知の課題（不透明度の脈動と実際の発射タイミングが厳密には連動していない）。
- **`src/game/*.ts`のリファレンス実装としての陳腐化**: 現行の`src/index.html`との
  乖離が大きい。当面はテスト用の骨格として残すか、STELLAR HARRIER 2側での
  作り直しに合わせて役目を終えるかを検討する。

---

## 次世代構想: STELLAR HARRIER 2

前作（本リポジトリ）の「1ファイル3万行超に全部が混在する」「`src/game/*.ts`という
実行に使われないテスト用参考実装との二重管理」「`assets/`配下の手動複製・手動統合」
という反省を踏まえ、後継作の開発基盤構築プランが検討済みです
（本リポジトリとは別プロジェクトとして新規に立ち上げる想定、現時点では未着手）。

### 設計方針（確定事項）

- TypeScript + Vite + three.js構成
- キャラクター表現をプリミティブジオメトリ組み立てから、`THREE.Sprite`による
  ビルボード式2Dイラスト（複数フレーム差し替えでモーション表現）に転換
- **「1キャラクター/1ボス/1ステージ/1BGM/1背景 = 1ファイルが実行時にそのまま
  importされる」**モジュール分割を徹底し、前作の「編集用複製を手動で統合し直す」
  運用から脱却する
- 各ジャンルの`index.ts`はレジストリ（データを集めてマップにするだけの薄い
  バレル）に徹し、ロジックを書かない
- `stages/*.ts`のようなデータ定義ファイルは、キャラクター/ボス/BGM/背景を
  **文字列IDで参照**する（直接importして密結合させない）。ID→実体の解決は
  `engine`層の1箇所に閉じ込める
- 画像アセットは`public/sprites/...`に配置し、コードからは文字列パスで参照する
  （Vite importのハッシュ化を避け、ユーザーによる後からの差し替えを容易にするため）

### Phase 1スコープ（プロジェクト雛形 + 最小構成）

自機1体が画面に表示されキー入力で動く最小構成まで。ステージ・敵・ボス・BGMの
実データ投入は次フェーズ以降。実装するファイル一覧・完了判定基準・実行手順は
`~/.claude/plans/ethereal-chasing-curry.md`に詳細計画として保存済み
（Phase 1では`characters/index.ts`等のレジストリ・複数キャラ機構はまだ作らない
——時期尚早な抽象化を避ける方針）。

**着手する際は、まずこの計画ファイルを読み返してから開始すること。** 本リポジトリ
（stellar-harrier）とは別ディレクトリに新規プロジェクトとして立ち上げる想定。
