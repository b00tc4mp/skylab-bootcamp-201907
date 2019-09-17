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
            <Link className="nav__a dropdown__button" href="#" to="/create-menu">Create Menu</Link>
            <a className="nav__a dropdown__button" href="#" onClick={onLogout}>Logout</a>
          </div>
        </div>
      </nav>
    </header>

    {week &&
      <section className="week">
        <ul>{week.map(day => <li className="week__day">
            <h2>{day.title}</h2>
            <section onClick={() => handleRecipeDetail(day.breakfast.id)}>
              <h3 className="week__day-meal">Breakfast</h3>
              <img className="week__day-img" src={`http://localhost:8080/${day.breakfast.image}`} alt="recipe" />
              <h3 className="week__day-title">{day.breakfast.title}</h3>
            </section>
            <section onClick={() => handleRecipeDetail(day.lunch.id)}>
              <h3 className="week__day-meal">Lunch</h3>
              <img className="week__day-img" src={`http://localhost:8080/${day.lunch.image}`} alt="recipe" />
              <h3 className="week__day-title">{day.lunch.title}</h3>
            </section>
            <section onClick={() => handleRecipeDetail(day.snack.id)}>
              <h3 className="week__day-meal">Snack</h3>
              <img className="week__day-img" src={`http://localhost:8080/${day.snack.image}`} alt="recipe" />
              <h3 className="week__day-title">{day.snack.title}</h3>
            </section>
            <section onClick={() => handleRecipeDetail(day.dinner.id)}>
              <h3 className="week__day-meal">Dinner</h3>
              <img className="week__day-img" src={`http://localhost:8080/${day.dinner.image}`} alt="recipe" />
              <h3 className="week__day-title">{day.dinner.title}</h3>
            </section>
        </li>)}
        </ul>
      </section>}
  </section>
})


/* {week &&
  <section className="week">
    <section className="week__day">
      <h2>Monday</h2>
      <section onClick={() => handleRecipeDetail(week[0].breakfast.id)}>
        <h3 className="week__day-meal">Breakfast</h3>
        <img className="week__day-img" src={`http://localhost:8080/${week[0].breakfast.image}`} alt="recipe" />
        <h3 className="week__day-title">{week[0].breakfast.title}</h3>
      </section>
    </section>
  </section>}
</section> */




/* import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'

export default function ({ onRetrieveWeek, onLogout }) {

  const [selectedDay, setSelectedDay] = useState()
  const [showDay, setShowDay] = useState()
  const [days, setDays] = useState()
  useEffect(() => {
    (async () => {
      try {
        const response = await logic.retrieveCurrentWeek()
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = response
        monday.title = 'monday'
        tuesday.title = 'tuesday'
        wednesday.title = 'wednesday'
        thursday.title = 'thursday'
        friday.title = 'friday'
        saturday.title = 'saturday'
        sunday.title = 'sunday'
        setDays([monday, tuesday, wednesday, thursday, friday, saturday, sunday])
      } catch ({ message }) {
        console.log('fail search day', message)
      }
    })()
  }, [])

  function handleStateDay(event) {
    const { target: { value } } = event

    const { breakfast, lunch, snack, dinner } = days.find(day => value === day.id)

    setSelectedDay({ breakfast, lunch, snack, dinner })
  }

  return <section className='body'>
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
          <a className="nav__a dropdown__button" href="#" onClick={onLogout}>Logout</a>
        </div>
      </div>
    </nav>
  </header>

    {days &&
      <form onSubmit={event => {
        event.preventDefault()


        debugger
        setShowDay(selectedDay)
      }}>

        <section className="current-week__section">
          <select onChange={handleStateDay} className="selector">
            <option value="default">Pick a day</option>
            {days.map(day => <option value={day.id}>{day.title}</option>)}
          </select>
        </section>
        <button className="current-week__week">See current day</button>
      </form>
    }

    {showDay && <section className="current-week__section">
      <section className="recipe">
        <h2 className="recipe__meal">{showDay.breakfast.category}</h2>
        <h2 className="recipe__title">{showDay.breakfast.title}</h2>
        <img className="recipe__photo" src={`http://localhost:8080/${showDay.breakfast.image}`} alt="recipe" />
        <ul className="recipe__ul">Ingredients{showDay.breakfast.items.map(item =>  <li key={Math.random()}className="recipe__li"> - {item.ingredient.title} {item.quantity} {item.ingredient.unit} <p>{item.description}</p> </li>)}</ul>
        <div className="recipe__text">{showDay.breakfast.description}</div>
      </section>
    </section>}
  </section>
} */