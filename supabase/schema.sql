-- =============================================
-- 不動産管理アプリ: propertiesテーブル定義
-- Supabaseのダッシュボード > SQL Editor で実行する
-- =============================================

-- 物件テーブルの作成
create table public.properties (
  id          uuid        default gen_random_uuid() primary key,
  user_id     uuid        references auth.users(id) on delete cascade not null,
  name        text        not null,
  rent        integer     not null check (rent > 0),
  area        text        not null,
  layout      text        not null,
  created_at  timestamptz default now() not null
);

-- テーブルのコメント
comment on table  public.properties          is '物件情報テーブル';
comment on column public.properties.user_id  is '登録ユーザーID（auth.usersと紐付け）';
comment on column public.properties.name     is '物件名';
comment on column public.properties.rent     is '月額家賃（円）';
comment on column public.properties.area     is 'エリア名';
comment on column public.properties.layout   is '間取り（例: 1LDK）';

-- =============================================
-- Row Level Security（RLS）設定
-- =============================================

-- RLSを有効化（デフォルトで全行非公開になる）
alter table public.properties enable row level security;

-- 自分が登録した物件のみ参照できるポリシー
create policy "自分の物件のみ参照可能"
  on public.properties for select
  using (auth.uid() = user_id);

-- user_idが自分のIDである行のみ登録できるポリシー
create policy "自分の物件として登録可能"
  on public.properties for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できるポリシー
create policy "自分の物件のみ更新可能"
  on public.properties for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できるポリシー
create policy "自分の物件のみ削除可能"
  on public.properties for delete
  using (auth.uid() = user_id);
