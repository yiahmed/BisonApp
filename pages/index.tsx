import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';

import SongLibrary from '@/components/Sidebar/SongLibrary';
import Sidebar from '@/components/Sidebar/Sidebar';
import MainContent from '@/components/Main/MainContent';
import getSongs from '@/actions/getSongs';
import getSongsByUserId from '@/actions/getSongsByUserId';
import getLikedSongs from '@/actions/getLikedSongs';
import Player from '@/components/Player/Player';
import useSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer';

type UserSessionData =
  | {
      session: Session;
    }
  | {
      session: null;
    };

type Song = {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
};

function Home({}) {
  const { session: initialSession } = useSessionContext();
  const supabaseClient = useSupabaseClient();
  const [sessionData, setSessionData] = useState<UserSessionData | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [userSongs, setUserSongs] = useState<Song[]>([]);
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const { setId } = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      if (initialSession) {
        const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
        document.cookie = `my-access-token=${initialSession.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=${initialSession.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `my-user=${initialSession.user.id}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `initialSession=${JSON.stringify(
          initialSession
        )}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;

        try {
          const allSongs = await getSongs();
          setSongs(allSongs);

          const { data: userSessionData, error: sessionError } =
            await supabaseClient.auth.getSession();

          if (sessionError) {
            console.error('Error getting session data:', sessionError.message);

            return;
          }

          console.log('This is from the hook', userSessionData);
          setSessionData(userSessionData); // Store the session data in state

          if (userSessionData.session?.user.id) {
            const userSongs = await getSongsByUserId(userSessionData.session.user.id);
            const likedSongs = await getLikedSongs(userSessionData.session.user.id);
            setUserSongs(userSongs);
            setLikedSongs(likedSongs);
            console.log('User Songs:', userSongs);
          } else {
            console.error('User ID is undefined.');
          }
        } catch (error) {
          console.error('Error fetching songs:', error.message);
        }
      }
    };

    fetchData(); // Call the async function inside the useEffect
  }, [initialSession, supabaseClient]);

  return (
    <div className="w-full h-screen bg-black">
      <div className="flex h-full">
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex-col hidden h-full bg-black md:flex gap-y-2 w-[300px] p-2">
          <Sidebar userSongs={userSongs} />
          <SongLibrary songs={songs} />
        </div>
        <main className="flex-1 h-full py-2 overflow-y-auto">
          <MainContent songs={songs} />
        </main>
        {/* <Player /> */}
      </div>
    </div>
  );
}

export default Home;
