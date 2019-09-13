// import React, { useContext, useState } from 'react'
// import { withRouter } from 'react-router-dom'
// import MyContext from '../Provider-Context'
// import logic from '../../logic'
// import Feedback from '../Feedback'

// function UpdtePet() {
//     const [error , setError] = useState(undefined)
//     const { setUser , setView, setAddPet } = useContext(MyContext)



//     return <section>
//             <h4>Pet information:</h4>
//             <form onSubmit = {event => {
//                 event.preventDefault()

//                 const { target: { petName: { value: petName }, age: { value: age }, gender: { value: gender }, size: { value: size },  characteristics: { value: characteristics } } } = event
                
//             }}>
//                 <label>Name</label>
//                     <input type = "text" name = "petName"/>
//                 <label>Age</label>
//                     <input type = "date" name = "age"/>
//                 <label>Gender</label>
//                    Male <input type = "radio" name = "gender" value = {true}/>
//                    Female <input type = "radio" name = "gender" value = {false}/>
//                 <label>Size</label>
//                     <input type = "text" name = "size"/>
//                 <label>Characteristics</label>
//                     <input type = "text" name = "characteristics"/> 
//                 <button>Add</button>
//             </form>
//         {error && <Feedback message ={error}/>}
//         </section> 
// }

// export default withRouter(UpdtePet)


//---------------------------------

//   {game.players.map(player => <Player player={player} hand={game.hands[game.hands.length - 1]} />)}
