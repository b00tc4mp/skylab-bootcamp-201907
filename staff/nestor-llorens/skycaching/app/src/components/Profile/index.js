import React, { useEffect, useState, useRef } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { withRouter } from 'react-router-dom'

import L from 'leaflet'
import logic from '../../logic'
import './index.css';

function Profile({ history, setUser }) {

    const [position, setPosition] = useState([0, 0])
    const [zoom, setZoom] = useState(2)
    const [haveUsersLocation, setHaveUsersLocation] = useState(false)
    const [allCaches, setAllCaches] = useState([])
    const [ownCaches, setOwnCaches] = useState([])

    var myIcon = L.icon({
        iconUrl: 'https://cdn3.iconfinder.com/data/icons/cash-coin-essentials-glyph/48/Sed-19-512.png',
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41],
    })

    var myIcon2 = L.icon({
        iconUrl: 'https://image.flaticon.com/icons/png/512/97/97895.png',
        iconSize: [50, 82],
        iconAnchor: [25, 82],
        popupAnchor: [0, -82],
    })

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)
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
            setZoom(17)
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
        } catch{

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

        <h2>Profile</h2>

        {ownCaches.length > 0 && <h3>Owned Caches</h3>}
        {ownCaches.map((item) => (<ul>
            <li><p>Name: {item.name}</p></li>
            
            <form onSubmit={event => {
                event.preventDefault()
                handleDeleteCache(event.target.cacheId.value)
            }}>
                <input type='hidden' name="cacheId" value={item._id} />
                <button>Delete</button>
            </form>
            <form onSubmit={event => {
                event.preventDefault()
                handleGoToDetails(event.target.cacheId.value)
            }}>
                <input type='hidden' name="cacheId" value={item._id} />
                <button>Details</button>
            </form>
        </ul>))}

        <h3>Create Cache</h3>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, description: { value: description }, difficulty: { value: difficulty }, terrain: { value: terrain }, size: { value: size }, hints: { value: hints } } } = event
            const loc = { type: 'Point', coordinates: [position[1], position[0]] }

            handleRegisterCache(name, description, loc, Number(difficulty), Number(terrain), size, hints)
        }}>
            <label htmlFor="name">Name</label>
            <input type="name" name="name" />
            <label htmlFor="description">Description</label>
            <input type="description" name="description" />
            <label htmlFor="difficulty">Difficulty</label>
            {/* <input type="difficulty" name="difficulty" /> */}
            <select type='difficulty' name='difficulty'>
                <option value='1'>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <label htmlFor="terrain">Terrain</label>
            <select type='terrain' name='terrain'>
                <option value='1'>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <label htmlFor="size">Size</label>
            <select type='size' name='size'>
                <option value='small'>small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
            </select>
            <label htmlFor="hints">Hints</label>
            <textarea rows="4" cols="50" name='hints' />
            
            {/* <input type="hints" name="hints" /> */}

            <button>Proceed</button>
        </form>

        <Map className="map" center={position} zoom={zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                haveUsersLocation ?
                    <Marker position={position} icon={myIcon2} draggable={true} onDragend={updatePosition} ref={refmarker} />
                    : ''

            }
            {allCaches && allCaches.length && allCaches.map(cache => <Marker key={cache._id} draggable={false}
                position={[cache.location.coordinates[1], cache.location.coordinates[0]]} icon={myIcon}>
                <Popup>
                    <p>{cache.name}</p>
                </Popup>
            </Marker>)}

        </Map>
    </>
    )
}

export default withRouter(Profile)