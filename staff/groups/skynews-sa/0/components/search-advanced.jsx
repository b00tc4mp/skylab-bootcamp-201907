function SearchAdv({onSearch, onBack}){
    return <>
    <section className="search">
        <h1 className='search__title hide'>SkyNews</h1>
        <img className="nav-logo" src="style/img/skynews-logo.png"></img> 
        <h3 className="search__title">Search</h3>
    <form className="form-section" onSubmit={event=>{
        event.preventDefault()
        const {target:{query:{value:query}}}=event
        onSearch(query)
    }}>
        <input type="text" name="query" placeholder="search"/>
            <button className="button art-but">Search News</button>
        </form>
        {onBack && <ul className="art-ul"><li className="art-li"><a className="art-but" href="" onClick={event=>{
        event.preventDefault()
        onBack()
        }}>Go Home</a></li></ul>}
    </section>
    </>
}