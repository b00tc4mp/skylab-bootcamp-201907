function RetrieveCategories(props) {
    const { arrayJokes, startSynth } = props

    return  <section className="results">
                <h2>Jokes</h2>
                {Object.values(arrayJokes.result).map(item => {
                    return  <article className="joke-container" key={`${item.id}`}>
                                <p className="joke">{item.value}</p>
                                <div className="div-container">
                                    <SynthButton initSynth={startSynth} joke={item.value} />
                                </div>
                            </article>
                })}
            </section>

}

function RetrieveRandom(props) {
    const { arrayRandom , startSynth } = props
    const joke = Object.values(arrayRandom.value)
    const jokeId = Object.values(arrayRandom.id)

    return <div>
        <article className="joke-container results" key={`${jokeId}`}>
            <h2>Your Random Chuck</h2>
                            
            <p className="joke">{joke}</p>
            <SynthButton initSynth={startSynth} joke = {joke} />
        </article>
    </div>
}


