import React, { useEffect, useState, useRef } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { withRouter } from 'react-router-dom'
import girl from '../../img/girl.png'
import chest from '../../img/chest.png'
import Feedback from '../Feedback'

import L from 'leaflet'
import logic from '../../logic'

function Profile({ history, setUser, user }) {

    const [error, setError] = useState()
    const [position, setPosition] = useState([0, 0])
    const [zoom, setZoom] = useState(2)
    const [haveUsersLocation, setHaveUsersLocation] = useState(false)
    const [allCaches, setAllCaches] = useState([])
    const [ownCaches, setOwnCaches] = useState([])
    const [foundCaches, setFoundCaches] = useState([])

    var myIcon = L.icon({
        iconUrl: chest,
        iconSize: [25, 25],
        iconAnchor: [12.5, 25],
        popupAnchor: [0, -41],
    });

    var myIcon2 = L.icon({
        iconUrl: girl,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -41],
    })

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)

            const foundCaches = user.found
            setFoundCaches(foundCaches)
        })()
    }, [history.location])

    useEffect(() => {
        (async function () {
            const allCaches = await logic.retrieveAllCaches()
            setAllCaches(allCaches)
            const ownCaches = await logic.retrieveOwnCaches()
            setOwnCaches(ownCaches)
        }
        )()
    }, [])

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(position => {
            setZoom(15)
            setPosition([position.coords.latitude, position.coords.longitude])
            setHaveUsersLocation(true)
        }, error => console.log(error.message))
    }, [])

    const refmarker = useRef(null)

    function updatePosition() {
        const marker = refmarker.current
        if (marker !== position) {
            const location = marker.leafletElement.getLatLng()
            setPosition([location.lat, location.lng])
        }
    }

    const handleRegisterCache = async (name, description, location, difficulty, terrain, size, hints) => {
        try {
            await logic.registerCache(name, description, location, difficulty, terrain, size, hints)
            const allCaches = await logic.retrieveAllCaches()
            setAllCaches(allCaches)
            const ownCaches = await logic.retrieveOwnCaches()
            setOwnCaches(ownCaches)
        } catch({ message }){
            setError(message)

        }
    }
    const handleDeleteCache = async (cacheId) => {
        try {

            await logic.unregisterCache(cacheId)
            const allCaches = await logic.retrieveAllCaches()
            setAllCaches(allCaches)
            const ownCaches = await logic.retrieveOwnCaches()
            setOwnCaches(ownCaches)

        } catch {

        }
    }

    const handleGoToDetails = async (cacheId) => {
        history.push(`/details/${cacheId}`)
    }

    return (<>
        <main className="profile">
            <section className="profile__caches">

                
                {ownCaches.length > 0 && <h3 className='profile__caches-header'>Owned Caches</h3>}
                {ownCaches.map((item) => (<ul className='profile__caches-list'>
                    <li className='profile__caches-item'><p className='profile__caches-paragraph'>{item.name}</p></li>
                    <section className='profile__caches-buttons'>
                        <form className='profile__caches-detailsForm' onSubmit={event => {
                            event.preventDefault()
                            handleGoToDetails(event.target.cacheId.value)
                        }}>
                            <input type='hidden' name="cacheId" value={item._id} />
                            <button className='profile__caches-detailsCache'>Details</button>
                        </form>

                        <form className='profile__caches-deleteForm' onSubmit={event => {
                            event.preventDefault()
                            handleDeleteCache(event.target.cacheId.value)
                        }}>
                            <input type='hidden' name="cacheId" value={item._id} />
                            <button className='profile__caches-deleteCache'>Delete</button>
                        </form>
                    </section>

                </ul>))}
            </section>

            <Map className="map-profile" center={position} zoom={zoom}>
                <TileLayer
                    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}' ext='jpg'
                />
                {
                    haveUsersLocation ?
                        <Marker position={position} icon={myIcon2} draggable={true} onDragend={updatePosition} ref={refmarker} />
                        : ''

                }
                {allCaches && allCaches.length && allCaches.map(cache => <Marker key={cache._id} draggable={false}
                    position={[cache.location.coordinates[1], cache.location.coordinates[0]]} icon={myIcon}>
                    <Popup>
                        <form onSubmit={event => {
                            event.preventDefault()
                            handleGoToDetails(event.target.cacheId.value)
                        }}>
                            <input type='hidden' name="cacheId" value={cache._id} />
                            <button className='popup__button'>{cache.name}</button></form>
                    </Popup>
                </Marker>)}

            </Map>
            
            <section className="create__cache">
                <h3 className='create__cache-header'>Create Cache</h3>
                <form className='create__cache-form' onSubmit={event => {
                    event.preventDefault()

                    const { target: { name: { value: name }, description: { value: description }, difficulty: { value: difficulty }, terrain: { value: terrain }, size: { value: size }, hints: { value: hints } } } = event
                    const loc = { type: 'Point', coordinates: [position[1], position[0]] }

                    handleRegisterCache(name, description, loc, Number(difficulty), Number(terrain), size, hints)
                }}>
                    <label className='create__cache-label' htmlFor="name">Name</label>
                    <input className='create__cache-input' type="name" name="name" />
                    <label className='create__cache-label' htmlFor="description">Description</label>
                    <input className='create__cache-input' type="description" name="description" />
                    <div className='create__cache-div'>
                        <label className='create__cache-label' htmlFor="difficulty">Difficulty</label>
                        <select type='difficulty' name='difficulty'>
                            <option value='1'>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <label className='create__cache-label' htmlFor="terrain">Terrain</label>
                        <select type='terrain' name='terrain'>
                            <option value='1'>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <label className='create__cache-label' htmlFor="size">Size</label>
                        <select type='size' name='size'>
                            <option value='small'>small</option>
                            <option value="medium">medium</option>
                            <option value="large">large</option>
                        </select>
                    </div>
                    <label className='create__cache-label' htmlFor="hints">Hints</label>
                    <textarea rows="4" cols="20" name='hints' />
                    {error && <Feedback message={error}/>}
                    <button className='create__cache-create'>Create cache</button>
                </form>
            </section>
        </main>
    </>
    )
}

export default withRouter(Profile)