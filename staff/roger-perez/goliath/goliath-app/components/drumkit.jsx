const initailSequences = [
    { beats: null, sound: null, instrument: { name: 'Kick', style: 'rock', audio: './tones/kick-acoustic01.wav' } },
    { beats: null, sound: null, instrument: { name: 'Snare', style: 'rock', audio: './tones/snare-acoustic01.wav' } },
    { beats: null, sound: null, instrument: { name: 'HiHat', style: 'rock', audio: './tones/hihat-acoustic01.wav' } },
    { beats: null, sound: null, instrument: { name: 'Crash', style: 'rock', audio: './tones/crash-acoustic.wav' } },
    { beats: null, sound: null, instrument: { name: 'Tom1', style: 'rock', audio: './tones/tom-acoustic01.wav' } },
    { beats: null, sound: null, instrument: { name: 'Tom2', style: 'rock', audio: './tones/tom-acoustic02.wav' } }
]


function Drumkit({ user, drumkit, onBack, onUpdate, error }) {

    let index = 0

    const [myUser, setMyUser] = React.useState(null)
    const [name, setName] = React.useState('Untitled')
    const [bpm, setBpm] = React.useState(90)
    const [styles, setStyles] = React.useState([
        { id: 1, name: 'Rock' },
        { id: 2, name: 'Electro' },
    ])
    const [style, setStyle] = React.useState(1)
    const [sequence, setSequence] = React.useState(initailSequences)
    const [beatId, setBeatId] = React.useState(null)


    React.useEffect(() => {
        Tone.Transport.bpm.value = bpm || 120
        setMyUser(user)
        if (drumkit) {
            console.log('IN')
            setName(drumkit.name)
            setBpm(drumkit.bpm)
            const seqs = drumkit.sequences.map(i => {
                if (i.instrument && i.instrument[0].audio) {
                    return { ...i, instrument: i.instrument[0], sound: new Tone.Player(i.instrument[0].audio).toMaster() }
                }
                else {
                    return {...i, instrument: i.instrument[0]}
                }
            })
            setSequence([...seqs])
        } else {
            console.log('OUT')
            const seqs = initailSequences.map(i => {
                if (i.instrument.audio)
                    return { ...i, sound: new Tone.Player(i.instrument.audio).toMaster() }
                else
                    return i
            })
            setSequence([...seqs])    
        }
    }, [])

    React.useEffect(() => {
    }, [user])

    React.useEffect(() => {
        Tone.Transport.bpm.value = bpm || 120
    }, [bpm])

    const handleValues = (name, beats) => {

        const tins = sequence.find(i => i.instrument.name === name)
        tins.beats = beats
        const seqs = sequence.map(i => {
            if (i.instrument.name !== name) {
                return i
            } else {
                return tins
            }
        })
        setSequence([...seqs])

    }

    const handleStyleChange = e => {
        setStyle(e.target.value)
    }

    const handleClearAll = () => {
        const seqs = initailSequences.map(e => {
            return { ...e, beats: null }
        })
        setSequence([...seqs])

    }

    React.useEffect(() => {
        if (beatId) {
            Tone.Transport.clear(beatId)
        }
        const idd = Tone.Transport.scheduleRepeat(repeat, `8n`)
        setBeatId(idd)
        Tone.Transport.start();
    }, [sequence])

    const repeat = () => {
        const step = index % 16
        for (const i of sequence) {
            if (i.instrument.audio) {
                if (i.beats && i.beats[step]) {
                    i.sound.start();
                }
            }
        }
        if (index >= 15) {
            index = 0
        } else {
            index++
        }
    }
    
    const handleSave = () => {
        console.log('myUser :', user);

        const obj = {
            name,
            bpm,
            sequences: sequence.map( s => ({ beats: s.beats, instrument: s.instrument }))
        }

        const { id, token } = sessionStorage
        user.drumkits.push(obj)
        onUpdate(user)

    }

    return <>
        <h1>Drumkit</h1>
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}></input>
        <label>BPM</label>
        <input type="text" name="bpm" value={bpm} onChange={e => setBpm(e.target.value)}></input>
        <label>Style</label>
        <select onChange={handleStyleChange} name="style" value={style}>
            {styles.map(style => (<option key={style.id} value={style.id}>{style.name}</option>))}
        </select>

        <div className="kick">
            <h3>Sequence</h3>
            <button onClick={() => handleClearAll()}> Clear All</button>
            <div>
                {sequence.map(i => (
                    <Sequence 
                        key={i.instrument.name} 
                        bpm={bpm} 
                        instrument={i.instrument} 
                        beats={i.beats} 
                        doValues={beats => handleValues(i.instrument.name, beats)} 
                    />
                ))}
            </div>
        </div>

        <div>
            <button onClick={() => handleSave()} >Save</button>
        </div>

        <a href="" onClick={event => {
            event.preventDefault()
            handleClearAll()
            setTimeout( () => onBack(), 200)
        }}>Go back</a>

    </>
}