import { useState, useEffect, createContext, useContext } from 'react';
import { useUser as useSupaUser, useSessionContext, User } from '@supabase/auth-helpers-react';

import { UserDetails, Subscription } from '@/projectTypes';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
  setSupaUser: React.Dispatch<React.SetStateAction<User | null>>; // Updated: Add setUser to the context
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
  const user = useSupaUser(); // Updated: Get the user using useSupaUser

  const [supaUser, setSupaUser] = useState(user); // Initialize user state with supaUser
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from('users').select('*').single();

  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();

  useEffect(() => {
    if (supaUser && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];

        if (userDetailsPromise.status === 'fulfilled')
          setUserDetails(userDetailsPromise.value.data as UserDetails);

        if (subscriptionPromise.status === 'fulfilled')
          setSubscription(subscriptionPromise.value.data as Subscription);

        setIsloadingData(false);
      });
    } else if (!supaUser && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value: UserContextType = {
    accessToken: session?.access_token ?? null,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
    setSupaUser, // Updated: Provide setUser in the context value
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }

  return context;
};
