import React from 'react';

import Header from './Header';

type Props = {};

const MainContent = (props: Props) => {
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header />
      <div className="px-6 mt-2 mb-7">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-semibold text-white">Newest songs</h1>
        </div>
        <div className="text-white">List of Songs!</div>
      </div>
    </div>
  );
};

export default MainContent;
