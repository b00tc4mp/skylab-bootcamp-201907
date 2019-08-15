function Search({onSearch, error, category,country, onWeather}){
    let value1=category,value2=country
    return <>
    <section className="search">
        <h1 className='search__title hide'>SkyNews</h1>
        <img className="nav-logo" src="style/img/skynews-logo.png"></img> 
        <h3 className="search__title">Search</h3>
    <form onSubmit={event=>{
        event.preventDefault()
        onSearch(value1,value2)
        onWeather(value2)
    }}>
        
     <select className="select" onChange={event=>{
        event.preventDefault()
        value1=event.target.value
        
     }}>
        <option>Select a category</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="general">General</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
    </select>
    <select className="select" onChange={event=>{
        event.preventDefault()
        value2=event.target.value
     }}>
        <option>Select a country</option>
        <option value="fr">France</option>
        <option value="gb">Great Britain</option>
        <option value="de">Germany</option>
        <option value="us">US</option>
       
        
    </select>
            <button className="button">Search News</button>
        </form>
    </section>
   </>
}