'use client';

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

import Modal from './Modal';

import useAuthModal from '@/hooks/useAuthModal';

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();
  const cookies = new Cookies();

  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      cookies.set('sessionData', session, { path: '/' });
      router.push(router.pathname);
      onClose();

      // Log cookies data
      const cookiesData = cookies.get('sessionData');
      console.log('Cookies data:', cookiesData);
    }
  }, [session, router, onClose]);

  console.log('session check', session);

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
