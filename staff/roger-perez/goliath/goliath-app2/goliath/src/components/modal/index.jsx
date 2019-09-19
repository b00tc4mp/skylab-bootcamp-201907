import React from './node_modules/react'
import Feedback from '../feedback/index'


function Modal({ message, onAccept }) {
    return <section className="modal">
        <main>
            <Feedback message={message} />
            <button onClick={event => {
                event.stopPropagation()

                onAccept()
            }}>Ok</button>
        </main>
    </section>
} 

export default Modal