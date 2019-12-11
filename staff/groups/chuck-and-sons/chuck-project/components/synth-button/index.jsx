function SynthButton(props) {
    const { initSynth , joke} = props
    return <>
        <button className="btn btn__synth" onClick={event => {
            event.preventDefault()
            initSynth(joke)
        }}>Synth</button>
    </>
}