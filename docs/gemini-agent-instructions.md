# Geminiサブエージェント連携ガイド（キャラクター/BGMデザイン担当）

このファイルは、STELLAR HARRIERのキャラクター・障害物・BGMデザインを**Geminiに
サブエージェントとして作業してもらう**ための作業指示書です。人間（プロジェクト
オーナー）がGeminiに具体的な作業対象を別途指示する際、このファイルをあわせて
渡してください。

このプロジェクトはClaude Codeが実装・統合を担当していますが、**見た目
（3Dメッシュのデザイン）とBGMのデータそのものは、この指示書に従う形であれば
他のAIエージェントが直接編集してよい**領域です。

## 0. まず理解すること（プロジェクトの前提）

- ゲーム本体は `src/index.html` という単一ファイル（3万行超）にすべて
  収まっている。three.js（CDN、r160）+ Web Audio APIのみに依存する
  自己完結型ブラウザゲーム。**音楽・効果音は一切外部音声ファイルを使わず、
  すべてWeb Audio APIのオシレーター/ノイズ合成で鳴らしている。**
- **`assets/` ディレクトリは「編集用の複製」であり、gitignore対象で
  ゲームの動作には一切関係しない。**
  - `assets/characters/` には、`src/index.html` 内の各キャラクター/
    障害物のメッシュ生成関数（`build*Mesh`）を**1関数＝1ファイル**の形で
    複製したものが置かれている。
  - `assets/music/` には、`src/index.html` 内の `STELLAR_TRACK_DATA` 配列
    に含まれる全BGMトラックを**1曲＝1ファイル**の形で複製したものが
    置かれている。
  - `assets/sfx/` には、各効果音の再生関数（`play*Sound`）が複製されている。
- **Geminiが直接編集してよいのは `assets/characters/`・`assets/music/`・
  `assets/sfx/` 配下の `.js` ファイルのみ。** `src/index.html` を直接
  編集しないこと（統合はClaude Codeが行う）。
- 編集した `.js` ファイルは、そのままではゲームに反映されない。人間が
  Claude Codeに「このファイルの内容で `src/index.html` の
  該当箇所を更新して」と依頼することで初めて反映される
  （**自動同期の仕組みはない**）。

## 1. ディレクトリ構成

```
assets/
├── characters/
│   ├── player/       ← 自機（プレイヤーシップ）1体
│   ├── enemies/      ← エネミー（各ステージに登場する小型の敵、ボス以外）
│   ├── bosses/       ← 各ステージのボス
│   ├── obstacles/    ← 障害物（柱・岩・オブジェクト類）
│   └── environment/  ← ボス・敵・障害物以外の環境/背景演出
├── music/            ← BGMトラック定義（1曲＝1ファイル）
└── sfx/              ← 効果音の再生関数（1関数＝1ファイル）
```

キャラクター（エネミー・ボス）は `enemies/` または `bosses/`、生物ではない
静的なオブジェクト（像・柱・植物・建造物など）は `obstacles/` に入る。
どちらに分類されるか迷う場合は、そのオブジェクトが「動いて攻撃してくるか
（＝エネミー）」「その場に置かれた障害物か（＝obstacles）」で判断する。

## 2. 編集ルール（厳守）

### 2-1. メッシュ（`characters/`配下）を編集する場合

1. **関数名・引数の数・戻り値の型を変えないこと。**
   各ファイルは `function buildXxxMesh() { ... return group; }` という
   形の、引数なし・`THREE.Group`（または`THREE.Mesh`）を返す関数
   1つだけで構成されている。関数名を変えたり、引数を追加したり、
   複数の関数に分割したりしないこと（`src/index.html`側の呼び出し元と
   噛み合わなくなる）。
2. **`THREE`（three.jsのグローバルオブジェクト）以外の外部ライブラリ・
   import文を使わないこと。** CDN版の three.js r160 がグローバルに
   読み込まれている前提のコードなので、`import` や `require` は書けない。
3. **テクスチャ画像・外部アセットファイルは使わないこと。** すべて
   `THREE.XxxGeometry` + `THREE.MeshStandardMaterial` /
   `THREE.MeshBasicMaterial` などのプロシージャルな組み合わせで表現する
   （このゲームの全キャラクター・障害物が既にその方式で作られている）。
4. ファイル冒頭のコメント（`// buildXxxMesh` から始まる説明ブロック）は
   残すか、内容を更新してよい（このコメントは統合先の `src/index.html`
   側では削除されるため、コメントの有無自体は統合結果に影響しない）。
