function Modal({ message, onAccept }) {
  return <section>
      <main>
          <Feedback message={message} />
          <button onClick={event => {
              event.stopPropagation()
              onAccept()
          }}>Ok</button>
      </main>
  </section>
} 




