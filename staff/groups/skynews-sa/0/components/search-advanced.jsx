function SearchAdv({onSearch, onBack}){
    return <>
    <section className="search">
        <h1 className='search-title hide'>SkyNews</h1>
        <img className="nav-logo" src="style/img/skynews-logo.png"></img> 
        <h3 className="search-title">Search Advanced</h3>
    <form onSubmit={event=>{
        event.preventDefault()
        const {target:{query:{value:query}}}=event
        onSearch(query)
    }}>
        <input type="text" name="query" placeholder="search"/>
            <button className="search-button">Search News</button>
        </form>
        {onBack && <a className="back-link art-but" href="" onClick={event=>{
        event.preventDefault()
        onBack()
        }}>Go Home</a>}
    </section>
    </>
}