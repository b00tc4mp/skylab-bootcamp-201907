import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { Link , withRouter} from 'react-router-dom'

export default withRouter(function ({ match, onLogout }) {

  const [recipe, setRecipe] = useState()

  useEffect(() => {
    async function _retrieveRecipe(){
      try {
        const { params: { recipeId } } = match
        debugger
        const res = await logic.retrieveRecipe(recipeId)

        const { id, title, image, items, description, category } = res

        setRecipe({id, title, image, items, description, category})
        debugger
      } catch ({ message }) {
        console.log('fail retrieve recipe', message)
      }
    }
    _retrieveRecipe()
  }, [])

  return <section className='body'>
    <header>
      <nav className="nav">
        <a className="nav__h2" href="#"><h2 className="nav__h2">MenuPlanner</h2></a>
        <div className="dropdown">
          <button className="nav__icon dropdown__dropbtn">
            <i className="far fa-user-circle"></i>
          </button>
          <div className="nav__a dropdown__content">
            <Link className="nav__a dropdown__button" href="#" to="/home">Home</Link>
            <Link className="nav__a dropdown__button" href="#" to="/user-profile">User profile</Link>
            <Link className="nav__a dropdown__button" href="#" to="/current-week">Current week</Link>
            <Link className="nav__a dropdown__button" href="#" to="/create-menu">Create Menu</Link>
            <a className="nav__a dropdown__button" href="#" onClick={onLogout}>Logout</a>
          </div>
        </div>
      </nav>
    </header>

    {recipe &&
      <section className="week">
        <section className="week__day">
          <h2>{recipe.title}</h2>
          <img className="recipe__photo" src={`http://localhost:8080/${recipe.image}`} alt="recipe"/>
          <ul className="recipe__ul">Ingredients{recipe.items.map(item => <li key={Math.random()} className="recipe__li"> - {item.ingredient.title} {item.quantity} {item.ingredient.unit} <p>{item.description}</p> </li>)}</ul>
          <p>{recipe.description}</p>
        </section>
      </section>}
  </section>
})