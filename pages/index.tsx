import React from 'react';
import Head from 'next/head';

import SongLibrary from '@/components/Sidebar/SongLibrary';
import Sidebar from '@/components/Sidebar/Sidebar';
import MainContent from '@/components/Main/MainContent';
import getSongs from '@/actions/getSongs';
import getSongsByUserId from '@/actions/getSongsByUserId';

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

function Home({ songs, userSongs }) {
  // console.log('songs', songs);
  // console.log('userSongs', userSongs);

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
      </div>
    </div>
  );
}

export default Home;
