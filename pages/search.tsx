import React from 'react';
import Head from 'next/head';

import Sidebar from '@/components/Sidebar/Sidebar';
import SongLibrary from '@/components/Sidebar/SongLibrary';
import Header from '@/components/Main/Header';
import SearchInput from '@/components/Search/SearchInput';
import SearchContent from '@/components/Search/SearchContent';
import getSongs from '@/actions/getSongs';
import getSongsByUserId from '@/actions/getSongsByUserId';
import { useUser } from '@/hooks/useUser';

export const getServerSideProps = async () => {
  // Fetch songs data asynchronously
  const songs = await getSongs();
  const userSongs = await getSongsByUserId();

  // Pass songs as props to the component
  return {
    props: {
      songs,
      userSongs,
    },
  };
};

function Search({ songs, userSongs }) {
  const { isLoading, user } = useUser(); // Include a loading state in useUser hook

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
