import React from 'react';
import { useRouter } from 'next/router';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { Box } from '@chakra-ui/react';
import Link from 'next/link';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
}

const Sidebar: React.FC = () => {
  const router = useRouter();

  const sidebarItems: SidebarItem[] = [
    { label: 'Home', href: '/', active: router.pathname !== '/search', icon: <HiHome /> },
    { label: 'Search', href: '/search', active: router.pathname === '/search', icon: <BiSearch /> },
  ];

  return (
    <Box className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`)}>
      <div>
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index} className={router.pathname === item.href ? 'active' : ''}>
              <Link href={item.href}>
                <a
                  className={twMerge(
                    `flex h-auto gap-x-4 pl-4 cursor-pointer font-medium hover:text-white transition text-neutral-400 py-1`,
                    item.active && 'text-white'
                  )}
                >
                  {item.icon} {/* Render the icon */}
                  <p className="w-full truncate">{item.label}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};

export default Sidebar;
