-- Create a table for public profiles
create table users (
  id uuid references auth.users not null primary key,
  email text unique,
  full_name text,
  description text,
  age integer,
  gender text,
  nickname text,
  avatar_url text,
  favorite_games text[],
  goals text[],
  level integer default 1,
  xp integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table users enable row level security;

create policy "Public profiles are viewable by everyone." on users
  for select using (true);

create policy "Users can insert their own profile." on users
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on users
  for update using (auth.uid() = id);

-- Create a storage bucket for avatars
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

-- Set up access policies for the avatars bucket
create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );

create policy "Anyone can update their own avatar."
  on storage.objects for update
  using ( auth.uid() = owner )
  with check ( bucket_id = 'avatars' );

-- Create a table for trainings
create table trainings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  game text not null,
  title text not null,
  description text,
  status text check (status in ('new', 'in_progress', 'completed')) default 'new',
  progress integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for trainings
alter table trainings enable row level security;

create policy "Users can view their own trainings." on trainings
  for select using (auth.uid() = user_id);

create policy "Users can insert their own trainings." on trainings
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own trainings." on trainings
  for update using (auth.uid() = user_id);

create policy "Users can delete their own trainings." on trainings
  for delete using (auth.uid() = user_id);

-- Add details column for wizard answers
alter table trainings add column details jsonb;
-- Create a table for analyses
create table analyses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  video_url text,
  video_title text,
  game text,
  analysis_result jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for analyses
alter table analyses enable row level security;

create policy "Users can view their own analyses." on analyses
  for select using (auth.uid() = user_id);

create policy "Users can insert their own analyses." on analyses
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own analyses." on analyses
  for delete using (auth.uid() = user_id);

-- Create a table for chat messages
create table chat_messages (
  id uuid default gen_random_uuid() primary key,
  analysis_id uuid references analyses(id) on delete cascade not null,
  sender text check (sender in ('user', 'ai')),
  content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for chat_messages
alter table chat_messages enable row level security;

create policy "Users can view messages for their analyses." on chat_messages
  for select using (
    exists (
      select 1 from analyses
      where analyses.id = chat_messages.analysis_id
      and analyses.user_id = auth.uid()
    )
  );

create policy "Users can insert messages for their analyses." on chat_messages
  for insert with check (
    exists (
      select 1 from analyses
      where analyses.id = chat_messages.analysis_id
      and analyses.user_id = auth.uid()
    )
  );

-- Create a storage bucket for videos
insert into storage.buckets (id, name, public)
values ('videos', 'videos', true);

-- Set up access policies for the videos bucket
create policy "Video objects are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'videos' );

create policy "Anyone can upload a video."
  on storage.objects for insert
  with check ( bucket_id = 'videos' );

create policy "Users can update their own videos."
  on storage.objects for update
  using ( auth.uid() = owner )
  with check ( bucket_id = 'videos' );
