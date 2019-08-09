function SmallHeader({onLogout,goToCategories,user,handleFavorites}) {

  return ( <nav>
      <img className = "home-logo" src="https://cdn.shopify.com/s/files/1/0014/1962/files/FG-banner_collect-top_template2_overcooked.png?v=1528818873" alt=""/>

      <p className="home-welcome">Welcome {user.name}</p>
      
      <a href="home-logout" className="headerButton" onClick={ event => {
        event.preventDefault()
        onLogout()
      }
      }>Logout</a>

      <a className="home-categories headerButton" href="" onClick={ event => {
        event.preventDefault()
        goToCategories()
      }
      }>Categories</a>
      
      <a href="" className="home-favorites headerButton" onClick={event => {
        event.preventDefault(

        handleFavorites()
        )
      }}>Favorites</a>
      </nav>
    
  )
}
