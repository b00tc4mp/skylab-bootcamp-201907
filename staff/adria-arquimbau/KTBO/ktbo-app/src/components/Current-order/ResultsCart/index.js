import React, {useState} from 'react'
import logic from '../../../logic'
import CartArticle from './CartArticle'
import { withRouter } from 'react-router-dom'
import Modal from '../../Modal'

function ResultsCart({ history, cart , retrieverCart}) {

    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    let totalPrice = 0
    //const [ article , setArticle] = useState(undefined) 

    async function handleSubmit(articleId, quantity) {
        try {
            await logic.addToCart(articleId, quantity)
            retrieverCart()
        } catch (error) {
            //TODO
        }
    }

    async function handleRemove(event) {
        event.preventDefault()
        const { target: { articleId: { value: articleId }  } } = event
        await logic.removeToCart(articleId)
        retrieverCart()
    }

    async function handlePlaceOrder() {
        try {
            const { message } = await logic.placeOrder()
            const messageOk = message
            setMessage(messageOk)
        } catch ({message}) {
            setError(message)
        }
    }

    function handleModal() {
       setMessage(null) 
       history.push('/home/my-orders')
    }

    function handleModalError() {
        setError(null) 
     }

    return <>

        <section className="currentOrder__articles">
            {cart.map(element => {
                const { item : { article: { price, id }} , quantity : articleQuantity } = element
                totalPrice += price * articleQuantity
                return <CartArticle key={id} element={element} onSubmit={handleSubmit} onRemove={handleRemove}/>
            })}  
        </section>
        {message && <Modal message={message} showModal={handleModal}/>}
        {error && <Modal message={error} showModal={handleModalError}/>}
        <div className="currentOrder__placeOrder">
            <button onClick={handlePlaceOrder} className="currentOrder__button--placeOrder">PLACE ORDER</button>
            <h3 className="currentOrder__totalPrice">TOTAL PRICE: {totalPrice.toFixed(2)} €</h3>     
        </div>
    </>
}

export default withRouter(ResultsCart)