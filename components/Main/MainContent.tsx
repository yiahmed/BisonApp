import React from 'react';

import Header from './Header';

type Props = {};

const MainContent = (props: Props) => {
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header />
    </div>
  );
};

export default MainContent;
