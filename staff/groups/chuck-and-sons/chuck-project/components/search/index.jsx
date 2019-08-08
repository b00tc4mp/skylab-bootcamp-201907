function Search(props){

    const {
        onSearch
    } = props

    return <>
        <form
            className = "form form__landing form--search"
            onSubmit = { event =>{
                event.preventDefault()

                const  { target : { query : { value : query } } } = event

                onSearch(query)
            }                
        }>
            
            <label htmlFor="query"></label>
                <input type="text" name="query" id ="query" />
            
            <button className="btn btn__submit">Search</button>

        </form>
    </>
}