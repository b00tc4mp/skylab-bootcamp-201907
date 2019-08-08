function SmallHeader({onLogout,goToCategories,user,handleFavorites}) {

  return (
    <>
      <img className="home-logo"
        src="https://images.gog.com/87aecb600554d68a9c5b58c757bc0a2ded9fd7b27c635ef6d57d748765cb9d43.png"
        alt=""
      />

      <p className="home-welcome">Welcome {user.name}</p>
      <a href="home-logout" onClick={ event => {
        event.preventDefault()
        onLogout()
      }
      }>Logout</a>

      <a className="home-categories" href="" onClick={ event => {
        event.preventDefault()
        goToCategories()
      }
      }>Categories</a>
      
      <a href="" className="home-favorites" onClick={event => {
        event.preventDefault(

        handleFavorites()
        )
      }}>Favorites</a>
    </>
  )
}
