import React, { useEffect, useState, useContext} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './map.css'
import MyContext from '../Provider-Context'
import paw from '../../img/paws.png'
import walkingDog from '../../img/walking-dog.png'
import logic from '../../logic';
import { async } from 'q';

var myIcon = L.icon({
  iconUrl: paw,
  iconSize: [40, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

function MapHome() {
  const [error , setError] = useState(undefined)
  const [position, setPosition] = useState([0, 0])
  const [zoom, setZoom] = useState(2)
  const [haveUsersLocation, setHaveUsersLocation] = useState(false)
  const [users, setUsers] = useState(undefined)
  const { setUser, setView } = useContext(MyContext)

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(position => {
        setZoom(17)
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        async function updateLocation(longitude, latitude){
          await logic.updateDinamicLocation(Number(longitude), Number(latitude))
          const { user } = await logic.retrieveUser()
          setUser(user)
          const response = await logic.retrieveAllUsers(400000000000)
          console.log(response.static)
          setUsers(response.static)
        }
        updateLocation(longitude, latitude)
        setPosition([latitude, longitude])
        setHaveUsersLocation(true)
        setView('home')
      }, error => console.log(error.message))
    }, 5000)
    return () => clearInterval(interval)
  })
  console.log(users)
  // useEffect(() => {
  //   const onRetrieveWalkingUsers = function(){
  //     users.map( marker => (
  //       <Marker key ={marker.id} position={marker.static.coordinates[1],marker.static.coordinates[0]} icon={myIcon}/>
  //     ))
  //   }
  //   onRetrieveWalkingUsers()
  // })


  return <Map className="map" center={position} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { haveUsersLocation ? <Marker position={position} icon={myIcon}></Marker> : '' }

      {/*{users && {onRetrieveWalkingUsers}} */}
      {/* { users.map( marker => {
         return <><Marker key ={marker._id} position={marker.static.coordinates[1],marker.static.coordinates[0]} icon={myIcon}/> </>
      })
      } */}
    </Map>
}
export default MapHome





//-----------------


// useEffect(() => {
//   debugger
//   const interval = setInterval(() =>{
//     navigator.geolocation.getCurrentPosition(position => {
//       setZoom(17)
//       setPosition([position.coords.latitude, position.coords.longitude])
//       setHaveUsersLocation(true)
      
//       }, error => console.log(error.message))
//   }, 3000)
//     return () => clearInterval(interval)
// },[])
