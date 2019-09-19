/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'

function ResultOrders({ orders }) {

 

    return <>
        <section className="myOrders">

            {orders && orders.map(order =>{
                
                
                const {state, date, owner, items} = order
                let totalPrice = 0

            return <section className="myOrdersAdmin__order" >


                
                <ul className="myOrders__orderCont--items">{items.map(item =>{
                    const totalItem = item.article.price * item.quantity
                    totalPrice += totalItem
                    return <ul className="myOrders__order--items">
                        <li>Ref: {item.article.ref}</li>
                        <li>{item.article.title}</li>
                        <li>{item.quantity} units</li>
                        <li>{item.article.price} €</li>
                        <li>Total: {totalItem.toFixed(2)} €</li>
                        </ul>
                    })}</ul>
                <ul className="myOrdersAdmin__order--data">
                    <li className="statusAdminOrder"><p>State:</p> <p className={`status__${state}`}>{state.toUpperCase()}</p></li>
                    <li>Date: <Moment format="YYYY-MM-DD HH:mm">{date}</Moment></li>
                    <li>Company: {owner.company}</li>
                    <li>Country: {owner.country}</li>
                    <li>E-mail: {owner.email}</li>
                    <li>Total price: {totalPrice.toFixed(2)}€</li>
                </ul>
                
            </section>
            })}
        </section>
    

    </>

}

export default withRouter(ResultOrders)