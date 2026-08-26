# Geminiサブエージェントデザイン改修・引継ぎ連絡書

Claude Code （実装・統合担当）への作業依頼連絡書です。
Geminiサブエージェントが作成・改修した `assets/characters/` 配下の以下の 5 つの `.js` ファイルの内容を、`src/index.html` 内の同名 `build*Mesh` 関数へ統合してください。

---

## 📁 変更・更新ファイルと統合対象一覧

| #   | 編集ファイル (`assets/`)                               | 統合先関数 (`src/index.html`)      | カテゴリ              |
| --- | ------------------------------------------------------ | ---------------------------------- | --------------------- |
| 1   | `assets/characters/enemies/buildMarbleStatueMesh.js`   | `function buildMarbleStatueMesh()` | エネミー（Stage 2）   |
| 2   | `assets/characters/obstacles/buildTopiaryMesh.js`      | `function buildTopiaryMesh()`      | 障害物（Stage 2）     |
| 3   | `assets/characters/obstacles/buildFountainMesh.js`     | `function buildFountainMesh()`     | 障害物（Stage 2）     |
| 4   | `assets/characters/obstacles/buildWitheredTreeMesh.js` | `function buildWitheredTreeMesh()` | 障害物（Stage 2）     |
| 5   | `assets/characters/bosses/buildTomosBossMesh.js`       | `function buildTomosBossMesh()`    | ボス（Stage 2 TOMOS） |

---

## 🎨 各3Dメッシュの改修内容・デザイン仕様

### 1. 大理石像エネミー (`buildMarbleStatueMesh.js`)

- **コンセプト**: 西洋庭園 VOID GARDEN に漂う浮遊型の大理石彫像エネミー。
- **デザイン詳細**:
  - 土台を完全に撤去し、つま先を伸ばしたエレガントな浮遊姿勢（コントラポスト）。
  - ダビデ像風の胸筋・腹筋・縮れ毛・たすき掛けのドレープ布。
  - 頭上および足元に浮かぶ二重の神聖な金の浮遊リング（Orbital Rings）のSFアクセント。

### 2. 古代ローマ風パーゴラ障害物 (`buildTopiaryMesh.js`)

- **コンセプト**: 蔓（ツタ）の絡みついた古代ローマ風大理石パーゴラ（柱廊）。
- **デザイン詳細**:
  - 2本の大理石ローマ円柱（エンタシス、縦溝、柱頭）＋金のモールディング梁＋パーゴラ格子。
  - 柱に螺旋状に巻きつき、梁の上を覆い尽くして下に垂れ下がる青々としたアイビー（蔓・ツタの葉）。

### 3. 2段式古代大理石噴水 (`buildFountainMesh.js`)

- **コンセプト**: 西洋庭園 VOID GARDEN のシンボルとなる豪華な2段式噴水。
- **デザイン詳細**:
  - 八角台座付き大水盤＋刻印彫刻柱＋上段小水盤＋金オーブ噴出口。
  - 澄んだプール水面と波紋リング。最上部からのメイン水柱と飛び散る水滴。
  - 上段から下段へ全周360度に溢れ落ちる透明度の高い滝カーテン（Waterfall Curtain）と着水泡リング。

### 4. 古代オリーブ＆糸杉風樹木 (`buildWitheredTreeMesh.js`)

- **コンセプト**: VOID GARDEN の歴史を物語る地中海・西洋の古典樹木。
- **デザイン詳細**:
  - 地中海オリーブ特有のねじれ・曲がり・瘤（こぶ）と力強い根張りを持つ古木肌の幹。
  - 西洋糸杉（サイプレス）特有の、天へすらりと伸びる炎状シルエットの銀緑色（セージグリーン）樹冠。
  - 幹に施された金の帯リングと覗く枯れ枝。

### 5. 宇宙植物トモス Boss (`buildTomosBossMesh.js`)

- **コンセプト**: 巨大宇宙植物ボスの重厚感と躍動感の強化。
- **デザイン詳細**:
  - **茎のレイアウトと形状**: 花びらより向こう側（奥: -Z方向）に配置。地面（下部）に向かって大きく太くどっしりと拡大させた重厚な根張り構造（Root Flare）。
  - **トゲ鞭蔓 (Tendrils)**: 3本から**6本**に増量。セグメント数を 10 から **18** へ増やし長さを約2倍に延伸。
  - **アニメーション (`updateLoop`)**: 花弁が破壊・脱落した後も、時間 `time` に応じて6本の長大なツタの先端まで波打ち生き物のように常にうねうねと動くダイナミックモーションを定義。

---

## 🤖 Claude Code への依頼メッセージ例

Claude Code に以下の文面を渡すことで、スムーズに統合・検証が実行されます：

```text
Geminiサブエージェントが作成した以下の5つのファイルの内容で、src/index.html 内の該当する build*Mesh 関数を更新し、npm run verify で型チェック・ビルド検証を行ってください。

1. assets/characters/enemies/buildMarbleStatueMesh.js -> src/index.html の buildMarbleStatueMesh
2. assets/characters/obstacles/buildTopiaryMesh.js -> src/index.html の buildTopiaryMesh
3. assets/characters/obstacles/buildFountainMesh.js -> src/index.html の buildFountainMesh
4. assets/characters/obstacles/buildWitheredTreeMesh.js -> src/index.html の buildWitheredTreeMesh
5. assets/characters/bosses/buildTomosBossMesh.js -> src/index.html の buildTomosBossMesh

詳細は docs/gemini-handover.md を参照してください。
```
