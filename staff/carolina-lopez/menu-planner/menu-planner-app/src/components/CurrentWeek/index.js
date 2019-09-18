import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { Link, withRouter } from 'react-router-dom'

export default withRouter(function ({ history, onLogout }) {

  const [week, setWeek] = useState()

  useEffect(() => {
    (async () => {
      try {
        const res = await logic.retrieveCurrentWeek()

        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = res
        monday.title = 'Monday'
        tuesday.title = 'Tuesday'
        wednesday.title = 'Wednesday'
        thursday.title = 'Thursday'
        friday.title = 'Friday'
        saturday.title = 'Saturday'
        sunday.title = 'Sunday'
        setWeek([monday, tuesday, wednesday, thursday, friday, saturday, sunday])

      } catch ({ message }) {
        console.log('fail search week', message)
      }
    })()
  }, [])

  function handleRecipeDetail(recipeId) {
    history.push(`/recipe-detail/${recipeId}`)
  }

  return <section className='body'>
<header class="navbar">
  <div class="dropdown dropdown-left">
    <button class="dropbtn">MenuPlanner 
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <Link className="nav__a dropdown__button a" href="#" to="/home">Home</Link>
      <Link className="nav__a dropdown__button a" href="#" to="/create-menu">Create Menu</Link>
    </div>
  </div> 
  <div class="dropdown dropdown-right">
    <button class="dropbtn"><i className="far fa-user-circle"></i>
    </button>
    <div class="dropdown-content">
      <Link className="nav__a dropdown__button a" href="#" to="/user-profile">User Profile</Link>
      <a className="nav__a dropdown__button a" href="#" onClick={onLogout}>Logout</a>
    </div>
  </div>
</header>

    {week &&
      <section className="week">
        <ul>{week.map(day => <li className="week__li">
            <h2 className="week__day-name">{day.title}</h2>
            <section className="week__day" onClick={() => handleRecipeDetail(day.breakfast.id)}>
              <h3 className="week__day-meal">Breakfast</h3>
              <img className="week__day-img" src={`http://localhost:8080/${day.breakfast.image}`} alt="recipe" />
              <h3 className="week__day-title">{day.breakfast.title}</h3>
            </section>
            <section className="week__day" onClick={() => handleRecipeDetail(day.lunch.id)}>
              <h3 className="week__day-meal">Lunch</h3>
              <img className="week__day-img" src={`http://localhost:8080/${day.lunch.image}`} alt="recipe" />
              <h3 className="week__day-title">{day.lunch.title}</h3>
            </section>
            <section className="week__day" onClick={() => handleRecipeDetail(day.snack.id)}>
              <h3 className="week__day-meal">Snack</h3>
              <img className="week__day-img" src={`http://localhost:8080/${day.snack.image}`} alt="recipe" />
              <h3 className="week__day-title">{day.snack.title}</h3>
            </section>
            <section className="week__day" onClick={() => handleRecipeDetail(day.dinner.id)}>
              <h3 className="week__day-meal">Dinner</h3>
              <img className="week__day-img" src={`http://localhost:8080/${day.dinner.image}`} alt="recipe" />
              <h3 className="week__day-title">{day.dinner.title}</h3>
            </section>
        </li>)}
        </ul>
      </section>}
  </section>
})