import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { Link , withRouter} from 'react-router-dom'

const REACT_APP_URL = process.env.REACT_APP_URL

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
      }
    }
    _retrieveRecipe()
  }, [])

  return <section className='body'>
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
        <div className="dropdown-content">
          <Link className="nav__a dropdown__button a" href="#" to="/user-profile">User Profile</Link>
          <a className="nav__a dropdown__button a" href="#" onClick={onLogout}>Logout</a>
    </div>
  </div>
</header>

    {recipe &&
      <section className="recipe">
        <section className="recipe__title">
          <h2>{recipe.title}</h2>
          <img className="recipe__photo" src={`${REACT_APP_URL}${recipe.image}`} alt="recipe"/>
          <h3>Ingredients</h3>
          <ul className="recipe__ul">{recipe.items.map((item, index) => <li key={index} className="recipe__li"> - {item.ingredient.title} {item.quantity} {item.ingredient.unit} <p>{item.description}</p> </li>)}</ul>
          <p className="recipe__text">{recipe.description}</p>
        </section>
      </section>}
  </section>
})