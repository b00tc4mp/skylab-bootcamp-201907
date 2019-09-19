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
            setOwnerId(dog.owner._id)

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
            history.push("/mydogs")
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleCreatChat = async () => {
        try {
            const { chatId } = await logic.createChat(ownerId)
            history.push(`/chat/${chatId}`)
        } catch ({ message }) {
            history.push(`/chat/${message.split(',')[0]}`)
        }
    }

    return <>

        {dog && <>
            <section className="body detail">
                <Link className="back" onClick={goBack}><i class="fas fa-arrow-left"></i></Link>
                <img className="detail__image" src={dog.image}></img>
                <section className="detail__main">
                    <h2 className="detail__name">{dog.name}</h2>
                    <h4>Breed</h4>
                    <p>{dog.breed}</p>
                    <h2 className="detail__neutered">Neutered</h2>
                    <section className="detail__three">
                        <h3>Size</h3>
                        <h3>Gender</h3>
                        <h3>Age</h3>
                        <p>{dog.size}</p>
                        <p>{dog.gender}</p>
                        <p>{dog.age}</p>
                    </section>
                    <article className="detail__skills">
                        {dog.withDogs ? <p>{dog.withDogs}</p> : {}}
                        {dog.withCats ? <p>{dog.withCats}</p> : {}}
                        {dog.withChildren ? <p>{dog.withChildren}</p> : {}}
                    </article>
                    <h4>Notes</h4>
                    <p className="detail__notes">{dog.notes}</p>
                </section>
            </section>
        </>}

        {user === "owner" && <button className="button__delete button" onClick={deleteForm}>DELETE DOG</button>}
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



        {user === "notOwner" && <>
            <button className="button__contact button" onClick={handleCreatChat}>CONTACT</button>
            {!isFavorite && <button className="button__fav button" onClick={handleToggleDog}>ADD FAVORITE</button>}
            {isFavorite && <button className="button__fav  button" onClick={handleToggleDog}>REMOVE FAVORITE</button>}
        </>}

        {dog && !user && <>
            <p>In love with {dog.name}? <Link to="/sign">Log-in</Link> to contact the owner
            </p></>}
    </>
})
