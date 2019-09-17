import React, { useState, useEffect } from 'react'
import '../../../src/index.css'
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
    <header>
      <nav className="nav">
        <a className="nav__h2" href="#"><h2 className="nav__h2">MenuPlanner</h2></a>
        <div className="dropdown">
          <button className="nav__icon dropdown__dropbtn">
            <i className="far fa-user-circle"></i>
          </button>
          <div className="nav__a dropdown__content">
            <Link className="nav__a dropdown__button" href="#" to="/user-profile">User profile</Link>
            <Link className="nav__a dropdown__button" href="#" to="/current-week">Current week</Link>
            <Link className="nav__a dropdown__button" href="#" to="/create-menu">Create Menu</Link>
            <a className="nav__a dropdown__button" href="#" onClick={onLogout}>Logout</a>
          </div>
        </div>
      </nav>
    </header>

    <main className="main">
      <p className="main__menu-default main__hello">Hello, {user && user.name}</p>
      <a className="main__menu-default main__button-week" href="" onClick={handleGoToCurrentWeek}>Current Week</a>
      <a className="main__menu-default main__button-week" href="" onClick={handleGoToCreateMenu}>Create your week menu</a>
    </main>
    <h3 className="examples__title">Some Recipes</h3>
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