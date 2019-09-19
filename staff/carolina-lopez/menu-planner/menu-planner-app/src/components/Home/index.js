import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { Link, withRouter } from 'react-router-dom'

export default withRouter(function ({ history, onLogout }) {
  const [user, setUser] = useState()
  const [view, setView] = useState()
  const [someRecipes, setSomeRecipes] = useState()
  
  useEffect(() => {
    (async () => {
      
      const breakfast = await logic.searchRecipe('breakfast')
      const lunch = await logic.searchRecipe('lunch')
      const dinner = await logic.searchRecipe('dinner')
      const user = await logic.retrieveUser()
      
      setSomeRecipes([breakfast[Math.floor(Math.random() * breakfast.length)],lunch[Math.floor(Math.random() * lunch.length)],dinner[Math.floor(Math.random() * dinner.length)]])
      setUser(user)
    })()
  }, [history.location])

  const handleGoToCreateMenu = event => {
    event.preventDefault()

    setView('create-menu')

    history.push('/create-menu')
  }

  const handleGoToCurrentWeek = event => {
    event.preventDefault()

    setView('current-week')

    history.push('/current-week')
  }

  const handleGoHome = () => {
    setView('home')

    history.push('/home')
  }

  function handleRecipeDetail(recipeId) {
    history.push(`/recipe-detail/${recipeId}`)
  }

  return <div className="body">
<header className="navbar">
  <div className="dropdown dropdown-left">
    <button className="dropbtn">MenuPlanner 
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
      <Link className="nav__a dropdown__button a" href="#" to="/home">Home</Link>
      <Link className="nav__a dropdown__button a" href="#" to="/current-week">Current Week</Link>
      <Link className="nav__a dropdown__button a" href="#" to="/create-menu">Create Menu</Link>
    </div>
  </div> 
  <div className="dropdown dropdown-right">
    <button className="dropbtn"><i className="far fa-user-circle"></i>
    </button>
    <div class="dropdown-content">
      <Link className="nav__a dropdown__button a" href="#" to="/user-profile">User Profile</Link>
      <a className="nav__a dropdown__button a" href="#" onClick={onLogout}>Logout</a>
    </div>
  </div>
</header>

    <main className="main">
      <p className="main__menu-default main__hello">Hello, {user && user.name}</p>
      <a className="main__menu-default main__button" href="" onClick={handleGoToCurrentWeek}>Current Week</a>
      <a className="main__menu-default main__button" href="" onClick={handleGoToCreateMenu}>Create your weekly menu</a>
    </main>
    <h3 className="examples__title">Some delicious recipes</h3>
    <section className="examples">
      <ul className="examples__ul">
        {someRecipes && someRecipes.map(recipe => 
          <li className="examples__li" onClick={() => handleRecipeDetail(recipe.id)}>
            <h4 className="examples__h4">{recipe.title}</h4>
            <img className="examples__photo" src={`http://localhost:8080/${recipe.image}`}alt={recipe.title}></img>
          </li>
        )}
      </ul>
    </section>
  </div>

})