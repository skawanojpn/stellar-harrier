# STELLAR HARRIER

three.js製の擬似3Dシューティングゲーム。オールドスクールなアーケードシューターへのオマージュとして、独自のステージ・ボス・演出でオリジナル制作している。

## プレイ

GitHub Pages でホストしている静的サイト。ブラウザで `dist/index.html`（デプロイ後は Pages の URL）を開くだけで遊べる。

- 移動: 矢印キー / WASD / テンキー / マウスドラッグ
- ショット: スペースキー / マウスクリック

## 開発

```bash
npm install
npm run verify   # typecheck + lint + format:check + test + build
```

- `src/index.html` — ゲーム本体（three.js + Web Audio API、GASや外部バックエンドに依存しない自己完結HTML）
- `src/game/*.ts` — 純粋ロジック（衝突判定・スコア・敵出現パターン等）の参考実装。`tests/` で Vitest によりテスト
- `build.mjs` — `src/index.html` を `dist/index.html` としてコピーするだけのシンプルなビルド

`src/index.html` 内のゲームロジックは vanilla JS で書かれており、`src/game/*.ts` の同名ロジックとは実装が重複している（テストは `src/game/*.ts` 側のみを検証）。

## デプロイ

`main` ブランチへの push で GitHub Actions (`.github/workflows/deploy.yml`) が `npm run verify` を実行し、成功すれば GitHub Pages へ自動デプロイする。
