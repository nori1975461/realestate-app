# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

Supabase認証機能付きの不動産管理Webアプリ。React + Vite で構成し、メール・パスワード認証でログインした後に物件一覧を表示する。

## コマンド

```bash
npm run dev      # 開発サーバー起動（http://localhost:5173）
npm run build    # プロダクションビルド
npm run lint     # ESLintによる静的解析
npm run preview  # ビルド成果物のプレビュー
```

## アーキテクチャ

### 認証フロー

- `src/contexts/AuthContext.jsx` が認証状態のシングルソース。`useAuth()` フックで全コンポーネントから参照する。
- Supabase の `onAuthStateChange` でセッション変化をリアルタイム監視し、`user` ステートに反映する。
- `src/components/ProtectedRoute.jsx` が未ログインユーザーを `/login` にリダイレクトする。認証確認中は `loading` フラグでローディング表示を行い、チラつきを防ぐ。

### ルーティング

`src/App.jsx` に集約。`/` → `/login` リダイレクト、`/login`、`/register`、`/properties`（保護ルート）の4ルート。

### 環境変数

`.env` ファイルに `VITE_SUPABASE_URL` と `VITE_SUPABASE_ANON_KEY` を定義し、`src/supabaseClient.js` で `createClient()` に渡す。`.env` は `.gitignore` で除外済み。

### スタイリング

CSS Modules（`.module.css`）を採用。認証フォーム共通スタイルは `src/pages/Auth.module.css` に集約し、`Login.jsx` と `Register.jsx` が共有する。

## Git運用ルール

**コードを変更するたびに、必ずGitHubにプッシュすること。**

```bash
git add <変更ファイル>
git commit -m "変更内容の説明"
git push origin main
```

- 1コミット＝1つの論理的な変更単位にする（複数の無関係な変更をまとめない）
- コミットメッセージは命令形で具体的に書く（例：「物件一覧にソート機能を追加」）
- `.env` は絶対にコミットしない（`.gitignore` で除外済み）
