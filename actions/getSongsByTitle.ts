import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Cookies from 'universal-cookie';

import getSongs from './getSongs';

import { Song } from '@/projectTypes';

const cookies = new Cookies();

const getCookies = () => cookies;

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: getCookies,
  });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongsByTitle;
