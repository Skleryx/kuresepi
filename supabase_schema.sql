-- Create a table for public profiles if you want (optional, usually handled by Supabase Auth)
-- For this app, we just need a favorites table linked to auth.users

create table favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  recipe_id text not null, -- FatSecret ID
  recipe_name text not null,
  recipe_image text,
  recipe_calories text, -- Storing as text to be flexible (e.g. "300 kcal")
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table favorites enable row level security;

-- Policy: Users can only see their own favorites
create policy "Users can view their own favorites"
  on favorites for select
  using ( auth.uid() = user_id );

-- Policy: Users can insert their own favorites
create policy "Users can insert their own favorites"
  on favorites for insert
  with check ( auth.uid() = user_id );

-- Policy: Users can delete their own favorites
create policy "Users can delete their own favorites"
  on favorites for delete
  using ( auth.uid() = user_id );
