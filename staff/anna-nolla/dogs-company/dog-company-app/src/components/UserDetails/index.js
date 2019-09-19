import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import MyContext from '../Provider-Context'
import logic from '../../logic'
import moment from'moment'

function UserDetail() {

const { userId, setUserId } = useContext(MyContext)
const [pets, setPets] = useState([])
const [walker, setWalker] = useState()

    useEffect(() => {
        async function retrieveUser(){
            try{
                const { user }= await logic.retrieveUserId(userId)
                setWalker(user)
                setPets(user.pets)
            }catch({ message }){
                
            }
        }retrieveUser()
    }, [userId])

    function onClear(){
        setUserId(undefined)
    }

    return <section>
            <button className = 'detail-button' onClick= {onClear}>Clear</button>            
            {walker && <h5 className = 'detail-name'>Name: {walker.name}</h5>}
            {walker && pets.length === 0 && <p>This user does not own pets</p>}
        {pets && pets.length > 0 && <section>
            <h4 className = 'detail-pet'>Pets:</h4>
            {pets.map(pet => (
                <ul className = 'detail-pet_ul' key = {pet._id}>
                    <li className = 'detail-pet_ul_li'><p className = 'detail-pet_ul_li_text'>Name: {pet.name}</p></li>
                    <li className = 'detail-pet_ul_li'><p className = 'detail-pet_ul_li_text'>Age: {moment(pet.age).utc().format('DD-MM-YY')}</p></li>
                    <li className = 'detail-pet_ul_li'><p className = 'detail-pet_ul_li_text'>Gender: {pet.gender ? 'Male' : 'Female'}</p></li>
                    <li className = 'detail-pet_ul_li'><p className = 'detail-pet_ul_li_text'>Size: {pet.size}</p></li>
                    <li className = 'detail-pet_ul_li'><p className = 'detail-pet_ul_li_text'>Characteristics: {pet.characteristics}</p></li>
                </ul> 
            ))}
            </section>
        }
    </section>
}
export default withRouter(UserDetail)