import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { useCookies } from 'react-cookie'; // Import useCookies hook from react-cookie

import { Song } from '@/projectTypes';

const getCookies = () => {
  const [cookies] = useCookies(['sessionToken']); // Use useCookies hook to get the sessionToken cookie
  return cookies;
};

const getSongs = async (): Promise<Song[]> => {
  const cookies = getCookies();

  const supabase = createServerComponentClient({
    cookies: {
      sessionToken: cookies.sessionToken,
    },
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
