import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { Link , withRouter} from 'react-router-dom'

export default withRouter(function ({ match, onLogout }) {

  const [recipe, setRecipe] = useState()

  useEffect(() => {
    async function _retrieveRecipe(){
      try {
        const { params: { recipeId } } = match
        
        const res = await logic.retrieveRecipe(recipeId)

        const { id, title, image, items, description, category } = res

        setRecipe({id, title, image, items, description, category})

      } catch ({ message }) {
        console.log('fail retrieve recipe', message)
      }
    }
    _retrieveRecipe()
  }, [])

  return <section className='body'>
  <header class="navbar">
  <div class="dropdown dropdown-left">
    <button class="dropbtn">MenuPlanner 
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <Link className="nav__a dropdown__button a" href="#" to="/home">Home</Link>
      <Link className="nav__a dropdown__button a" href="#" to="/current-week">Current Week</Link>
      <Link className="nav__a dropdown__button a" href="#" to="/create-menu">Create Menu</Link>
    </div>
  </div> 
  <div class="dropdown dropdown-right">
    <button class="dropbtn"><i className="far fa-user-circle"></i>
    </button>
    <div class="dropdown-content">
      <Link className="nav__a dropdown__button" href="#" to="/user-profile">User Profile</Link>
      <a className="nav__a dropdown__button" href="#" onClick={onLogout}>Logout</a>
    </div>
  </div>
</header>

    {recipe &&
      <section className="recipe">
        <section className="recipe__title">
          <h2>{recipe.title}</h2>
          <img className="recipe__photo" src={`http://localhost:8080/${recipe.image}`} alt="recipe"/>
          <h3>Ingredients</h3>
          <ul className="recipe__ul">{recipe.items.map(item => <li key={Math.random()} className="recipe__li"> - {item.ingredient.title} {item.quantity} {item.ingredient.unit} <p>{item.description}</p> </li>)}</ul>
          <p className="recipe__text">{recipe.description}</p>
        </section>
      </section>}
  </section>
})