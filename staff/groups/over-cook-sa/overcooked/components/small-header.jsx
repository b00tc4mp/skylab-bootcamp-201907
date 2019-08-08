function SmallHeader(props) {
  return (
    <>
      <img
        src="https://images.gog.com/87aecb600554d68a9c5b58c757bc0a2ded9fd7b27c635ef6d57d748765cb9d43.png"
        alt=""
      />

      <p>Welcome, User</p>
      <a href="" onClick={ event => {
        event.preventDefault()
        props.onLogout()
      }
      }>Logout</a>

<a href="" onClick={ event => {
        event.preventDefault()
        props.goToCategories()
      }
      }>Categories</a>
      
      <a href="">Favorites</a>

    </>
  )
}
