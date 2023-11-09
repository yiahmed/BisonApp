import React from 'react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { Button } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCookies } from 'react-cookie'; // Import useCookies from react-cookie

import SignUpButton from './SignUpButton';
import LoginButton from './LoginButton';

import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';

const Header = () => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user, isLoading } = useUser();
  const [cookies, setCookie, removeCookie] = useCookies(['sessionToken']); // Initialize sessionToken cookie

  const handleLogout = async () => {
    // Sign out the user from Supabase
    const { error } = await supabaseClient.auth.signOut();
    router.replace(router.pathname);

    // Clear the sessionToken cookie upon logout
    removeCookie('sessionToken'); // Use removeCookie from react-cookie to remove the cookie

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }

    // Log a message to the console after removing the cookie
    console.log('SessionToken cookie removed:', cookies.sessionToken);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
                w="100%"
                px={6}
                py={2}
                fontWeight="bold"
                color="black"
                transition="background-color 0.2s, opacity 0.2s"
                bg="white"
                borderWidth="1px"
                borderColor="transparent"
                borderRadius="full"
                _disabled={{ cursor: 'not-allowed', opacity: '0.5' }}
                _hover={{ opacity: '0.75' }}
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
    </>
  );
};

export default Header;
