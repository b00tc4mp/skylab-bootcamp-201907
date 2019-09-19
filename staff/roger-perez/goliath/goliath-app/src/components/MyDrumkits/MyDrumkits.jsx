import React from "react";

function Mydrumkits({ drumkits, onEditDrumkit }) {
  return (
    <ul>
      <h2>My drumkits</h2>
      {drumkits.map((drumkit, index) => (
        <li className="myDrumkitsList"
          key={index}
          onClick={() => {
            onEditDrumkit(drumkit);
          }}
        >
          {drumkit.name} >>
        </li>
      ))}
    </ul>
  );
}

export default Mydrumkits;
