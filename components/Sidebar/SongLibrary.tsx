'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { Box } from '@chakra-ui/react';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

import MediaItem from '../Main/MediaItem';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/projectTypes';

interface SongLibraryProps {
  songs: Song[];
}

const SongLibrary: React.FC<SongLibraryProps> = ({ songs }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const user = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    // TODO: Check for subscription
    return uploadModal.onOpen();
  };

  return (
    <Box className={twMerge(`bg-neutral-900 rounded-lg h-full overflow-y-auto w-full`)}>
      <div className="flex flex-col ">
        <div className="flex items-center justify-between px-5 pt-4">
          <div className="inline-flex items-center gap-x-2">
            <TbPlaylist className="text-neutral-500" size={26} />
            <p className="text-base font-medium text-neutral-400">Your Library</p>
          </div>
          <AiOutlinePlus
            onClick={onClick}
            size={20}
            className="transition cursor-pointer text-neutral-400 hover:text-white"
          />
        </div>
        <div className="flex flex-col px-3 mt-4 gap-y-2">
          {songs.map((item) => (
            <MediaItem onClick={() => {}} key={item.id} data={item} />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default SongLibrary;
