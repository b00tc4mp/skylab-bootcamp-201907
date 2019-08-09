 /**
 * Container to print feedback messages with back button.
 */

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