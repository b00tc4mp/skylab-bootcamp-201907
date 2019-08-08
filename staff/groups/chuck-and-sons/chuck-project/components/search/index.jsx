function Search(props) {

    const { onSearch } = props

    return <>
        <form className="form form__search" onSubmit={event => {
            event.preventDefault()

            const { target: { query: { value: query } } } = event

            onSearch(query)
        }
        }>

            <label htmlFor="query">
                <input type="text" name="query" id="query" />
            </label>
            <button className="btn btn__submit">Search</button>

        </form>
    </>
}