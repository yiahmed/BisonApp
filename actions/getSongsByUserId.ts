import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Song } from '@/projectTypes';
import cookies from '@/cookiesTest';

const getCookies = () => cookies;

const getSongsByUserId = async (userId: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: getCookies,
  });

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);

    return [];
  }

  return (data as any) || [];
};

export default getSongsByUserId;
