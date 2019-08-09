function Search(props) {
    return <>
        <div className='container container__background'>
            <h1>La versión fú de Spotify</h1>

        <form onSubmit={event => {
            event.preventDefault()

            const { target:
                { search:
                    { value: query }
                } } = event

            props.onSearch(query)
        }}>
            <label>
                <p className='container__title'>Busca tu canción favorita!</p>
                <input className='container__input' type="text" name="search" placeholder="Buscar una canción" />
            </label>
            <button className='container__button'>buscar</button>
        </form>
        </div>
    </>
}