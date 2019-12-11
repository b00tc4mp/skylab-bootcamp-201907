import React, { useState, useEffect } from 'react'

import Countdown from 'react-countdown-now'
import './index.sass'
import logic from '../../logic'
import { Route, withRouter } from 'react-router-dom'
import Settings from '../Settings'
import Favorites from '../Favorites'
import GenerateWorkout from '../GenerateWorkout'
import ReactPlayer from 'react-player'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'


export default withRouter(function ({ history, onLogout }) {
    const [view, setView] = useState()
    const [storedWorkout, setStoredWorkout] = useState(JSON.parse(sessionStorage.getItem("my-current-workout")))
    const [user, setUser] = useState()
    const [navBar, setNavBar] = useState(false)
    const [timer, setTimer] = useState('noTimer')
    const [home, setHome] = useState(true)
    const [workoutButton, setWorkoutButton] = useState('start-workout')
    const [fav, setFav] = useState(false)
    const [favorites, setFavorites] = useState()

    useEffect(() => {
        (async () => {
            const userdata = await logic.retrieveUser()

            setUser(userdata)
        })()
    }, [history.location])

    useEffect(() => {
        (async () => {
            if (storedWorkout) {
                setHome(false)

                const workoutIdSession = String(storedWorkout.user._id)
                const response = await logic.retrieveFav()

                const favInHistoric = response.find(item => String(item._id) === workoutIdSession)

                favInHistoric === true && fav(true)
            }
        })()
    }, [])

    const handleSaveWorkout = async () => {
        try {

            if (!user.current.length && !favorites) {
                await logic.toogleFav(String(storedWorkout.user._id))
                setFav(true)

            } else if (user.current.length > 0) {
                const workoutId = user.current[0]._id.toString()
                await logic.toogleFav(workoutId)
                setFav(true)
            }

        } catch ({ message }) {
            console.log(message)
        }
    }


    const handlegoBackHome = () => {
        setHome(true)
        setFav(false)
        setTimer('noTimer')
        setWorkoutButton('start-workout')
        // sessionStorage.removeItem('my-current-workout')
    }

    const handleNavClick = (event) => {
        event.preventDefault()
        setNavBar(!navBar)
    }

    const handleGoToFav = (event) => {
        event.preventDefault()
        setView('fav-panel')
        history.push('/favorites')
    }

    const handleGoToSettings = (event) => {
        event.preventDefault()
        history.push('/settings')
    }

    const handleCalculateWorkout = (event) => {
        event.preventDefault()
        setHome(false)

    }


    //timer function
    const startClock = ({ seconds, completed }) => {
        setTimer('timer')
        setWorkoutButton('workout-done')
        if (completed) {
            {
                setTimeout(() => {
                    setTimer('start')
                }, 1500)
            }
            return <span className="time-go">GO</span>

        } else {
            return <span className="time-red">{seconds}</span>
        }
    }

    const Finished = () => <span className="time">Finished</span>

    const timeRemain = ({ minutes, seconds, completed }) => {

        if (completed) {
            setTimeout(() => {
                setHome(false)
            }, 1000)
            return <Finished />

        } else {
            return <span className="time">{minutes}:{seconds}</span>
        }
    }
    const stopClock = () => {
        setTimer('pause')
    }


    return <>
        <header className="home-header">
            {view === 'fav-panel' && <Route path="/favorites" render={() => <Favorites />} />}
            <div>
                <div className="home-header--logo"></div>
            </div>
            <div>
                <span className="home-header--user-name">Hi, {user && user.name}</span>
            </div>

            {navBar === false && <FontAwesomeIcon className="home-header--icon" icon={faBars} onClick={handleNavClick} />}
            {navBar === true && <> <FontAwesomeIcon className="home-header--icon" icon={faTimes} onClick={handleNavClick} />
                <nav className="nav-container">
                    <ul className="nav-container__ul">
                        <li className="nav-container__ul-li">
                            <a key={'a-favorite'} className="nav-container__ul-li--style" href="" onClick={handleGoToFav}>Favorite workouts</a>
                        </li>
                        <li className="nav-container__ul-li mid">
                            <a key={'a-setting'} className="nav-container__ul-li--style" href="" onClick={handleGoToSettings}>Settings</a>
                        </li>
                        <li className="nav-container__ul-li">
                            <a key={'a-signout'} className="nav-container__ul-li--style" href="" onClick={onLogout}>Sign out</a>
                        </li>
                    </ul>
                </nav>
            </>}

        </header>

        <section className="mid-container">
            {timer === 'noTimer' && <>
                <div className="timer-container">
                    <div className="left-stripe">
                        <h2 className="left-stripe--text">Today is the day you are going to change your path</h2>
                    </div>
                </div>
            </>}

            {timer === 'timer' && <Countdown date={Date.now() + 3000} renderer={startClock} />}
            {timer === 'start' && <Countdown date={Date.now() + storedWorkout.time * 60000} renderer={timeRemain} />}
            {timer === 'pause' && <Finished />}

        </section>

        <section className="home">
            {home === true && <>
                <div className="warmup-container">
                    <p>THE WARMUP</p>
                    <p>{user && user.name}, it's important to warm up before each workout. Take your time to check this video to get a grasp of what a good warm up could look like.</p>
                    <div className="vid">
                        <ReactPlayer className='react-player' url={'https://youtu.be/9fo-_b_Du5w'} width='100%' height='100%' />
                    </div>
                </div>
                <button className="wody-bttn" onClick={handleCalculateWorkout}>Generate wody</button>
            </>}
            {home === false && <>
                <div className="start-container" >
                    {workoutButton === 'start-workout' ? <button className="workout-bttn" onClick={startClock}>Start workout</button> : <button className="done-bttn" onClick={stopClock}>Done</button>}
                    {fav === false ? <button className="save-bttn" onClick={handleSaveWorkout}>Save wody</button> : <span className="saved-mssg">saved</span>}

                </div>
                <GenerateWorkout /> </>}

        </section>
        <section className="footer-container">
            {home === false ? <FontAwesomeIcon onClick={handlegoBackHome} icon={faTimes} className="cross" /> : ''}
        </section>
    </>
})