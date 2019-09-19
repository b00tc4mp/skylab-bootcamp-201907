import React , { useContext , useEffect , useState } from 'react'
import { Link  , withRouter } from 'react-router-dom'
import MyContext from '../ProviderContext'
import logic from "../../logic"
import Feedback from "../Feedback"
import './index.sass'
import "../../styles/form.sass"
import translateMessage from '../../logic/translate-message'

function UpdateStudent({ history }){
    const { studentId } = useContext(MyContext)

    const [student , setStudent] = useState(undefined)
    
    const [_name , setName] = useState(undefined)
    const [_surname , setSurname] = useState(undefined)
    const [_birthdate , setBirthdate] = useState(undefined)
    const [_healthcard , setHealthcard] = useState(undefined)
    
    const [result , setResult] = useState(undefined)

    useEffect( ()=>{
        async function retrieveStudent(id){
            try{
                const response = await logic.retrieveStudent(id)
                setStudent(response.student)

                setName(response.student.name)
                setSurname(response.student.surname)
                setBirthdate(response.student.birthdate)
                setHealthcard(response.student.healthcard)

            }catch({ message }){
                history.push("./home")
            }
        }
        
        retrieveStudent(studentId)
    } , [])
    
    function handleSubmit(event){
        event.preventDefault()
        handleUpdate(studentId , _name , _surname , _birthdate , _healthcard)
    }

    async function handleUpdate(studentId , _name , _surname , birthdate , healthcard){
        try{
            const response = await logic.updateStudent(studentId , _name , _surname , birthdate , healthcard)
            history.push("/update-success")
        }catch({ message }){
            console.log(message)
            console.log(student.healthcard)
            setResult(logic.translateMessage(message , undefined , student.healthcard))
        }
    }

    return  <div className="form-wrapper">
                {student && <h1 className="home-header">Formulari d'actualització</h1>}
                {student && 
                    <form onSubmit={handleSubmit} className="form">
                        <fieldset className = "fieldset">
                            <legend className="fieldset__legend">
                            Dades de l'inscrit/a
                            </legend>
                            <section className="fieldset__body">
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="name">Nom</label>
                                    <input className="input-block__input" type="text" name="name" value={_name} onChange={ event => setName(event.target.value)}/>
                            </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="surname">Cognoms</label>
                                    <input className="input-block__input" type="text" name="surname" value={_surname} onChange={ event => setSurname(event.target.value)}/>
                            </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="birthdate">Data de naixement</label>
                                    <input className="input-block__input" type="text" name="birthdate" value={_birthdate} onChange={ event => setBirthdate(event.target.value)}/>
                            </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="healthcard">Targeta sanitària</label>
                                    <input className="input-block__input" type="text" name="healthcard" value={_healthcard} onChange={ event => setHealthcard(event.target.value)}/>
                            </div>
                            <button className="btn btn--submit">Actualitza les dades</button>
                            </section>
                        </fieldset>
                    </form>
                }
                {student && <Link className="btn btn--link" to="/home">Torna</Link>}
                {result && <Feedback message={result}/>}
            </div>
        }

export default withRouter(UpdateStudent)
    
              
