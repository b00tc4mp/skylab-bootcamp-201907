function Drumkit({ onBack, error }) {
    
    let index = 0

    const [ name, setName ] = React.useState('Untitled')
    const [ bpm, setBpm ] = React.useState(90)
    const [ styles, setStyles ] = React.useState([
        { id: 1, name: 'Rock' },
        { id: 2, name: 'Electro' },
    ])
    const [style, setStyle] = React.useState(1)
    const [sequence, setSequence] = React.useState([
        { beats: null, sound: null,  instrument: { name: 'Kick', style: null, audio: './tones/kick-acoustic01.wav' } },
        { beats: null, sound: null,  instrument: { name: 'Snare', style: null, audio: './tones/snare-acoustic01.wav'  }},
        { beats: null, sound: null,  instrument: { name: 'HiHat', style: null, audio: './tones/hihat-acoustic01.wav' }},
        { beats: null, sound: null,  instrument: { name: 'Crash', style: null, audio: './tones/crash-acoustic.wav' }},
        { beats: null, sound: null,  instrument: { name: 'Tom1', style: null, audio: './tones/tom-acoustic01.wav' }},
        { beats: null, sound: null,  instrument: { name: 'Tom2', style: null, audio: './tones/tom-acoustic02.wav' }}
    ])
    const [beatId, setBeatId] = React.useState(null)


    React.useEffect( () => {
        const seqs = sequence.map( i => {
            if (i.instrument.audio)
                return {...i, sound: new Tone.Player(i.instrument.audio).toMaster() }
            else 
                return i
        })
        setSequence([...seqs])
    }, [])

    React.useEffect( () => {
        Tone.Transport.bpm.value = bpm || 280
    }, [bpm])
    
    const handleValues = (name, beats) => {
        
        const tins = sequence.find( i => i.instrument.name === name )
        tins.beats = beats
        const seqs = sequence.map( i => {
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
       const seqs = sequence.map( e => {
           return {...e, beats: null}
       })
       setSequence([...seqs])

    }

    React.useEffect( () => {
        if (beatId) {
            Tone.Transport.clear(beatId)
        }
        const idd = Tone.Transport.scheduleRepeat( repeat, `8n`)
        setBeatId(idd)
        Tone.Transport.start();
    }, [sequence])
    
    const repeat = () => {
        const step = index % 16        
        for ( const i of sequence) {
            if (i.instrument.audio) {
                if ( i.beats && i.beats[step]) { 
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
             console.log('save :');
             const obj = {
                 name,
                 bpm,
                 sequence
             }

             const { id } = sessionStorage
             console.log('id :', id);

             console.log('drumkit :', obj);
        }


    return <>
        <h1>Drumkit</h1>
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={ e => setName( e.target.value )}></input>
        <label>BPM</label>
        <input type="text" name="bpm" value={bpm} onChange={ e => setBpm( e.target.value )}></input>
        <label>Style</label>
        <select onChange={handleStyleChange} name="style" value={style}>
            { styles.map( style => (<option key={style.id} value={style.id}>{style.name}</option>))}
        </select>


        <div className="kick">
            <h3>Sequence</h3>
            <button onClick={handleClearAll}> Clear All</button>
            <div>
            { sequence.map( i => (
                <Sequence key={i.instrument.name} bpm={bpm} instrument={i.instrument} beats={i.beats} doValues={ beats => handleValues(i.instrument.name, beats)}/>
            ))}
            </div>
        </div>

        <div>
            <button onClick={handleSave} >Save</button>
        </div>

        <a href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>

    </>
}