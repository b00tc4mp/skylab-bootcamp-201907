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
                <input className='container__input' type="text" name="search" placeholder="Buscar una canción" />
            </label>
            <button className='container__button'>buscar</button>
        </form>
    </>
}