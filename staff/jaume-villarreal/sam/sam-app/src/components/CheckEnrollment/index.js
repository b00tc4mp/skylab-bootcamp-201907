import React , { useState , useEffect , useContext } from 'react'
import { Link , withRouter } from "react-router-dom"
import MyContext from '../ProviderContext'
import logic from "../../logic"
import "./index.sass"
import selected from '../../styles/img/selected-icon.jpg'
import unselected from '../../styles/img/unselected-icon.png'

function CheckEnrollment({ history }){

    const { studentId } = useContext(MyContext)

    const [year , setYear] = useState(undefined)
    const [student , setStudent ] = useState(undefined)
    const [enrollment , setEnrollment] = useState(undefined)
    const [error , setError] = useState(undefined)

    useEffect(()=> {
        const date = new Date()
        const currentYear = date.getFullYear()
        setYear(currentYear)
    } , [])

    useEffect( () => {
        async function retrieveStudent(id){
            try{
                const retrievedStudent = await logic.retrieveStudent(studentId)
                setStudent(retrievedStudent.student)
            }catch({ message }){
                history.push("/home")
            }
        }
        retrieveStudent(studentId)
    } , [] )    

    useEffect(() => {
        async function retrieveEnrollment(id){
            try{
                const { enrollment } = await logic.retrieveCurrentEnrollment(id)
                setEnrollment(enrollment)
            }catch({ message }){
                setError(logic.translateMessage(message))
            }
        }
        retrieveEnrollment(studentId)
    } , [])


    return  <div className="detail-wrapper">
                {student && <h1 className="home-header">Dades d'inscripció - Casal d'estiu {year && year}</h1>}
                {student && <h2 className="home-header2">{student.name} {student.surname}</h2>}
                {enrollment && <h3 className="home-header3">{enrollment.activity} - {enrollment.group}</h3>}
                {enrollment &&  <section className="detail-panel">
                                    <section className="detail-panel__table">
                                        <div className="detail-table__row detail-table__header">
                                            <p className="cell">Setmana</p>
                                            <p className="cell">Modalitat</p>
                                            <p className="cell">Menjador</p>
                                            <p className="cell">Permanències matí</p>
                                            <p className="cell">Permanències tarda</p>
                                        </div>
                                        {enrollment.weeks.map( week =>  <div className="detail-table__row">
                                            <p className="cell">{week.number}</p>   
                                            <p className="cell">{week.category === "part" ? "Matí" : "Jornada completa"}</p>
                                            <p className="cell">{week.morningPermanence ? <img src={selected} alt="sí"/> : <img src={unselected} alt="no"/>}</p>
                                            <p className="cell">{week.afternoonPermanence ? <img src={selected} alt="sí"/> : <img src={unselected} alt="no"/>}</p>
                                            <p className="cell">{week.lunch ? <img src={selected} alt="sí"/> : <img src={unselected} alt="no"/>}</p>
                                        </div>  )}
                                    </section>
                                    <ul className="detail-panel__observations">
                                        <li><span className="info-label">Talla de samarreta:</span>
                                            <span className="info-text info-text--center">{enrollment.shirt}</span>
                                        </li>
                                        <li>
                                            <span className="info-label">Autorització de sortides:</span>
                                            <span className="info-text info-text--center">{enrollment.excursionAuth ? <img src={selected} alt="sí"/> : <img src={unselected} alt="no"/>}</span>
                                            </li>
                                            <li>
                                            <span className="info-label">Autorització sobre drets d'imatge:</span>
                                            <span className="info-text info-text--center">{enrollment.imageAuth ? <img src={selected} alt="sí"/> : <img src={unselected} alt="no"/>}</span>
                                        </li>
                                        <li>
                                            <span className="info-label">Al·lèrgies:</span>
                                            <span className="info-text">{enrollment.allergy}</span>
                                        </li>
                                        <li>
                                            <span className="info-label">Malalties: </span>
                                            <span className="info-text">{enrollment.illness = enrollment.illness === "" ? "no detallada" : enrollment.illness}</span>
                                        </li>
                                        <li>
                                            <span className="info-label">Medicació:</span>
                                            <span className="info-text">{enrollment.medication = enrollment.medication === "" ? "no detallada" : enrollment.medication}</span>
                                        </li>
                                        <li>
                                            <span className="info-label">Observacions:</span>
                                            <span className="info-text">{enrollment.observations = enrollment.observations === "" ? "no detallada" : enrollment.observations}</span>
                                        </li>
                                    </ul>
                                </section>}
                
                 {error && <div className="warning-panel">
                                <section className="warning-panel__wrapper">
                                    <p className="warning-text">L'usuari encara no s'ha registrat al casal.</p>
                                    <div className="button-set">
                                        <Link className="btn btn--link btn--success" to="/register-enrollment">Registra</Link>
                                    </div>
                                </section>
                            </div>}
                <Link className="btn btn--link" to="/home">Torna</Link>
            </div>   
}

export default withRouter(CheckEnrollment)