5. 色・形状・スケール・子要素の追加/削除は自由に行ってよい。ただし、
   全体のスケール感（後述「4. サイズ感の目安」）から極端に外れないこと。
6. 1ファイルで完結させること。他の `build*Mesh` 関数を呼び出す依存を
   新たに作らない（既存コードで例外的に依存があるファイルには、その旨が
   冒頭コメントに明記されているので、そのパターンには従ってよいが、
   新規に依存を増やさないこと）。

### 2-2. BGM（`music/`配下）を編集・新規作成する場合

1. **外部音声ファイル（MP3/WAV等）は一切使わないこと。** 全曲、
   Web Audio APIのオシレーター合成のみで作る。既存の23曲すべてが
   このデータ形式で書かれているので、まず近いジャンルの既存ファイル
   （例: `assets/music/ed_clear.js`）を開いて構造を真似ること。
2. 1曲は以下の形のJSオブジェクトで表現する（フィールド名・型は
   変えないこと。詳細は「5. ステージクリアBGMの新規実装」を参照）:
   ```js
   var track_XXX = {
     id: "xxx",              // 統合先を特定するキー。変更しないこと
     stage: "...",
     title: "...",
     genre: "...",
     timeSig: [4, 4],
     bars: 32,
     stepsPerBar: 4,
     desc: "...",
     ch1_type: "sawtooth",   // 各chのオシレーター波形
     ch2_type: "square",
     ch3_type: "triangle",
     ch4_type: "sine",
     percType: "none",       // "none" / "taiko" / "gong"
     ch1: ["D4", "-", ...],  // 音名配列。"-"は休符
     ch2: [...],
     ch3: [...],
     ch5: [...],             // ベースパート（ch4ではなくch5な点に注意）
   };
   ```
3. **音名は `"C4"` 形式（音名+オクターブ番号）。** シャープは `"C#4"`。
   休符は `"-"`。全chの配列長は揃えること（`bars * stepsPerBar`）。
4. **同時発声数について**: 既存の再生エンジンは1ステップごとに
   `ch1`(メロディ)・`ch2`(副メロディ/ハーモニー)・`ch3`(パッド/伸ばし音)・
   `ch5`(ベース)の4パート＋ドラム(kick/snare/hihat、`percType`に応じて
   taiko/gongも追加)を同時に鳴らす設計になっている。
   **依頼内容によっては、ここに新しいチャンネル（`ch4`をメロディ系に
   転用する、またはコーラス/オルガン等の新パートを追加する）を
   使う/増やす対応が必要になる場合がある。** その場合の実装方針は
   「5. ステージクリアBGMの新規実装」の該当項目を参照し、Claude Code側で
   再生エンジン（`stellarAudio.step`）の対応チャンネル数を拡張する。
   Geminiは**まずデータ（音名配列）を作ることに専念**し、エンジン側の
   対応要否はClaude Codeが判断する。
5. ファイル名・変数名は `track_<id>` の形式に揃えること（既存ファイルに倣う）。

## 3. 作業の受け渡しフロー

1. 人間（プロジェクトオーナー）が、Geminiに対して「どのキャラクター/
   障害物/BGMを、どんなコンセプトで触るか」を具体的に指示する。
2. Geminiは該当する `.js` ファイルを直接編集（または新規作成）する。
3. 編集が完了したら、そのファイルの内容を人間経由でClaude Codeに渡す
   （「このファイルの内容で `src/index.html` の `buildXxxMesh` を
   更新して」「この新規トラックを `STELLAR_TRACK_DATA` に追加して」等）。
4. Claude Codeが `src/index.html` 内の該当箇所を書き換え、
   `npm run verify`（型チェック・lint・整形・テスト・ビルド）と
   Playwrightによる実機確認を行ったうえで、コミット・GitHub Pagesへの
   デプロイまで完了させる。
5. 必要であれば、Claude Codeが `assets/` 側のファイルも最新の内容に
   再同期する。

**Geminiは`git commit`やビルド・デプロイを行わない。** あくまで
`.js`ファイルのデザイン・データを作り込むところまでが担当範囲。

## 4. サイズ感の目安（メッシュ）

このゲームのキャラクター/障害物は、だいたい以下のスケール感で統一されている
（自機の当たり判定半径が`0.6`、地面のグリッド1マスが概ね2〜3ユニット程度）。

- 小型のエネミー（グラント・シューター等）: 半径0.5〜1.0程度
- 中型のエネミー・ボス級の障害物: 半径1.0〜2.0程度
- 一部の巨大ボス（Scaler、Cerberus等）: 個別に`*_VISUAL_SCALE`定数で
  スケールされるため例外
