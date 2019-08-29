import React from 'react';
import Login from './usestate-hook' //useState hook version
//import Login from './component'  //Class Component version

function UseState() {
  return (
    <div class="card">
      <div class="card-content">
        <h1 class="titles">UseState hook 📧</h1>
        <Login />
      </div>
    </div>
  );
}

export default UseState;
