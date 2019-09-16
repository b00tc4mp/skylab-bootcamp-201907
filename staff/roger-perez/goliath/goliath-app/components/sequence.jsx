
function Sequence({ beats, instrument, doValues, error }) {
    
    const [thebeats, setTheBeats] = React.useState(null)
        
    React.useEffect( () => {
        if (beats) {
            setTheBeats(beats)
        } else {
            setTheBeats([ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ])
        }
    }, [beats])

    React.useEffect( () => {
        doValues(thebeats)
    }, [thebeats])
    
    const handleBeatChange = (e, i) => {
        const val = e.target.checked
        const tseq = [...thebeats]
        tseq[i] = val
        setTheBeats(tseq)
    }

    const handleClear = () => {
        setTheBeats([ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ])
    }

    return <>

        <div className="kick">
            <label>{instrument.name}</label>
            { thebeats && thebeats.map( (s, index) => (
                <input key={index} checked={s} type='checkbox' onChange={ (event) =>handleBeatChange(event, index)} />
            ))} 
            <button onClick={handleClear} >Clear</button>
        </div>


    </>
}