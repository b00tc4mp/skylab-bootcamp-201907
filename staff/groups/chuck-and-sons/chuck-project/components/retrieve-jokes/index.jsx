function RetrieveCategories({ arrayJokes, startSynth, onToggle, error }) {

    return <section className="results">
        <h2>Your Jokes</h2>
        {arrayJokes.total === 0 && <Feedback className="feedback feedback--error" message={'no valid query'} />}
        {arrayJokes.result.map(item => {
            return <article className="joke-container" key={`${item.id}`}>
                <p className="joke">{item.value}</p>
                <div className="div-container">
                    <SynthButton initSynth={startSynth} joke={item.value} />
                    <FavButton active={item.favorite} onToggle={onToggle} id={(item.id)} />
                </div>
            </article>
        })}
    </section>
}

function RetrieveRandom({ arrayRandom, startSynth }) {

    const joke = arrayRandom.value
    const jokeId = arrayRandom.id

    return <section className="results">
        <h2>Your Random Chuck</h2>
        <article className="joke-container results" key={`${jokeId}`}>
            <p className="joke">{arrayRandom.value}</p>
            <div className="div-container">
                <SynthButton initSynth={startSynth} joke={joke} />
            </div>
        </article>
    </section>

}




