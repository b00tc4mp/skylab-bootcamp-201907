import React , { useContext } from 'react'
import { Link } from 'react-router-dom'
import MyContext from '../ProviderContext'

import "./index.sass"

function StudentsPanel({ data }){
    const { setStudentId } = useContext(MyContext)
    return  <div className="cards-wrapper">
                <ul className = "cards-container">
                {data.map( student =>    
                        <li key ={student.id} className="card">
                                <p>Nom: {student.name} {student.surname}</p>
                                <p>Targeta sanitària: {student.healthcard}</p>
                                <p>Data de naixement: {student.birthdate}</p>
                            <div>
                                <Link to="/student-update" className="btn" onClick={()=>{
                                    setStudentId(student.id)
                                }}>Actualitza dades</Link><br/>
                                <Link to="/student-enrollment" className="btn" onClick={()=>{
                                    setStudentId(student.id)
                                }}>Inscriu</Link><br/>
                                <Link to="/check-enrollment" className="btn" onClick={()=>{
                                    setStudentId(student.id)
                                }}>Consulta les dades d'inscripció</Link>
                            </div>
                        </li>)}
                </ul>

                            <Link to="/register-student" className="card">Registra un alumne</Link>
                
            </div>
            }
            
 export default StudentsPanel