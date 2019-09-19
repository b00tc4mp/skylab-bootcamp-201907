import React , { useContext , useEffect , useState } from "react"
import { Link , withRouter } from 'react-router-dom'
import MyContext from "../ProviderContext"
import logic from "../../logic"

import Feedback from "../Feedback"

import "./index.sass"

function RegisterEnrollment({ history }){

    const { studentId , setStudentId} = useContext(MyContext)
    const [student , setStudent] = useState(undefined)
    const [enrollment , setEnrollment] = useState(undefined)
    const [year , setYear] = useState(undefined)
    const [week1 , setWeek1] = useState("empty")
    const [week2 , setWeek2] = useState("empty")
    const [week3 , setWeek3] = useState("empty")
    const [week4 , setWeek4] = useState("empty")

    const [error , setError] = useState(undefined)

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

    useEffect( () => {
        async function retrieveCurrentEnrollment(id){
            try{
                const retrievedCurrentEnrollment = await logic.retrieveCurrentEnrollment(studentId)
                setEnrollment(true)
            }catch({ message }){
                setEnrollment(false)
            }
        }
        retrieveCurrentEnrollment(studentId)
    } , [] )

    useEffect( () => {
        function getYear(date){
            const currentYear = date.getFullYear()
            setYear(currentYear)
        }
        const currentDate = new Date()
        getYear(currentDate)
    } , [])

    function handleSubmit(event){
        event.preventDefault()
        const { target : {  school : { value : school } ,
                            grade : { value : group} ,
                            size : { value : shirt } ,
                            modality : { value : activity} ,
                            allergy : { value : allergy} ,
                            illness : { value : illness } ,
                            medication : { value : medication } ,
                            observations : { value : observations } ,
                            imageAuth : { value : imageAuth } ,
                            excursionAuth : { value : excursionAuth } } } = event
        
        const { target : {  weekOption1 : { value : weekOption1 } ,
                            weekOption2 : { value : weekOption2 } ,
                            weekOption3 : { value : weekOption3 } , 
                            weekOption4 : { value : weekOption4 } } } = event

        let morningPerm1 , afternoonPerm1 , lunch1
        let morningPerm2 , afternoonPerm2 , lunch2
        let morningPerm3 , afternoonPerm3 , lunch3
        let morningPerm4 , afternoonPerm4 , lunch4

        if(weekOption1 === "empty"){
            morningPerm1 = "false"
            afternoonPerm1 = "false"
            lunch1 = "false"
        }
        else{
            morningPerm1 = event.target.morningPerm1.checked.toString()
            afternoonPerm1 = event.target.afternoonPerm1.checked.toString()
            lunch1 = event.target.lunch1.checked.toString()
        }

        if(weekOption2 === "empty"){
            morningPerm2 = "false"
            afternoonPerm2 = "false"
            lunch2 = "false"
        }
        else{
            morningPerm2 = event.target.morningPerm2.checked.toString()
            afternoonPerm2 = event.target.afternoonPerm2.checked.toString()
            lunch2 = event.target.lunch2.checked.toString()
        }

        if(weekOption3 === "empty"){
            morningPerm3 = "false"
            afternoonPerm3 = "false"
            lunch3 = "false"
        }
        else{
            morningPerm3 = event.target.morningPerm3.checked.toString()
            afternoonPerm3 = event.target.afternoonPerm3.checked.toString()
            lunch3 = event.target.lunch3.checked.toString()
        }

        if(weekOption4 === "empty"){
            morningPerm4 = "false"
            afternoonPerm4 = "false"
            lunch4 = "false"
        }
        else{
            morningPerm4 = event.target.morningPerm4.checked.toString()
            afternoonPerm4 = event.target.afternoonPerm4.checked.toString()
            lunch4 = event.target.lunch4.checked.toString()
        }

        handleRegister(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)
    }

    async function handleRegister(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4){
        try{
            await logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)
            history.push("/process-success")
        }catch({ message }){
            setError(logic.translateMessage(message)) 
        }
    }


    return  <div className="form-wrapper">
                {student && <h1 className="home-header">Formulari d'inscripció - Casal d'estiu {year && year}</h1>}
                {student && <h2 className="home-subheader">{student.name} {student.surname}</h2>}
                {enrollment === false && student && <form onSubmit = {handleSubmit} className="form-enrollment">
                    <fieldset className="fieldset__enrollment">
                        <legend className="fieldset__legend">
                            Dades generals
                        </legend>
                        <section className="fieldset__body">
                         <div className="input-block">
                            <label className="input-block__label" htmlFor="school">Escola</label>
                                <input className="input-block__input" type="text" name="school"/>
                        </div>
                            <div className="input-block">
                                <label className="input-block__label" htmlFor="size">Indica el curs actual</label>
                                    <select className="select__box" name="grade" id="grade">
                                        <option value="">curs actual</option>
                                        <option value="P3">P3</option>
                                        <option value="P4">P4</option>
                                        <option value="P5">P5</option>
                                        <option value="1EP">1-EP</option>
                                        <option value="2EP">2-EP</option>
                                        <option value="3EP">3-EP</option>
                                        <option value="4EP">4-EP</option>
                                        <option value="5EP">5-EP</option>
                                        <option value="6EP">6-EP</option>
                                        <option value="1ESO">1-ESO</option>
                                        <option value="2ESO">2-ESO</option>
                                        <option value="3ESO">3-ESO</option>
                                        <option value="4ESO">4-ESO</option>
                                    </select>
                            </div>

                            <div className="input-block">
                                <label className="input-block__label" htmlFor="size">Talla de samarreta</label>
                                    <select className="select__box" name="size" id="size">
                                        <option value="">tria la talla</option>
                                        <option value="4">4</option>
                                        <option value="6">6</option>
                                        <option value="8">8</option>
                                        <option value="10">10</option>
                                        <option value="12">12</option>
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                            </div>
                        </section>
                    </fieldset>

                    <fieldset className="fieldset__enrollment fieldset__enrollment--radio">
                        <legend className="fieldset__legend">
                            Modalitat
                        </legend>
                        <section className="table__radio-block">
                          
                            <span className="radio-block">
                                <label className="radio-block__label" htmlFor="casalet-inf">Casalet INF (de P3 fins a P5) </label>
                                <input className="radio-block__input" type="radio" name="modality" id="casalet-inf" value = "Casalet INF"/>
                            </span>
                          
                           <span className="radio-block">
                                <label className="radio-block__label" htmlFor="casalet-inf">Casalet EP (1r i 2n de Primària) </label>
                                <input className="radio-block__input" type="radio" name="modality" id="casalet-ep" value = "Casalet EP"/>
                            </span>

                            <span className="radio-block">
                                <label className="radio-block__label" htmlFor="casal-ep">Casal EP (de 3r fins a 6è de Primària) </label>
                                <input className="radio-block__input" type="radio" name="modality" id="casal-ep" value = "Casal EP"/>
                            </span>

                           <span className="radio-block">
                                <label className="radio-block__label" htmlFor="casalet-eso">Casal ESO (de 1r fins a 3r d'ESO) </label>
                                <input className="radio-block__input" type="radio" name="modality" id="casal-eso" value = "Casal ESO"/>
                            </span>

                           <span className="radio-block">
                                <label className="radio-block__label" htmlFor="cacampussalet-futbol">Campus de Futbol (de 1r de Primària fins a 3r d'ESO) </label>
                                <input className="radio-block__input" type="radio" name="modality" id="campus-futbolf" value = "Campus Futbol"/>
                            </span>
                
                            <span className="radio-block">
                                <label className="radio-block__label" htmlFor="campus-basket">Campus de Bàsquet (de 1r de Primària fins a 3r d'ESO) </label>
                                <input className="radio-block__input" type="radio" name="modality" id="campus-basket" value = "Campus Bàsquet"/>
                            </span>
                    
                            <span className="radio-block">
                                <label className="radio-block__label" htmlFor="campus-judo">Campus de Judo (de 1r de Primària fins a 3r d'ESO)</label>
                                <input className="radio-block__input" type="radio" name="modality" id="campus-judo" value = "Campus Judo"/>
                            </span>

                        </section>
                    </fieldset>

                    <fieldset className="fieldset__enrollment ">
                        <legend className="fieldset__legend">
                            Selecció de setmanes i serveis
                        </legend>
                        <div className="fieldset__schedule">
                            <table className="schedule">
                                <tbody>
                                <tr>
                                    <th></th>
                                    <th>Modalitat de jornada</th>
                                    <th>Permanències de matí</th>
                                    <th>Permanències de tarda</th>
                                    <th>Menjador</th>
                                </tr>
                                <tr>
                                    <td className="row-head">Setmana 1</td>
                                    <td>
                                        <div className="select--wrapper">
                                            <select className="select__box" name="weekOption1" id="weekOption1" onChange = { event => setWeek1(event.target.value)}> 
                                                <option value="empty">tria modalitat</option>
                                                <option value="part">Matí</option>
                                                <option value="full">Jornada completa</option>
                                            </select>
                                        </div>
                                    </td>
                                    {week1 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="morningPerm1" id="morningPerm1"/>
                                                            </td>
                                    }
                                    {week1 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="afternoonPerm1" id="afternoonPerm1"/>
                                                            </td>
                                    }
                                    {week1 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="lunch1" id="lunch1"/>
                                                            </td>
                                    }
                                </tr>
                                
                                <tr>
                                    <td className="row-head">Setmana 2</td>
                                    <td>
                                        <div className="select--wrapper">
                                            <select className="select__box" name="weekOption2" id="weekOption2" onChange={ event => setWeek2(event.target.value)}>
                                                <option value="empty">tria modalitat</option>
                                                <option value="part">Matí</option>
                                                <option value="full">Jornada completa</option>
                                            </select>
                                        </div>
                                    </td>
                                    {week2 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="morningPerm2" id="morningPerm2"/>
                                                            </td>
                                    }
                                    {week2 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="afternoonPerm2" id="afternoonPerm2"/>
                                                            </td>
                                    }
                                    {week2 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="lunch2" id="lunch2"/>
                                                            </td>
                                    }
                                </tr>
                                
                                <tr>
                                    <td className="row-head">Setmana 3</td>
                                    <td>
                                        <div className="select--wrapper">
                                            <select className="select__box" name="weekOption3" id="weekOption3" onChange = { event => setWeek3(event.target.value)}>
                                                <option value="empty">tria modalitat</option>
                                                <option value="part">Matí</option>
                                                <option value="full">Jornada completa</option>
                                            </select>
                                        </div>
                                    </td>
                                    {week3 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="morningPerm3" id="morningPerm3"/>
                                                            </td>
                                    }
                                    {week3 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="afternoonPerm3" id="afternoonPerm3"/>
                                                            </td>
                                    }
                                    {week3 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="lunch3" id="lunch3"/>
                                                            </td>
                                    }
                                </tr>
                                
                                <tr>
                                    <td className="row-head">Setmana 4</td>
                                    <td>
                                        <div className="select--wrapper">
                                            <select className="select__box" name="weekOption4" id="weekOption4" onChange ={ event => setWeek4(event.target.value)} >
                                                <option value="empty">tria modalitat</option>
                                                <option value="part">Matí</option>
                                                <option value="full">Jornada completa</option>
                                            </select>
                                        </div>
                                    </td>
                                    {week4 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="morningPerm4" id="morningPerm4"/>
                                                            </td>
                                    }
                                    {week4 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="afternoon-perm4-" id="afternoonPerm4"/>
                                                            </td>
                                    }
                                    {week4 !== "empty" &&   <td>
                                                                <input className="input-check" type="checkbox" name="lunch4" id="lunch4"/>
                                                            </td>
                                    }
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </fieldset>

                    <fieldset className="fieldset__enrollment fieldset__enrollment--radio">
                        <legend className="fieldset__legend">
                            Autoritzacions
                        </legend>
                        <section className="table__radio-block">
                            <span className="radio-block">
                                <p className="radio-block__text">Autoritzo a fer ús dels drets d'imatge.</p>
                                <div className="radio-block__auth">
                                    <div className="radio-auths">
                                        <label className="radio-block__label" htmlFor="imageAuth">Sí</label>
                                        <input className="radio-auth__input" type="radio" name="imageAuth" id="imageAuth" value = "true"/>
                                    </div>
                                    <div className="radio-auths">
                                        <label className="radio-block__label" htmlFor="imageAuth">No</label>
                                        <input className="radio-auth__input"  type="radio" name="imageAuth" id="imageAuth" value = "false"/>
                                    </div>
                                </div>
                            </span>
                            <span className="radio-block">
                                <p className="radio-block__text">Autoritzo al meu fill/a a realitzar les sortides programades.</p>
                                 <div className="radio-block__auth">
                                    <div className="radio-auths">
                                        <label className="radio-block__label" htmlFor="excursionAuth">Sí</label>
                                        <input className="radio-auth__input" type="radio" name="excursionAuth" id="excursionAuth" value = "true"/>
                                    </div>
                                    <div className="radio-auths">
                                        <label className="radio-block__label" htmlFor="excursionAuth">No</label>
                                        <input className="radio-auth__input" type="radio" name="excursionAuth" id="excursionAuth" value = "false"/>
                                    </div>
                                </div>
                            </span>
                        </section>
                    </fieldset>

                    <fieldset className="fieldset__enrollment fieldset__observations">
                        <legend className="fieldset__legend">
                            Observacions
                        </legend>

                        <label className="observations__label" htmlFor="user-allergic">
                            El vostre fill/a té alguna al·lèrgia? Indiqueu a què i quines accions cal tenir en compte.
                        </label>
                            <textarea className="text-area" name="allergy" cols="2" rows="10"></textarea>
                        
                        <label className="observations__label" htmlFor="user-illness">
                            El vostre fill/a pateis alguna malaltia? Indiqueu quina i quines accions cal tenir en compte.
                        </label>
                            <textarea className="text-area" name="illness" cols="2" rows="10"></textarea>
                        
                        <label className="observations__label" htmlFor="user-medecine">
                            El vostre fill/a pren algun medicament? Indiqueu quin i quines accions cal tenir en compte.
                        </label>
                            <textarea className="text-area" name="medication" cols="2" rows="10"></textarea>
                        
                        <label className="observations__label" htmlFor="user-observations">
                            Si teniu alguna altra observació feu-nos-ho saber, siusplau.
                        </label>
                            <textarea className="text-area" name="observations" cols="2" rows="10"></textarea>
                    <button className="btn btn--submit btn--enrollment">Registra't</button>
                    </fieldset>
                </form>}
                {error && <Feedback message={error}/>}

                {enrollment &&  <div className="success-panel">
                                    <section className="success-panel__wrapper">
                                        <p className="success-text">L'usuari ja ha estat registrat al casal.</p>
                                        <div className="button-set">

                                            <Link className="btn btn--success" to="/check-enrollment">Consulta les dades</Link>
                                        </div>
                                    </section>
                                </div>}
                <Link className="btn btn--link" to="/home">Torna</Link>
            </div>   
}

export default withRouter(RegisterEnrollment)