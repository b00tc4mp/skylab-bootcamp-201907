/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../../logic'
import Moment from 'react-moment'
import Feedback from '../../Feedback'

function ResultOrders({ orders, retrievePendingOrders }) {
    
    const [message, setMessage] = useState(null)
    
    useEffect(() => {
        retrievePendingOrders()
    },[message])

    function handleFeedback() {
        setMessage(null) 
    }
    
    return <>

        {message && <Feedback message={message} showFeedback={handleFeedback}/>}

        <section className="myOrders">
            {orders && orders.map(order =>{
                const {state, date, owner, items, id} = order
                let totalPrice = 0

                return <section key={id} className="myOrdersAdmin__order">
                
                    <section  className="myOrders__orderCont--items">{items.map(item =>{
                        const totalItem = item.article.price * item.quantity
                        totalPrice += totalItem
                        return <ul key={item.id} className="myOrders__order--items">
                                <li>Ref: {item.article.ref}</li>
                                <li>{item.article.title}</li>
                                <li>{item.quantity} units</li>
                                <li>{item.article.price} €</li>
                                <li>Total: {totalItem.toFixed(2)} €</li>
                            </ul>
                    })}</section>

                    <ul className="myOrdersAdmin__order--data">
                        <li className="statusAdminOrder"><p>State:</p> <p className={`status__${state}`}>{state.toUpperCase()}</p></li>
                        <li>Date: <Moment format="YYYY-MM-DD HH:mm">{date}</Moment></li>
                        <li>Company: {owner.company}</li>
                        <li>Country: {owner.country}</li>
                        <li>E-mail: {owner.email}</li>
                        <li>Total price: {totalPrice.toFixed(2)}€</li>

                        <div className="myOrdersAdmin__order--buttons">
                            <form onSubmit={async event => {event.preventDefault()
                                try {
                                    const {message} = await logic.changeStateOrder(id)
                                    setMessage(message)
                                } catch ({message}) {
                                    setMessage(message)
                                }}}>
                                <button>Change State</button>
                            </form>
                            
                            <form onSubmit={async event => { event.preventDefault()
                                try {
                                    const {message} = await logic.removePendingOrder(id)
                                    setMessage(message)                        
                                } catch ({message}) {
                                    setMessage(message)
                                }}}>
                                <button>Remove Order</button>
                            </form>
                        </div>
                    </ul>
                </section>
            })}
        </section>
    </>
}

export default withRouter(ResultOrders)