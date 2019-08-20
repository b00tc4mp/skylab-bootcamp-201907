 /**
 * Search input for the query.
 */

 function Search(props) {
    return <form className={`search__form`} onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query } } } = event

        props.onSearch(query)
    }}>
        <label className={`search__label`} htmlFor="query">Search</label>
        <input className={`search__input`} type="text" name="query" id="query" placeholder="What makes you laugh?"/>
        <button className={`search__button`}><i className="fas fa-search"></i></button>
    </form>
}