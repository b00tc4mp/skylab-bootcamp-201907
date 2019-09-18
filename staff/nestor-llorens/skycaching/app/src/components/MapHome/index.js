import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { withRouter } from 'react-router-dom'
import girl from '../../img/girl.png'
import chest from '../../img/chest.png'


import L from 'leaflet'
import logic from '../../logic'

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

function MapHome({ history }) {

  const [position, setPosition] = useState([0, 0])
  const [zoom, setZoom] = useState(2)
  const [haveUsersLocation, setHaveUsersLocation] = useState(false)
  const [allCaches, setAllCaches] = useState()

  useEffect(() => {

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(position => {
        setZoom(17)
        setPosition([position.coords.latitude, position.coords.longitude])
        setHaveUsersLocation(true)

      }, error => console.log(error.message))
    }, 3000);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {

    (async function () {

      const loc = { location: { type: 'Point', coordinates: [position[1], position[0]] } }
      await logic.updateUser(loc)
      const caches = await logic.retrieveAllCaches()
      setAllCaches(caches)
    })()

  }, [])

  const handleGoToDetails = async (cacheId) => {
    history.push(`/details/${cacheId}`)
  }


  return (<>
    <main className='mapHome'>
      <Map className="map" center={position} zoom={zoom}>
        <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}' ext= 'jpg'
        />
        {
          haveUsersLocation ?
            <Marker position={position} icon={myIcon2} >
            </Marker> : ''
        }
        {allCaches && allCaches.length && allCaches.map(cache => <Marker key={cache._id} draggable={false}
          position={[cache.location.coordinates[1], cache.location.coordinates[0]]} icon={myIcon}>
          <Popup>
            <form onSubmit={event => {
              event.preventDefault()
              handleGoToDetails(event.target.cacheId.value)
            }}>
              <input type='hidden' name="cacheId" value={cache._id} />
              <button>{cache.name}</button></form>
          </Popup>
        </Marker>)}
      </Map>
    </main>
  </>)
}
export default withRouter(MapHome)
