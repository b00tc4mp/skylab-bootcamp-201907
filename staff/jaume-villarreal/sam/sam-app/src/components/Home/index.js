import React , { useEffect , useState , useContext } from 'react'
import { Link } from 'react-router-dom'
import MyContext from '../ProviderContext'
import logic from "../../logic"

import Feedback from "../Feedback"

import "./index.sass"

function Home(){
    const { setTutor , setStudentId } = useContext(MyContext)
    const [ students , setStudents ] = useState(undefined)
    const [ error , setError ] = useState(undefined)
     
    useEffect(()=> {
        async function retrieveUsers(){
            try{
                const { tutor } = await logic.retrieveTutor()
                setTutor(tutor)
                const { studentsArray } = await logic.retrieveStudentsByTutor()
                setStudents(studentsArray)
            }catch({ message }){
                setError(message)
            }
        }
        retrieveUsers()
    },[])

    return  <div className="panel-wrapper">
                {students && <h1 className="home-header">Usuaris registrats</h1>}
                
                {students &&    <div className="cards-wrapper">
                                    <ul className = "cards-container">
                                    {students.map( student =>    
                                            <li key ={student.id} className="card">
                                                <div className="card__info">
                                                    <p className="card__info--label card__info--label-name">Nom</p>
                                                    <p className="card__info--content card__info--name">{student.name} {student.surname}</p>
                                                    <p className="card__info--label">Targeta sanitària</p>
                                                    <p className="card__info--content">{student.healthcard}</p>
                                                    <p className="card__info--label">Data de naixement</p>
                                                    <p className="card__info--content">{student.birthdate}</p>
                                                    
                                                </div>
                                                <div className="card__button-set">
                                                    <Link to="/student-update" className="btn btn__card btn__card--update" onClick={()=>{
                                                        setStudentId(student.id)
                                                    }}></Link>
                                                    <Link to="/register-enrollment" className="btn btn__card btn__card--enrollment" onClick={()=>{
                                                        setStudentId(student.id)
                                                    }}></Link>
                                                    <Link to="/check-enrollment" className="btn btn__card btn__card--check" onClick={()=>{
                                                        setStudentId(student.id)
                                                    }}></Link>
                                                </div>
                                            </li>)}
                                            <Link to="/register-student" className="btn--register-card">+</Link>
                                    </ul>

                                    
                                </div>
                }
                {error && <Feedback message = {error} />}
            </div>
}
            
export default Home