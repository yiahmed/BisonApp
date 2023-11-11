import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';

import Sidebar from '@/components/Sidebar/Sidebar';
import SongLibrary from '@/components/Sidebar/SongLibrary';
import Header from '@/components/Main/Header';
import SearchInput from '@/components/Search/SearchInput';
import SearchContent from '@/components/Search/SearchContent';
import getSongs from '@/actions/getSongs';
import getSongsByUserId from '@/actions/getSongsByUserId';
import { useUser } from '@/hooks/useUser';

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

export const revalidate = 0;

function Search() {
  const { isLoading, user } = useUser(); // Include a loading state in useUser hook
  const { session: initialSession } = useSessionContext();
  const supabaseClient = useSupabaseClient();
  const [sessionData, setSessionData] = useState<UserSessionData | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [userSongs, setUserSongs] = useState<Song[]>([]);

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
            setUserSongs(userSongs);
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

  if (isLoading) {
    return <div className="text-white">Loading...</div>; // Show loading state while authentication state is being fetched
  }

  return (
    <div className="w-full h-screen bg-black">
      <Head>
        <title>Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-full">
        <div className="flex-col hidden h-full bg-black md:flex gap-y-2 w-[300px] p-2">
          {/* Sidebar and SongLibrary components */}
          <Sidebar userSongs={userSongs} />
          <SongLibrary songs={songs} />
        </div>
        <div className="w-full h-full mt-2 mb-4 overflow-hidden overflow-y-auto rounded-lg gap-y-2 bg-neutral-900">
          <div className="flex-1 h-full px-4 py-2 overflow-y-auto">
            <Header />
            <div className="flex flex-col mb-2 gap-y-6">
              <h1 className="text-3xl font-semibold text-white">Search</h1>
              <SearchInput />
            </div>
            {/* Include your SearchContent component here */}
            <SearchContent songs={songs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
