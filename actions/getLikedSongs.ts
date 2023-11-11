import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Song } from '@/projectTypes';
import cookies from '@/cookiesTest';

const getCookies = () => cookies;

const getLikedSongs = async (userId: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: getCookies,
  });

  const { data } = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getLikedSongs;
