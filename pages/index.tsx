import React from 'react';
import Head from 'next/head';

import SongLibrary from '@/components/Sidebar/SongLibrary';
import Sidebar from '@/components/Sidebar/Sidebar';

// import Sidebar from '@/components/Sidebar/Sidebar';

function Home() {
  return (
    <div className="w-full h-screen bg-black  ">
      <div className="h-full">
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex h-full ">
          <div className="flex-col hidden h-full bg-black md:flex gap-y-2 w-[300px] p-2">
            <Sidebar />
            <SongLibrary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
