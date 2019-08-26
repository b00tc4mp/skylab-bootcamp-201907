function SmallHeader({onLogout,goToCategories,user,handleFavorites}) {

  return ( <nav>
      <img className = 'home__logo' src="https://cdn.shopify.com/s/files/1/0014/1962/files/FG-banner_collect-top_template2_overcooked.png?v=1528818873" alt=""/>
          <section className="home__user">
            <p className="home__user__text">Welcome {user.name}</p>
          </section>

      <section className="home__section">
      <a href="home-logout" className="home__section__buttom" onClick={ event => {
        event.preventDefault()
        onLogout()
      }
      }>Logout</a>

      <a className="home__section__buttom" href="" onClick={ event => {
        event.preventDefault()
        goToCategories()
      }
      }>Categories</a>
      
      <a href="" className="home__section__buttom" onClick={event => {
        event.preventDefault(

        handleFavorites()
        )
      }}>Favorites</a>
              </section>

      </nav>
    
  )
}
