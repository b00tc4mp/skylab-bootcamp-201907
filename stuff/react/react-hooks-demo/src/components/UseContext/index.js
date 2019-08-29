import React from 'react';
//import RandomPriceCard from './component'  //Class Component version
import RandomPriceCard from './usecontext-hook'  //useContext-hook version

function UseContext() {
  return (
    <div class="card">
      <div class="card-content">
        <h1  class="titles">UseContext hook 🍷</h1>
        <RandomPriceCard />
      </div>
    </div>
  );
}

export default UseContext;
