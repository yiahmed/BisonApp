import Image from 'next/image';
import { useEffect } from 'react';

import PlayButton from './PlayButton';

import usePlayer from '@/hooks/usePlayer';
import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/projectTypes';

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
  setId: (id: string) => void; // Add setId prop
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick, setId, activeSongId }) => {
  const imagePath = useLoadImage(data);

  const handleItemClick = () => {
    console.log('Clicked on SongItem:', data);
    setId(data.id); // Call setId with the clicked song's ID
    onClick(data.id);
  };

  useEffect(() => {
    if (activeSongId) {
      setId(activeSongId); // Set the active song ID
    }
  }, [activeSongId, setId]);

  return (
    <div
      onClick={handleItemClick}
      className="relative flex flex-col items-center justify-center p-3 overflow-hidden transition rounded-md cursor-pointer group gap-x-4 bg-neutral-400/5 hover:bg-neutral-400/10"
    >
      <div className="relative w-full h-full overflow-hidden rounded-md aspect-square">
        <Image
          className="object-cover"
          src={imagePath || '/Users/yahya/Desktop/Bison App Echobind/MyApp/public/images/liked.png'}
          layout="fill"
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="w-full font-semibold text-white truncate">{data.title}</p>
        <p className="w-full pb-4 text-sm truncate text-neutral-400">By {data.author}</p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
