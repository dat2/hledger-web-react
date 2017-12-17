// @flow

// 3rd-party imports

import React from 'react';

import Accounts from '../Accounts';
import LineChart from '../LineChart';

const HomePage = () => {
  return (
    <div className="h-100 overflow-hidden flex flex-nowrap items-stretch">
      <div className="w-third pa2 overflow-y-scroll">
        <Accounts.Container />
      </div>
      <div className="w-two-thirds pa2">
        <LineChart.Container />
      </div>
    </div>
  );
};

export default HomePage;
