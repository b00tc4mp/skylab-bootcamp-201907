import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import ReactPlayer from 'react-player'
import randomator from '../../utils/fisherYates'




export default function () {
    // set workout to whatever is saved in local storage to store the actual workout
    const [workout, setWorkout] = useState(JSON.parse(sessionStorage.getItem("my-current-workout")))
    const [video, setVideo] = useState()
    const [closeVideo, setCloseVideo] = useState(false)
    const [message, setMessage] = useState(false)
    const [noVideo, setNoVideo] = useState()

    //safe data in localStorage
    useEffect(() => {
        sessionStorage.setItem("my-current-workout", JSON.stringify(workout));
    }, [workout])


    //check whenever workout is empty,  calculate new workout
    useEffect(() => {
        (async () => {
            try {
                if (!workout) {
                    const timeArr = [10, 15, 20, 25, 30]
                    const { current } = await logic.claculateWorkout()
                    const time = randomator(timeArr)
                    time.splice(1)

                    const userData = {
                        time: time,
                        user: current[0]
                    }
                    setWorkout(userData)
                }
            } catch ({ message }) {
                console.log('Fail to retrieve workout', message)
            }
        })()
    }, [])

    const handleVideo = (movementId, movementUrl) => {

        if (!movementUrl.length) {
            setNoVideo(movementId)
            setMessage(!message)
        } else {
            setCloseVideo(!closeVideo)
            setVideo(movementId)
        }
    }

    return <>
        <section className="workout-setting">
            <div className="workout-header">
                <h3 className="workout-header__h3"> your wody</h3>
                <div className="workout-header__info">
                    {workout && <>
                        <p className="workout-header__info itext">set:<span className="set">{`${workout.user.sets[0]}`}</span></p>
                        <p className="workout-header__info itext">time:<span className="set">{`${workout.time[0]} min`}</span></p>
                    </>}
                </div>
            </div>
            <div className="workout-container">

                <div className="info-description">
                    <p className="info-description--style1">Movement</p>
                    <p className="info-description--style2">kg/%</p>
                    <p className="info-description--style3">Reps</p>
                </div>

                <div className="workouts">
                    {workout && workout.user.movements.map(movement => {
                        return <>
                            <article className="movement-container" key={`${movement._id}`} onClick={() => handleVideo(movement._id, movement.url)}>
                                <p className="movement-container--mov"><a>{movement.movement}</a></p>
                                <p className="movement-container--type">{movement.weights.length ? movement.weights : movement.type}</p>
                                <p className="movement-container--reps">{movement.reps[0]}</p>
                            </article>

                            <div key={`${movement.url}`} className='player-wrapper'>
                                {noVideo === movement._id && message && <p className="no-video">No video available</p>}
                                {video === movement._id && closeVideo && <ReactPlayer className='react-player' key={`${movement.url}-vid`} url={`${movement.url}`} width='100%' height='100%' playing />}
                            </div>
                        </>
                    })}
                </div>
            </div>
        </section>
    </>

}
