import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

import getLikedSongs from '@/actions/getLikedSongs';
import Sidebar from '@/components/Sidebar/Sidebar';
import SongLibrary from '@/components/Sidebar/SongLibrary';
import Header from '@/components/Main/Header';
import getSongs from '@/actions/getSongs';
import getSongsByUserId from '@/actions/getSongsByUserId';
import { useUser } from '@/hooks/useUser';
import LikedContent from '@/components/Liked/LikedContent';

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

function Liked() {
  const { isLoading, user } = useUser(); // Include a loading state in useUser hook
  const { session: initialSession } = useSessionContext();
  const supabaseClient = useSupabaseClient();
  const [sessionData, setSessionData] = useState<UserSessionData | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [userSongs, setUserSongs] = useState<Song[]>([]);
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);

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

  if (isLoading) {
    return <div className="text-white">Loading...</div>; // Show loading state while authentication state is being fetched
  }

  return (
    <div className="w-full h-screen bg-black">
      <Head>
        <title>Liked</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-full">
        <div className="flex-col hidden h-full bg-black md:flex gap-y-2 w-[300px] p-2">
          {/* Sidebar and SongLibrary components */}
          <Sidebar userSongs={userSongs} />
          <SongLibrary songs={songs} />
        </div>
        <div className="w-full h-full mt-2 mb-4 overflow-hidden overflow-y-auto rounded-lg gap-y-2 bg-neutral-900">
          <div
            className={twMerge(
              `h-2/5 sm:h-1/5 md:h-1/5 lg:h-2/5 bg-gradient-to-b from-emerald-800 p-6 mb-4`
            )}
          >
            <Header />
            <div className="flex mt-8">
              <div className="relative w-32 h-32 lg:h-44 lg:w-44">
                <Image
                  className="object-cover"
                  layout="fill"
                  src="/images/liked.png"
                  alt="Playlist"
                />
              </div>
              <div className="flex flex-col pt-8 ml-4 text-white gap-y-2 md:mt-0">
                <p className="hidden text-sm font-semibold md:block">Playlist</p>
                <h1 className="text-4xl font-bold sm:text-5xl lg:text-7xl">Liked Songs</h1>
              </div>
            </div>
          </div>

          <LikedContent songs={likedSongs} />
        </div>
      </div>
    </div>
  );
}

export default Liked;
