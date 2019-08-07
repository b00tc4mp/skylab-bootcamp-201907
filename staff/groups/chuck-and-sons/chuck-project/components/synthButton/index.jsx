function SynthButton(props) {
    const { startStynth } = props
    return <>
        <button className="synth-bttn" onClick={event => {
            event.preventDefault()
            startStynth()
        }}>Synth</button>
    </>
}