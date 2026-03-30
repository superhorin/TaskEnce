# タスク管理Webアプリ

## 📝 プロジェクト概要
Webアプリケーションのフロントエンドおよびバックエンド開発の学習を目的とし、様々なモジュールを組み合わせたフルスタックなタスク管理アプリケーションです。個人やチームでのタスク管理に加え、円滑なコミュニケーションを促進するチャット機能を備えています。

## ✨ 主な機能
- 個人、およびチームごとのタスク管理
- ユーザー間のチャット機能
- ※その他、順次機能を追加予定

## 画面遷移図
- [画面遷移図](docs/ScreenTransitionDiagram.md)
- [ER図](docs/ERD.md)

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
mise trust
npm install
cp .env.local .env
```
.envに任意の変数を入力
```
docker-compose up -d
npm run dev #初回起動（db:sync && start:dev）
npm run start:dev #２回目以降
```

### 🗄 データベースマイグレーションのルール
本プロジェクトでは Prisma を使用しています。テーブルスキーマに変更を加える際は、以下の手順を厳守してください。
- prisma/schema.prisma を編集する。
- npm run db:sync を実行してマイグレーションファイルを生成する。これにより、DBへの反映と prisma/migrations フォルダ内へのSQLファイル生成が行われます。
- 生成されたマイグレーションファイルを必ず含めて Git にコミットする。
  - スキーマ変更後にマイグレーションファイルを生成（commit）せずにプッシュすると、他の開発者の環境でエラーが発生します。必ず db:sync を実行してからコミットしてください。

### フロントエンドの起動
別のターミナルを開き、Reactの開発サーバーを起動します。
```
Bash
cd frontend
mise trust
npm install
npm run dev
```

起動後、コンソールに表示されるローカルURL（例: http://localhost:5173 など）にブラウザからアクセスして利用を開始してください。
