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