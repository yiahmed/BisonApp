'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/projectTypes';
import usePlayer from '@/hooks/usePlayer';

interface MediaItemProps {
  data: Song;
  onClick: (id: string) => void;
  setId: (id: string) => void;
  activeSongId: string;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick, activeSongId }) => {
  const { setId } = usePlayer();
  const imageUrl = useLoadImage(data);
  console.log('Data song', data);
  // const encodedUrl = encodeURIComponent(imageUrl);
  console.log('Imgae url test', imageUrl);

  const handleClick = () => {
    console.log('Clicked on SongItem:', data);
    setId(data.id); // Call setId with the clicked song's ID
    onClick(data.id);
  };

  useEffect(() => {
    if (activeSongId) {
      setId(activeSongId); // Set the active song ID
    }
  }, [activeSongId, setId]);
  // console.log('image url', imageUrl);

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          handleClick();
        }
      }}
      role="button" // Add role="button" for accessibility
      tabIndex={0} // Add tabIndex={0} to make it focusable
      className="flex items-center w-full p-2 rounded-md cursor-pointer gap-x-3 hover:bg-neutral-800/50"
    >
      <div
        className="
          relative
          rounded-md
          min-h-[48px]
          min-w-[48px]
          overflow-hidden
        "
      >
        <Image
          layout="fill"
          src={imageUrl || '/images/liked.png'}
          alt="MediaItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col overflow-hidden gap-y-1">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-sm truncate text-neutral-400">By {data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
