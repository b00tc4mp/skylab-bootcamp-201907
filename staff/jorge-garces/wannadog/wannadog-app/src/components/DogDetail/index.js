import React, { useEffect, useState } from 'react'
import logic from '../../logic'
import { withRouter, Link } from 'react-router-dom'

export default withRouter(function ({ history, match }) {

    const { params } = match

    const [dog, setDog] = useState(undefined)
    const [user, setUser] = useState(undefined)
    const [dogId, setDogId] = useState(undefined)
    const [ownerId, setOwnerId] = useState(undefined)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userEmail, setUserEmail] = useState(undefined)
    const [deletion, setDeletion] = useState(undefined)

    useEffect(() => {
        (async () => {

            const dog = await logic.retrieveDog(params.id)
            setDog(dog)
            setDogId(dog.id)
            setOwnerId(dog.owner)

            if (logic.isUserLoggedIn()) {
                const user = await logic.retrieveUser()
                user.dogs.find(id => id === dog.id) ? setUser("owner") : setUser("notOwner")
                user.favorites.find(id => id === dog.id) ? setIsFavorite(true) : setIsFavorite(false)

                setUserEmail(user.email)
            }
        })()
    }, [isFavorite])


    const goBack = () => history.go(-1)

    const handleToggleDog = () => {
        try {
            logic.toggleFavorite(dogId)
            setIsFavorite(!isFavorite)
        } catch ({ message }) {
            console.log(message)
        }
    }

    const deleteForm = () => setDeletion(true)

    const deleteDog = (userPassword) => {
        try {
            logic.unregisterDog(userEmail, userPassword, dogId)
            console.log('dog unregistered successfully')
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleCreatChat = async () => {
        try {
            const { chatId } = await logic.createChat(ownerId)
            history.push(`/chat/${chatId}`)
        } catch ({ message }) {
            console.log(message)
        }
    }

    return <>

        <button onClick={goBack}>Back</button>

        {dog && <>
            <h2>{dog.name}</h2>
            <h3>Breed</h3>
            <p>{dog.breed}</p>
            <h2>Neutered</h2>
            <h3>Size</h3>
            <p>{dog.size}</p>
            <h3>Gender</h3>
            <p>{dog.gender}</p>
            <h3>Age</h3>
            <p>{dog.age}</p>
            {dog.withDogs ? <p>{dog.withDogs}</p> : {}}
            {dog.withCats ? <p>{dog.withCats}</p> : {}}
            {dog.withChildren ? <p>{dog.withChildren}</p> : {}}
            <p>{dog.notes}</p>
        </>}

        {user === "owner" && <button onClick={deleteForm}>DELETE DOG</button>}
        {deletion && <>

            <form onSubmit={event => {

                event.preventDefault()

                const { target: { userPassword: { value: userPassword } } } = event

                deleteDog(userPassword)

            }}>
                <input type="password" placeholder="enter password" name="userPassword"></input>
                <button>SAVE</button>
            </form>
        </>
        }

        <button onClick={handleCreatChat}>CONTACT</button>

        {user === "notOwner" && <>
            {!isFavorite && <button onClick={handleToggleDog}>ADD FAVORITE</button>}
            {isFavorite && <button onClick={handleToggleDog}>REMOVE FAVORITE</button>}
        </>}



        {dog && !user && <>
            <p>In love with {dog.name}? <Link to="/sign">Log-in</Link> to contact the owner
            </p></>}
    </>
})
