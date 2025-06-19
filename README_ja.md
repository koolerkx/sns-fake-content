[English](README.md) | 日本語

# SNSにおける偽情報のデータ解析

モダンな NLP とクラウドネイティブ設計を用いて、SNS 上の誤情報を検出・解析するエンドツーエンドシステムの概要をまとめています。

---

## クイックビュー

| レイヤー          | 主な技術スタック                                                 |
| ----------------- | ---------------------------------------------------------------- |
| **フロントエンド** | React（TypeScript）、Ant Design、Chrome Extension API            |
| **バックエンド**   | 推論: FastAPI（Python）、REST API: Express（Node + TS）          |
| **データベース**   | MongoDB Atlas（NoSQL）                                           |
| **クラウド**       | AWS EC2 / ECS / ECR、SageMaker、S3、GitHub Pages                 |

---

## プロジェクトの特長

* **複数モデル実装** — 伝統的 ML、RNN、Transformers（BERT / XLNet）で検出手法を比較
* **Chrome 拡張機能** — ブラウザ内ワンクリックで信頼性をチェック
* **Web ダッシュボード** — 即時検証＋豊富なデータセット分析
* **フルコンテナ化 & クラウドデプロイ** — AWS 上でスケール可能かつコスト最適なアーキテクチャ

> **注:** 一部の実験では過学習が確認されたため、絶対的な精度値の記載は省いています。

---

## アーキテクチャ概要

```text
GitHub Pages (UI) ──► Browser │ Chrome Ext
                         │
                         ▼
             Express API (Node)  ◄─► MongoDB Atlas
                         │
                         ▼
                FastAPI Model Server
                         │
                         ▼
                 AWS SageMaker (BERT / XLNet)
```
## デプロイメント図

### スタンドアロン構成

<p align="center">
  <img src="https://github.com/user-attachments/assets/a5b21765-da2a-4d4e-bd2b-e0cf3569902e" width="800">
</p>

### クラウド構成

現在オフライン
<p align="center">
  <img src="https://github.com/user-attachments/assets/785594cd-dbbc-418a-9367-f7c749b4f0b6" width="800">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/9c7598a9-3f9f-401a-bccf-fca83176e75f" width="800">
</p>

## Transformer モデルフロー

<p align="center">
  <img src="https://github.com/user-attachments/assets/d4c52528-aabc-4678-85a9-e7bd6b59da31" width="800">
</p>

---

### デモ動画（プレースホルダー）

[YouTube](https://youtu.be/hDCRd132Nxo)

https://github.com/user-attachments/assets/711df831-1f29-4d1e-8f67-4b315f3c20a2


---

## プロジェクトメンバー

* **[Kooler Fan](https://github.com/koolerkx)**（プロジェクトオーナー）— バックエンド開発、モデル学習、フロントエンドコンポーネント、プロジェクト管理 & コードレビュー
* **[JohnDoeAntler](https://github.com/koolerkx/sns-fake-content/commits?author=JohnDoeAntler)**（特別感謝）— Web 開発コンポーネントの一部を担当