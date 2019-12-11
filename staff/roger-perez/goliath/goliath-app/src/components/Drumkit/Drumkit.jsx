import React, { useEffect, useState } from "react";
import Sequence from "../Sequence/Sequence";
import { initialSequences, audios, musicStyles } from "../../utils/defaults";

/*global Tone*/

function Drumkit({ user, drumkit, onBack, onUpdate, error }) {
  let index = 0;

  const [myUser, setMyUser] = useState(null);
  const [name, setName] = useState("Untitled");
  const [bpm, setBpm] = useState(90);
  const [styles, setStyles] = useState(musicStyles);
  const [style, setStyle] = useState(1);
  const [sequence, setSequence] = useState(initialSequences);
  const [beatId, setBeatId] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [drumkitId, setDrumkitId] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm || 120;
    setStyles(musicStyles);
    setMyUser(user);
    if (drumkit) {
      console.log("IN", drumkit);
      setDrumkitId(drumkit._id);
      setName(drumkit.name);
      setBpm(drumkit.bpm);
      setStyle(drumkit.sequences[0].instrument[0].style === "rock" ? 1 : 2);
      const seqs = drumkit.sequences.map(i => {
        if (i.instrument && i.instrument[0].audio) {
          return {
            ...i,
            instrument: i.instrument[0],
            sound: new Tone.Player(i.instrument[0].audio).toMaster()
          };
        } else {
          return { ...i, instrument: i.instrument[0] };
        }
      });
      setIsEdit(true);
      setSequence([...seqs]);
    } else {
      console.log("OUT");
      const seqs = initialSequences.map(i => {
        if (i.instrument.audio)
          return {
            ...i,
            sound: new Tone.Player(i.instrument.audio).toMaster()
          };
        else return i;
      });
      setSequence([...seqs]);
    }
  }, []);

  useEffect(() => {}, [user]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm || 120;
  }, [bpm]);

  const handleValues = (name, beats) => {
    const tins = sequence.find(i => i.instrument.name === name);
    tins.beats = beats;
    const seqs = sequence.map(i => {
      if (i.instrument.name !== name) {
        return i;
      } else {
        return tins;
      }
    });
    setSequence([...seqs]);
  };

  const changeSound = style => {
    console.log("CHANGE");
    const seqs = sequence.map(i => {
      if (i.instrument.audio) {
        const theAudio = audios[style].find(au => {
          if (au.name === i.instrument.name) return au.audio;
        });
        return {
          beats: i.beats,
          instrument: { ...i.instrument, audio: theAudio.audio, style },
          sound: new Tone.Player(theAudio.audio).toMaster()
        };
      } else {
        return i;
      }
    });
    console.log("seqs :", seqs);
    setIsEdit(true);
    setSequence([...seqs]);
  };

  const handleStyleChange = e => {
    setIsEdit(false);
    setStyle(e.target.value);
    var index = e.nativeEvent.target.selectedIndex;
    changeSound(e.nativeEvent.target[index].text);
  };

  const handleClearAll = () => {
    const seqs = initialSequences.map(e => {
      return { ...e, beats: null };
    });
    setIsEdit(!isEdit);
    setSequence([...seqs]);
  };

  const handleMute = () => {
    Tone.Master.mute = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (beatId) {
      Tone.Transport.clear(beatId);
    }
    const idd = Tone.Transport.scheduleRepeat(repeat, `8n`);
    setBeatId(idd);
    Tone.Transport.start();
  }, [sequence]);

  const repeat = () => {
    const step = index % 16;
    for (const i of sequence) {
      if (i.instrument.audio) {
        if (i.beats && i.beats[step]) {
          i.sound.start();
        }
      }
    }
    if (index >= 15) {
      index = 0;
    } else {
      index++;
    }
  };

  const handleSave = () => {
    const obj = {
      name,
      bpm,
      sequences: sequence.map(s => ({
        beats: s.beats,
        instrument: s.instrument
      }))
    };

    
    if (drumkitId) {
      const edited = user.drumkits.filter(dk => dk._id !== drumkitId);
      edited.push(obj);
      user.drumkits = [...edited];
    } else {
      user.drumkits.push(obj);
    }
    onUpdate(user);
  };

  return (
    <>
    
    <div className="drumkit">
      <h1>Drumkit</h1>
      <label>Name</label>
      <input className="drumkitInput"
        type="text"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
      ></input>
      <label>BPM</label>
      <input className="drumkitInput"
        type="text"
        name="bpm"
        value={bpm}
        onChange={e => setBpm(e.target.value)}
      ></input>
      <label>Style</label>
      <select className="selector" onChange={handleStyleChange} name="style" value={style}>
        {styles.map(style => (
          <option key={style.id} value={style.id}>
            {style.name}
          </option>
        ))}
      </select>

      <div className="kick">
        <h3>Sequence</h3>
        <button onClick={() => handleClearAll()}> Clear All</button>
        <button onClick={() => handleMute()}>
          {isMuted ? "Sound" : "Mute"}
        </button>
        <div>
          {sequence.map(i => (
            <Sequence
              key={i.instrument.name}
              bpm={bpm}
              sequence={isEdit}
              instrument={i.instrument}
              beats={i.beats}
              doValues={beats => handleValues(i.instrument.name, beats)}
            />
          ))}
        </div>
      </div>

      <div>
        <button onClick={() => handleSave()}>Save</button>
      </div>

      <a
        href=""
        onClick={event => {
          event.preventDefault();
          handleClearAll();
          setTimeout(() => onBack(), 200);
        }}
      >
        Go back
      </a>
    </div>
    
      
    </>
  );
}

export default Drumkit;
