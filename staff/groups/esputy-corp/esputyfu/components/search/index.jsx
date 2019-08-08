function Search(props) {
    return <>
        <form onSubmit={event => {
            event.preventDefault()

            const { target:
                { search:
                    { value: query }
                } } = event

            props.onSearch(query)
        }}>
            <label>
                <p>Encuentra tus canciones favoritas:</p>
                <input type="text" name="search" placeholder="Buscar una canción" />
            </label>
            <button>buscar</button>
        </form>
    </>
}