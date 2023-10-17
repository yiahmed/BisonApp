import React from 'react';
import Head from 'next/head';
import { Heading, Center } from '@chakra-ui/react';

function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center>
        <Heading size="lg" color="red.500">
          Practice Bison App
        </Heading>
      </Center>
      <div className="bg-red-500">Example Text</div>
    </>
  );
}

export default Home;
