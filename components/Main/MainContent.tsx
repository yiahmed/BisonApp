import React from 'react';
import { twMerge } from 'tailwind-merge';

import HeaderContent from './HeaderContent';
import Header from './Header';
import PageContent from './PageContent';

const MainContent = ({ songs }) => {
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`)}>
        <Header />
        <HeaderContent />
      </div>
      <div className="px-6 mt-2 mb-7">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-semibold text-white">Newest songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
};

export default MainContent;
