'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

import MediaItem from '../Main/MediaItem';
import LikeButton from '../Search/LikeButton';

import { Song } from '@/projectTypes';
import { useUser } from '@/hooks/useUser';
import useOnPlay from '@/hooks/useOnPlay';
import usePlayer from '@/hooks/usePlayer';

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const onPlay = useOnPlay(songs);
  const { setId, setIds } = usePlayer();

  useEffect(() => {
    if (songs.length > 0) {
      const songIds = songs.map((song) => song.id);
      setIds(songIds); // Set the array of song IDs
    } else {
      console.warn('User has no songs.');
    }
  }, [songs, setIds]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col w-full px-6 gap-y-2 text-neutral-400">No liked songs.</div>
    );
  }

  return (
    <div className="flex flex-col w-full p-6 gap-y-2">
      {songs.map((song: any) => (
        <div key={song.id} className="flex items-center w-full gap-x-4">
          <div className="flex-1">
            <MediaItem onClick={(id) => onPlay(id)} data={song} setId={setId} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
