import React, { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { Session } from '@supabase/supabase-js';

import Modal from './Modal';

import getSongs from '@/actions/getSongs';
import getSongsByUserId from '@/actions/getSongsByUserId';
import useAuthModal from '@/hooks/useAuthModal';

type UserSessionData =
  | {
      session: Session;
    }
  | {
      session: null;
    };

const AuthModal = () => {
  const { session: initialSession } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const [sessionData, setSessionData] = useState<UserSessionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (initialSession) {
        const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
        document.cookie = `my-access-token=${initialSession.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=${initialSession.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `my-user=${initialSession.user.id}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `initialSession=${JSON.stringify(
          initialSession
        )}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;

        router.replace(router.pathname);
        onClose();

        try {
          const allSongs = await getSongs();
          console.log('All Songs:', allSongs);

          const { data: userSessionData, error: sessionError } =
            await supabaseClient.auth.getSession();

          if (sessionError) {
            console.error('Error getting session data:', sessionError.message);

            return;
          }

          console.log('This is from the hook', userSessionData);
          setSessionData(userSessionData); // Store the session data in state

          if (userSessionData.session?.user.id) {
            const userSongs = await getSongsByUserId(userSessionData.session.user.id);
            console.log('User Songs:', userSongs);
          } else {
            console.error('User ID is undefined.');
          }
        } catch (error) {
          console.error('Error fetching songs:', error.message);
        }
      }
    };

    fetchData(); // Call the async function inside the useEffect
  }, [initialSession, onClose, supabaseClient]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome back"
      description="Login to your account."
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={['github']}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
        theme="dark"
      />
    </Modal>
  );
};

export default AuthModal;
