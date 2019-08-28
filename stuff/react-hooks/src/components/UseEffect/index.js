import React from 'react';
import CocktailbyName from './useeffect-hook' //useState hook version
//import CocktailbyName from './component'  //Class Component version

function UseEffect() {
  return (
    <div class="card">
      <div class="card-content">
        <h1  class="titles">UseEffect hook 🍹</h1>
        <CocktailbyName />
      </div>
    </div>
  );
}

export default UseEffect;
