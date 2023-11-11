# Spotify Clone

This project is a Spotify clone built using the Full Stack Jamstack Bison app by Echobind.

## Technologies Used

- Next.js 12
- React
- TypeScript
- Tailwind CSS
- Chakra UI
- Supabase

## Getting Started

To run the project locally, follow these steps:

### Setup .env File

Before running the project, you'll need to set up your `.env` file with the required environment variables. Copy the provided example below and fill in the appropriate values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

Setting Up Supabase
To use the Spotify Clone, you'll need to set up a Supabase project to store songs, users, and liked songs. Follow these steps to configure your Supabase project:

Create a Supabase Project:

Create a new Supabase project at Supabase Dashboard.
Generate and save your Supabase project password securely.
Create Tables:

Create the following tables in your Supabase project using the SQL editor:
Songs Table:

CREATE TABLE songs (
id SERIAL PRIMARY KEY,
created_at TIMESTAMPTZ DEFAULT now(),
title TEXT,
song_path TEXT,
image_path TEXT,
author TEXT,
user_id UUID REFERENCES users(id)
);

Liked Songs Table:

CREATE TABLE liked_songs (
user_id UUID REFERENCES users(id),
song_id INT8 REFERENCES songs(id),
created_at TIMESTAMPTZ DEFAULT now()
);

Users Table:

CREATE TABLE users (
id UUID PRIMARY KEY,
full_name TEXT,
avatar_url TEXT,
billing_address JSONB,
payment_method JSONB
);
Create Buckets in Storage:

Navigate to the "Storage" tab in your Supabase project.
Create two public buckets named "songs" and "images." These will be used to store uploaded songs and images.

Set Up Table Policies:

Go to the "Auth" tab in your Supabase project.
Configure table policies as follows:
Liked Songs Table:

RLS enabled
Disable RLS for DELETE, Enable delete for users based on user_id
INSERT: Enable insert for authenticated users only
SELECT: Enable read access for all users
Songs Table:

RLS enabled
Disable RLS for INSERT, Enable insert for authenticated users only
SELECT: Enable read access for all users
Users Table:

RLS enabled
Disable RLS for UPDATE, Can update own user data.
SELECT: Can view own user data.
Note:

When using the upload modal, ensure only MP3 files are accepted for songs.
Now your Supabase project is set up and ready to be connected to the Spotify Clone!

Migrate your database, generate typings, and start the dev server:

yarn setup:dev

This will prep and migrate your local database, generate the Prisma client, Nexus typings, and GraphQL typings. If this fails, make sure you have Postgres running and the generated DATABASE_URL values are correct in your .env files. For more information about code generation, view the FAQ.

Run the development server:

yarn dev

Now you can start developing your Spotify Clone locally!
