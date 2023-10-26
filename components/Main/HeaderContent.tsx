import React from 'react';

import ListItem from './ListItem';

type Props = {};

const HeaderContent = (props: Props) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-white">Welcome Back</h1>
      <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <ListItem image="/images/liked.png" name="Liked Songs" href="/liked" />
      </div>
    </div>
  );
};

export default HeaderContent;