- 障害物（柱・像・生垣など）: 高さ2〜5ユニット程度が一般的。地面から
  天井（ステージによっては天井演出がある）までの間に収まる高さを意識する

迷ったら、同じ`obstacles/`または`enemies/`ディレクトリ内の既存ファイル
（特に近いコンセプトのもの）を開き、`new THREE.XxxGeometry(引数, ...)`の
数値を参考にすること。

## 5. 依頼1: ステージクリアBGMの新規実装

### 現状の課題

現在「ステージクリア」の演出音は、`assets/sfx/playStageClearSound.js`
（`src/index.html`側は`playStageClearSound()`関数）という**単発の
効果音（SE）**として実装されている。上昇フレーズ→和音のワンショットで、
BGMのようにループ/展開する音楽ではない。

これを、ユーザー提示の参考音源
（<https://youtu.be/W2_EvIrARew>）のようなステージクリアジングル/
BGMとして、**`assets/music/`配下の新規BGMトラック**に作り直したい。

### やること

1. `assets/music/`配下に新規ファイル `stage_clear.js` を作成する
   （`id: "stage_clear"`）。参考音源の雰囲気（テンポ感・展開）を汲み取り、
   「2-2. BGMを編集・新規作成する場合」のデータ形式に従って作曲する。
   長さの目安は他の短尺トラック（`ed_clear.js`は32小節）より短めでよい。
   ステージクリア時の数秒〜十数秒程度のジングルとして機能する長さ
   （8〜16小節程度）を想定。
2. **8ch同時発声を前提に作ること。** 既存の再生エンジンは
   ch1/ch2/ch3/ch5(+ドラム)の4パート構成だが、今回は「8chの同時発声」を
   想定した豪華な編成にしたいという要望がある。具体的には以下の
   8パート構成でデータを作ってほしい:
   - `ch1`: メインメロディ
   - `ch2`: 副メロディ/対旋律
   - `ch3`: パッド/伸ばし和音
   - `ch4`: 追加の合いの手/装飾フレーズ（現状未使用チャンネル）
   - `ch5`: ベースライン
   - `ch6`: 新設。ハーモニー/コーラス的な補強パート
   - `ch7`: 新設。ベルやアルペジオ等のアクセントパート
   - `ch8`: 新設。オルガン/ブラス等の厚みパート
   - 加えてドラム（`percType`で`kick`/`snare`/`hihat`等を鳴らす既存の仕組み）
     `ch6`〜`ch8`は現在の再生エンジンには存在しないフィールドなので、
     **Geminiはデータとして`ch6`/`ch7`/`ch8`を用意し、対応する
     `ch6_type`/`ch7_type`/`ch8_type`（オシレーター波形）も指定すること。**
     実際にこれらを鳴らすための再生エンジン拡張（`stellarAudio.step`関数の
     対応）はClaude Code側で行うので、Geminiは意識しなくてよい。
3. 曲の起動・停止のタイミング（ゲーム側のどのイベントで再生するか）は
   Claude Codeが`src/index.html`側で対応する。Geminiは音楽データの作成に
   専念すること。
4. 参考音源はあくまで雰囲気・テンポ感の参考であり、既存曲を模倣した
   著作権侵害にならないよう、オリジナルの旋律・和声で作曲すること
   （このプロジェクトの全BGMが同様の方針でオリジナル作曲されている）。

## 6. 依頼2〜5: 各ステージのキャラクター/障害物デザイン

現状、以下のステージの敵キャラクター・障害物・背景演出は初期実装のままの
プレースホルダー的なデザインになっており、他ステージ（VOID GARDEN等）と
比べて作り込みが浅い。世界観に合わせた本格的なデザインへ刷新したい。

### 依頼2: ステージ5 YOZAKURA（和風妖怪モチーフ）

コンセプト: 逢魔が時の宵闇。富士のシルエットと桜吹雪に映える、
ピンク〜オレンジ〜紫の黄昏グラデーション（`docs/stages/05-yozakura.md`参照）。

- **敵キャラクター**（`assets/characters/enemies/`）:
  - `buildPrincessMesh.js`（姫、`kind: "princess"`）
  - `buildYoshitsuneMesh.js`（義経、`kind: "yoshitsune"`）
  - `buildFrogMesh.js`（河童、`kind: "frog"`）
  - `buildBiwaHoshiMesh.js`（琵琶法師、`kind: "biwa_hoshi"`）
