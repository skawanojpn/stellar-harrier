# ボス撃破演出仕様書

各ボスが撃破された瞬間の「退場演出（視覚）」と「断末魔SE（聴覚）」を、
実装から独立したドキュメントとしてここに記録する。

## 運用ルール

- **この仕様書が正**。演出を変更したいときは、まずこのファイル群を編集してから
  「この内容で実装して」と依頼する運用にする（`docs/boss-behaviors/`と同じ運用）。
- 演出は`src/index.html`の`BOSS_DEFEAT_EFFECT_BY_TYPE`（視覚）・`BOSS_DEATH_SOUND_BY_TYPE`（SE）
  という2つのディスパッチテーブルで`bossType`ごとに振り分けられる。
- 断末魔SEの実体（Web Audio API合成コード）は`assets/sfx/boss_deaths/`配下で個別編集できる
  （このドキュメントとは別ファイル。詳細は`assets/sfx/boss_deaths/README.md`参照）。
- 各演出の「総演出時間」は、撃破後にステージクリア判定を保留する時間
  （`BOSS_DEFEAT_PAUSE_SECONDS_BY_TYPE`）と直結している。演出の長さを変える場合は、
  このドキュメントの秒数と実装側の定数を必ず両方更新すること。

## ファイル一覧

| ファイル                         | bossType      | ボス名        | 演出分類    | SE分類 |
| -------------------------------- | ------------- | ------------- | ----------- | ------ |
| [scaler.md](scaler.md)           | `scaler`      | SCALER        | 爆発        | 機械   |
| [tomos.md](tomos.md)             | `tomos`       | TOMOS         | 弾ける/散る | 生物   |
| [godani.md](godani.md)           | `godani`      | GODANI        | 砕け散る    | 生物   |
| [sarpedon.md](sarpedon.md)       | `sarpedon`    | ASSAULT TRIAD | 爆発        | 機械   |
| [sumo.md](sumo.md)               | `sumo`        | ONIMARU       | 地に崩れる  | 生物   |
| [cerberus.md](cerberus.md)       | `cerberus`    | CERBERUS      | 爆発        | 生物   |
| [fairy_queen.md](fairy_queen.md) | `fairy_queen` | QUEEN TITANIA | 消える      | 生物   |
| [barbarian.md](barbarian.md)     | `barbarian`   | MOAI          | 砕け散る    | 機械   |
| [final.md](final.md)             | `final`       | ABYSS ZERO    | 爆発(多段)  | 機械   |

ステージ9（HALL OF LEGENDS）のボスラッシュは、上記8体をそのまま流用するため個別ファイルは作らない。

## 共通仕様

- どの演出も、ボス本体のメッシュ自体はアニメーションさせず、撃破と同時に即座に`scene`から
  除去する。演出は新規に生成するパーティクル（`spawnParticleBurst`）のみで表現する
  （実装をシンプルに保ち、ボス本体のマテリアル状態やライフサイクルを気にせず
  `updateExplosions(dt)`だけで一括管理できるようにするため）。
- パーティクルは既存の`explosions`配列を再利用しており、任意で`gravity`（重力加速度、負の値で
  浮上）を指定できる。
