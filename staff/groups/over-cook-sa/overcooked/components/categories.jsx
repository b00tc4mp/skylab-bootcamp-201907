function Categories (props) {

    return <section className="cat_cont">
        <h3  className='catTitle catPasta'>Pasta</h3>
        <img className="cat-img" src="https://www.themealdb.com/images/category/pasta.png" alt="" onClick={event => {
          event.preventDefault()
          props.onSearchCat('pasta') 
        }}></img>

        <h3 className='catTitle'>Seafood</h3>
        <img className="cat-img" src="https://www.themealdb.com/images/category/seafood.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('seafood')    
        }}></img>

        <h3 className='catTitle'>Vegan</h3>
        <img className="cat-img catSlim" src="https://www.themealdb.com/images/category/vegan.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('vegan')    
        }}></img>

        <h3 className='catTitle'>Beef</h3>
        <img className="cat-img catSlim" src="https://www.themealdb.com/images/category/beef.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('beef')    
        }}></img>

        <h3 className='catTitle'>Chicken</h3>
        <img className="cat-img catSlim" src="https://www.themealdb.com/images/category/chicken.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('Chicken')    
        }}></img>

        <h3 className='catTitle'>Lamb</h3>
        <img className="cat-img catSlim" src="https://www.themealdb.com/images/category/lamb.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('lamb')    
        }}></img>

        <h3 className='catTitle'>Pork</h3>
        <img className="cat-img" src="https://www.themealdb.com/images/category/pork.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('pork')    
        }}></img>

        <h3 className='catTitle'>Misc</h3>
        <img className="cat-img" src="https://www.themealdb.com/images/category/miscellaneous.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('miscellaneous')    
        }}></img>

        <h3 className='catTitle'>Desserts</h3>
        <img className="cat-img catLast" src="https://www.themealdb.com/images/category/dessert.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('dessert')    
        }}></img>
      </section>
    
}