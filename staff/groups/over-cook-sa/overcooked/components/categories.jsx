function Categories (props) {

    return <>
        <h3>Pasta</h3>
        <img src="https://www.themealdb.com/images/category/pasta.png" alt="" onClick={event => {
          event.preventDefault()
          props.onSearchCat('pasta') 
        }}></img>

        <h3>Seafood</h3>
        <img src="https://www.themealdb.com/images/category/seafood.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('seafood')    
        }}></img>

        <h3>Vegan</h3>
        <img src="https://www.themealdb.com/images/category/vegan.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('vegan')    
        }}></img>

        <h3>Beef</h3>
        <img src="https://www.themealdb.com/images/category/beef.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('beef')    
        }}></img>

        <h3>Chicken</h3>
        <img src="https://www.themealdb.com/images/category/chicken.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('Chicken')    
        }}></img>

        <h3>lamb</h3>
        <img src="https://www.themealdb.com/images/category/lamb.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('lamb')    
        }}></img>

        <h3>pork</h3>
        <img src="https://www.themealdb.com/images/category/pork.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('pork')    
        }}></img>

        <h3>Misc</h3>
        <img src="https://www.themealdb.com/images/category/miscellaneous.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('miscellaneous')    
        }}></img>

        <h3>Desserts</h3>
        <img src="https://www.themealdb.com/images/category/dessert.png" alt="" onClick={event => {
          event.preventDefault()
        props.onSearchCat('dessert')    
        }}></img>
    </>
}