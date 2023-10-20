import Link from 'next/link';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { Box } from '@chakra-ui/react';

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <Box className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`)}>
      <div>
        <ul>
          <li className={router.pathname === '/' ? 'active' : ''}>
            <Link href="/">
              <a className="text-white">Sidebar Navigation</a>
            </Link>
          </li>
        </ul>
      </div>
    </Box>
  );
};

export default Sidebar;
