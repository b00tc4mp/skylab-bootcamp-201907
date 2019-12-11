import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'
import Home from '../Home'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'

export default withRouter(function ({ history }) {
    const [view, setView] = useState()
    const [favorite, setFavorite] = useState()
    const [mapList, setMapList] = useState(true)
    const [workoutId, setWorkoutId] = useState()
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        (async () => {
            try {
                const favorite = await logic.retrieveFav()
                setFavorite(favorite)
            } catch ({ message }) {
                console.log('Fail to retrieve favorites', message)
            }
        })()
    }, [refresh])

    const handleBack = () => {
        setView('home')
        history.push('/home')
    }

    const handleCheckFav = (favWorkoutId) => {
        setWorkoutId(favWorkoutId)
        setMapList(!mapList)
    }

    const handleUnFav = async (workoutId) => {
        try {
            await logic.toogleFav(workoutId)
            setRefresh(!refresh)
        } catch ({ message }) {
            console.log('failed on', message)
        }
    }

    const FavList = () => {
        const wkout = favorite.filter(item => String(item._id) === workoutId)

        return <table className="favmovement-table">
            <thead>
                <tr className="table-top">
                    <th>Movement</th>
                    <th>Type</th>
                    <th>Reps</th>
                </tr>
            </thead>
            {wkout[0].movements.map(item => {
                return <>
                    <tbody>
                        <tr key={item._id} className="table-data">
                            <td className="movement-p">{item.movement}</td>
                            <td className="movement-p">{item.type}</td>
                            <td className="movement-p">{item.reps}</td>
                        </tr>
                    </tbody>
                </>
            })}
        </table>
    }

    return <>
        {view === 'home' && <Route path="/home" render={() => <Home />} />}
        <div className="header">
            <h2 className="fav-h2">Saved Workouts</h2>
        </div>
        <section className="favorite-container">
            <div className="favorites">
                {favorite && favorite.map(fav => {
                    return <>
                        <div className="date-container">
                            <p className="fav-bold" key={fav._id} onClick={() => handleCheckFav(fav._id)}>{new Date(fav.date).toUTCString().slice(0, 13)}</p>
                            <FontAwesomeIcon className="date-container--cross" icon={faTimes} onClick={() => handleUnFav(fav._id)} />
                        </div>
                        {workoutId === fav._id && !mapList && <FavList />}
                    </>
                })}
            </div>
        </section>
        <div className="favfooter">
            <FontAwesomeIcon className="fav-icon" icon={faArrowLeft} onClick={handleBack} />
        </div>
    </>

})
