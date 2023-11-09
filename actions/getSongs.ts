import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import cookies from '@/cookiesTest';
import { Song } from '@/projectTypes';

const getCookies = () => cookies;

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: getCookies,
  });

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongs;
