function RetrieveCategories({ arrayJokes, startSynth, onToggle , error }) {

    return <section className="results">
         <h2>Your Jokes</h2> 
        {!arrayJokes.length && <Feedback className = "feedback feedback--error" message = { "no results for this query" }/> }
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

    const joke = Object.values(arrayRandom.value)
    const jokeId = Object.values(arrayRandom.id)


    return <div>
        <article className="joke-container results" key={`${jokeId}`}>
            <h2>Your Random Chuck</h2>

            <p className="joke">{arrayRandom.value}</p>
            <SynthButton initSynth={startSynth} joke={joke} />
        </article>
    </div>
}




