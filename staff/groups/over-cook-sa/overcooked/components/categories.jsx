function Categories (props) {

    return <section className="main__categories">
        <h3  className='main__categories'>Pasta</h3>
        <img className="main__categories" src="https://www.themealdb.com/images/category/pasta.png" alt="" onClick={event => {
          event.preventDefault()
          props.onSearchCat('pasta') 
        }}></img>

        <h3 className='main__categories'>Seafood</h3>
        <img className="main__categories" src="https://www.themealdb.com/images/category/seafood.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('seafood')    
        }}></img>

        <h3 className='main__categories'>Vegan</h3>
        <img className="main__categories" src="https://www.themealdb.com/images/category/vegan.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('vegan')    
        }}></img>

        <h3 className='main__categories'>Beef</h3>
        <img className="main__categories" src="https://www.themealdb.com/images/category/beef.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('beef')    
        }}></img>

        <h3 className='main__categories'>Chicken</h3>
        <img className="main__categories" src="https://www.themealdb.com/images/category/chicken.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('Chicken')    
        }}></img>

        <h3 className='main__categories'>Lamb</h3>
        <img className="main__categories" src="https://www.themealdb.com/images/category/lamb.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('lamb')    
        }}></img>

        <h3 className='main__categories'>Pork</h3>
        <img className="main__categories" src="https://www.themealdb.com/images/category/pork.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('pork')    
        }}></img>

        <h3 className='main__categories'>Misc</h3>
        <img className="main__categories" src="https://www.themealdb.com/images/category/miscellaneous.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('miscellaneous')    
        }}></img>

        <h3 className='main__categories'>Desserts</h3>
        <img className="main__categories" src="https://www.themealdb.com/images/category/dessert.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('dessert')    
        }}></img>
      </section>
    
}