import React, { useEffect } from 'react';

import SongItem from './SongItem';

import usePlayer from '@/hooks/usePlayer';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/projectTypes';

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
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

  return (
    <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {songs.map((item) => (
        <SongItem
          activeSongId={onPlay.activeId}
          key={item.id}
          data={item}
          onClick={(id: string) => onPlay(id)}
          setId={(id: string) => setId(id)}
        />
      ))}
    </div>
  );
};

export default PageContent;
