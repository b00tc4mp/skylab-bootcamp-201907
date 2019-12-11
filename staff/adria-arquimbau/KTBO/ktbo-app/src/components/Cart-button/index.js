import React, { useState } from 'react'
import logic from '../../logic'
import Feedback from '../Feedback'

function CartButton({ articleId }) {

    const [message, setMessage] = useState()

    function handleSubmit(event) {    
        event.preventDefault()
        const { target: { quantity: { value: quantity } } } = event
        handleAddToCart(articleId, quantity)
    }

    async function handleAddToCart(articleId, quantity) {
        try {
            quantity = Number(quantity)
            const {message} = await logic.addToCart(articleId, quantity)
            setMessage(message)
        } catch ({message}) {
            setMessage(message)
        }
    }

    return <>
        <form onSubmit={handleSubmit}>
            <button className="cartButton">Add to cart</button>
            <input className="cartButton__input" type="number" name="quantity" placeholder="quantity" />
        </form>

        <section className="cartButton__feedback">
            {message && <Feedback message={message} />}
        </section>

    </>
}

export default CartButton