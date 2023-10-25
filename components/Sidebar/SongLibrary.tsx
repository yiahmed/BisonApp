import Link from 'next/link';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { Box } from '@chakra-ui/react';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

const SongLibrary: React.FC = () => {
  const router = useRouter();

  const onClick = () => {
    // handle upload later
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
            size={20}
            className="transition cursor-pointer text-neutral-400 hover:text-white"
          />
        </div>
        <div className="flex flex-col px-3 mt-4 gap-y-2">List of Songs!</div>
      </div>
    </Box>
  );
};

export default SongLibrary;
