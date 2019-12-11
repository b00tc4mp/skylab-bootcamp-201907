import React, { useEffect, useState, useContext} from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { withRouter } from'react-router-dom'
import L from 'leaflet'
import './map.css'
import MyContext from '../Provider-Context'
import paw from '../../img/paws.png'
import walkingDog from '../../img/walking-dog.png'
import logic from '../../logic'

var myIcon = L.icon({ iconUrl: paw, iconSize: [40, 40], iconAnchor: [12.5, 41], popupAnchor: [0, -41] })
var usersIcon = L.icon({ iconUrl: walkingDog, iconSize: [30, 30], iconAnchor: [12.5, 41], popupAnchor: [0, -41] })

function MapHome({ history }) {
  const [position, setPosition] = useState([0, 0])
  const [zoom, setZoom] = useState(2)
  const [haveUsersLocation, setHaveUsersLocation] = useState(false)
  const [users, setUsers] = useState()
  const { setUser, setUserId, user} = useContext(MyContext)

  useEffect(() => {
    setZoom(17)

    const interval = setInterval(() => {
      
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude;
        
        (async function (longitude, latitude){
          await logic.updateDinamicLocation(Number(longitude), Number(latitude))

          const { user } = await logic.retrieveUser()
          const {static: users} = await logic.retrieveAllUsers(4000)
          
          setPosition([latitude, longitude])
          setUser(user)
          setUsers(users)
          setHaveUsersLocation(true)
        })(longitude, latitude)

      }, error => console.log(error.message))
    }, 3000)
    return () => clearInterval(interval)
  })

  function onCreateChat(participantId){
      (async function(participantId){
        try{
          const{ chatId }= await logic.createChat(participantId)
          await logic.retrieveChat(chatId.toString())
          history.push(`/chat/${chatId}`)
        }catch({ message}){
          history.push(`/chat/${message.split(',')[0].toString()}`)
        }
      })(participantId)
  }
  
  function onUserDetails(userId){
    setUserId(userId)
  }

  return <Map className="map" center={position} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { haveUsersLocation ? <Marker position={position} icon={myIcon}></Marker> : '' }
    
      { users && users.length && users.map( user => <Marker key ={user._id} position={[user.static.coordinates[1],user.static.coordinates[0]]} icon={usersIcon}> 
        <Popup>
        <form onSubmit = {event => {
              event.preventDefault() 
              onUserDetails(event.target.userId.value)
            }}>
              <input type = 'hidden' name = "userId" value = {user._id}/>
            <button className= 'detail'>{user.name}</button>
          </form>
         {user.notification[0] && <section className = 'user-notification'>
            <p className = 'user-notification_text'>{user.notification[0].title}</p>
            <p className = 'user-notification_text'>{user.notification[0].text}</p>
          </section>}
          <form onSubmit = {event => {
            event.preventDefault() 
            onCreateChat(event.target.participantId.value)
          }}>
            <input type = 'hidden' name = "participantId" value = {user._id}/>
            <button className = 'start-chat'>Start Chat</button>
          </form>
        </Popup>
      </Marker>) }
    </Map>
}
export default withRouter(MapHome)