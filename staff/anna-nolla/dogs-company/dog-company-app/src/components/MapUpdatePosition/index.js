import React, { useEffect, useState, useRef } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './map.css'
import logic from '../../logic'
import paw from '../../img/paws.png'
import walkingDog from '../../img/walking-dog.png'

function MapUpdatePosition() {

  const paws = paw
  const blueMarker = walkingDog
  const [draggable, setDraggable] = useState(true)
  const [position, setPosition] = useState([0, 0])
  const [zoom, setZoom] = useState(2)
  const [haveUsersLocation, setHaveUsersLocation] = useState(false)
  
  const mark = (draggable ? paws : walkingDog)
  var myIcon = L.icon({
    iconUrl: mark,
    iconSize: [40, 40],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  })

  useEffect(() => {
    
    if(!haveUsersLocation) navigator.geolocation.getCurrentPosition(position => {
      setZoom(17)
      setPosition([position.coords.latitude, position.coords.longitude])
      setHaveUsersLocation(true)

    }, error => console.log(error.message))
  }, [])

  function toggleDraggable() {
      setDraggable(!draggable)
    }
    const refmarker = useRef(null)

    function updatePosition() {
      const marker = refmarker.current
      if (marker !== position) {
        const location = marker.leafletElement.getLatLng()
        setPosition([location.lat, location.lng])
      }
  }

    function onDogWalk(){
      logic.updateStaticLocation(Number(position[1]), Number(position[0]))
  }
     
  return (

    <Map className="map-update-position" center={position} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        haveUsersLocation ?
          <Marker position={position} icon={myIcon} draggable={draggable} onDragend={updatePosition} ref={refmarker}>
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable ? <button onClick = {onDogWalk}>Set walking position</button> : <button>Change position again</button>}
              </span>
        </Popup>
          </Marker> : ''
      }
    </Map>
  )
}
export default MapUpdatePosition