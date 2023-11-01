'use client';
import { useRouter } from 'next/router';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Button } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

import SignUpButton from './SignUpButton';
import LoginButton from './LoginButton';
import HeaderContent from './HeaderContent';

import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';

const Header = () => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.replace(router.pathname);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }
  };

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`)}>
      <div className="flex items-center justify-between w-full mb-4">
        <div className="items-center hidden md:flex gap-x-2">
          <button
            onClick={() => router.back()}
            className="items-center justify-center transition bg-black rounded-full -flex hover:opacity-75"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.push()}
            className="items-center justify-center transition bg-black rounded-full -flex hover:opacity-75"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex items-center md:hidden gap-x-2">
          <button className="flex items-center justify-center p-2 transition bg-white rounded-full hover:opacity-75">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="flex items-center justify-center p-2 transition bg-white rounded-full hover:opacity-75">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button
                w="100%" // Width
                px={6} // Padding X-axis
                py={2} // Padding Y-axis
                fontWeight="bold" // Font weight
                color="black" // Text color
                transition="background-color 0.2s, opacity 0.2s" // Transition properties
                bg="white" // Background color
                borderWidth="1px" // Border width
                borderColor="transparent" // Border color
                borderRadius="full" // Rounded corners
                _disabled={{ cursor: 'not-allowed', opacity: '0.5' }} // Disabled state styles
                _hover={{ opacity: '0.75' }} // Hover state styles
                onClick={handleLogout}
              >
                Logout
              </Button>
              <button onClick={() => router.push('/account')}>
                <div className="flex items-center justify-center p-4 bg-white rounded-full drop-shadow-md right-5 hover:scale-110">
                  <FaUserAlt />
                </div>
              </button>
            </div>
          ) : (
            <>
              <div>
                <SignUpButton />
              </div>
              <div>
                <LoginButton />
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <HeaderContent />
      </div>
    </div>
  );
};

export default Header;
