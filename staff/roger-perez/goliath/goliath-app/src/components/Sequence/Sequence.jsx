import React, { useEffect, useState } from "react";
import { resetBeats } from "../../utils/defaults";
function Sequence({ sequence, beats, instrument, doValues, error }) {
  const [thebeats, setTheBeats] = useState(null);

  useEffect(() => {
    console.log("beats :", beats);
    if (beats) {
      setTheBeats(beats);
    } else {
      setTheBeats(resetBeats);
    }
  }, [sequence]);

  useEffect(() => {
    doValues(thebeats);
  }, [thebeats]);

  const handleBeatChange = (e, i) => {
    const val = e.target.checked;
    const tseq = [...thebeats];
    tseq[i] = val;
    setTheBeats(tseq);
  };

  const handleClear = () => {
    setTheBeats(resetBeats);
  };

  return (
    <>
    <div className="sequenceContainer">
      <div className="sequence">
        <label>{instrument.name}</label>
        {thebeats &&
          thebeats.map((s, index) => (
            <input className="checkbox"
              key={index}
              checked={s}
              type="checkbox"
              id="1"
              onChange={event => handleBeatChange(event, index)}
            />
            
          ))}
        <button className="clear" onClick={handleClear}>Clear</button>
      </div>
    </div>
      
    </>
  );
}

export default Sequence;
