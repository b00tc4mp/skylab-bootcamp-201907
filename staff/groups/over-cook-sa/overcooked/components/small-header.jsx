function SmallHeader({onLogout,goToCategories,user,handleFavorites}) {

  return ( <nav>
      <img className = "home-logo" src="https://cdn.shopify.com/s/files/1/0014/1962/files/FG-banner_collect-top_template2_overcooked.png?v=1528818873" alt=""/>
        <section className="user">
          <section className="user-welcome">
          <p className="home-welcome">Welcome {user.name}</p>
          </section>
        </section>

      <section className="smallHeader-buttons">
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
              </section>

      </nav>
    
  )
}
