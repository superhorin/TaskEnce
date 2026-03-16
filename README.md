# タスク管理Webアプリ

## 📝 プロジェクト概要
Webアプリケーションのフロントエンドおよびバックエンド開発の学習を目的とし、様々なモジュールを組み合わせたフルスタックなタスク管理アプリケーションです。個人やチームでのタスク管理に加え、円滑なコミュニケーションを促進するチャット機能を備えています。

## ✨ 主な機能
- 個人、およびチームごとのタスク管理
- ユーザー間のチャット機能
- ※その他、順次機能を追加予定

## 🛠 使用技術
- **フロントエンド:** React
- **バックエンド:** Nest.js
- **データベース:** PostgreSQL
- **インフラ:** 未実装（ローカルのDocker環境を利用）

## 🚀 インストール手順
まずは、リポジトリをローカル環境にクローンします。
```
bash
git clone git@github.com:superhorin/TaskEnce.git
cd TaskEnce
```

## 💻 使い方・実行方法
アプリケーションを起動するには、フロントエンドとバックエンドそれぞれのサーバーを立ち上げる必要があります。
※事前にNode.jsおよびDockerがインストールされていることを確認してください。
### バックエンドの起動
データベース（PostgreSQL）のコンテナを立ち上げ、Nest.jsサーバーを起動します。
```
Bash
cd backend
(mise trust)
npm install
cp .env.example .env
```
.envに任意の変数を入力
```
docker-compose up -d
npm run start:dev
```

### フロントエンドの起動
別のターミナルを開き、Reactの開発サーバーを起動します。
```
Bash
cd frontend
(mise trust)
npm install
npm run dev
```

起動後、コンソールに表示されるローカルURL（例: http://localhost:5173 など）にブラウザからアクセスして利用を開始してください。