- **障害物**（`assets/characters/obstacles/`）:
  - `buildSotobaMesh.js`（卒塔婆）
  - `buildGravestoneMesh.js`（墓石）
  - `buildBambooMesh.js`（竹林）
  - `buildStoneLanternMesh.js`（石灯籠、ステージ2から移設済みの意匠）
- **背景演出**（`assets/characters/environment/`、和風ステージ専用）:
  - `buildMtFujiMesh.js`（富士山シルエット）
  - `buildPetalField.js`（桜吹雪パーティクル）

動きの仕様（HP・スコア・移動パターン）は`docs/enemies/*.md`に確定済み。
**見た目のみを刷新し、動き自体は変更しないこと。**

### 依頼3: ステージ7 SWEETHEART GROVE（妖精・キャンディモチーフ）

コンセプト: パステルな花畑ステージ。明るいピンク〜黄〜紫のキャンディカラー
（`docs/stages/07-sweetheart-grove.md`参照）。

- **敵キャラクター**（`assets/characters/enemies/`）:
  - `buildFairyMesh.js`（フェアリー、`kind: "fairy"`）
  - `buildPixieMesh.js`（ピクシー、`kind: "pixie"`）
  - `buildCupidMesh.js`（キューピッド、`kind: "cupid"`）
  - `buildImpMesh.js`（インプ、`kind: "imp"`）
- **障害物**（`assets/characters/obstacles/`）:
  - `buildHeartPillarMesh.js`（ハート型の柱）
  - `buildLollipopMesh.js`（キャンディ/ロリポップ）
  - `buildFlowerArchMesh.js`（花のアーチ）
  - `buildMushroomMesh.js`（巨大マッシュルーム）

動きの仕様は`docs/enemies/fairy.md`・`pixie.md`・`cupid.md`・`imp.md`に
確定済み。**見た目のみを刷新し、動き自体は変更しないこと。**

### 依頼4: ステージ1 FANTASY ZONE（障害物の一部: 虹のアーチ）

コンセプト: 爽快なブルー基調の導入ステージ（`docs/stages/01-fantasy-zone.md`
参照）。障害物のうち、以下の1点のみが対象:

- `assets/characters/obstacles/buildRainbowArchMesh.js`（虹のアーチ）

他の障害物（`buildPillarMesh.js`・`buildCrystalShardMesh.js`・
`buildFloatingIslandMesh.js`）は対象外。

### 依頼5: オービター（`kind: "dom"`）のデザイン刷新

対象: `assets/characters/enemies/buildDomEnemyMesh.js`

特定ステージ専用ではなく、`domEnabled: true`のステージ（3: FROZEN NEBULA、
4: CRYSTAL CANYON、6: INFERNO CORE、8: RUINS OF THE ANCIENTS、
10: ABYSS ZERO）に共通で登場する汎用エネミー（詳細は
`docs/enemies/dom.md`参照）。特定ステージのテーマ色に寄せすぎず、
どのステージに置かれても違和感のない、無機質・機械的なドーム型の
デザインを基本線とする。

- HP2（全エネミー中唯一の2HP）・スコア400（全エネミー中最高）という
  「硬いターゲット」の設定に見合った、他のエネミーより頑丈そうな
  見た目にするとよい。
- 唯一実際のマズル位置（`userData.muzzle`）から発射する仕様がある。
  現状の実装は、腕状のバズーカを表す`THREE.Mesh`（変数名`bazooka`）を
  `group.userData.muzzle = bazooka;`という形で、`return group;`の直前に
  指定している。**新デザインでも、発射口となる部品のメッシュ/グループを
  1つ選び、必ず`group.userData.muzzle = <その部品>;`を残すこと。**
  これが無いと発射位置がグループ原点にフォールバックしてしまう。
- 動きの仕様（HP・スコア・移動・発射間隔）は`docs/enemies/dom.md`に
  確定済み。**見た目のみを刷新し、動き自体は変更しないこと。**

## 7. 動作確認・フィードバックについて

Geminiは実機（ブラウザ）でのビジュアル確認・音声確認ができないため、
コード上の妥当性（メッシュ関数が正しく`THREE.Group`を返すか、BGMデータの
配列長が揃っているか等）まで含めて仕上げること。実際の見た目・音の最終確認・
微調整はClaude Code側がPlaywrightおよび実機再生で行う。

見た目・曲想の意図を正しく伝えるために、対象ファイルの冒頭コメントに
簡潔な意図メモ（ポーズ・質感・色合い、または曲の展開・参考にした雰囲気）を
残しておくと、統合作業がスムーズになる。
