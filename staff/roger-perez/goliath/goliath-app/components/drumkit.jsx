function Drumkit({ onChange,onBack, error }) {
    



    return <>
        <h1>Drumkit</h1>
        <label>BPM</label>
        <input type="text" id='tempo'></input>

        <div className="kick">
            <label>Kick</label>
            <input id='1' type='checkbox' onClick={event => {
                event.preventDefault()
                
                onChange()

            }} />
              <label>Kick</label>
            <input id='1' type='checkbox' onClick={event => {
                event.preventDefault()
                
                onChange()

            }} />


        </div>

        <a href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>

    </>
}