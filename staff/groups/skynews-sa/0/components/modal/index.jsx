function Modal({ message, onAccept }) {
  return <>
      <section className="feed-sec">
          <Feedback message={message} />
          <button className="feedback-button" onClick={event => {
              event.stopPropagation()
              onAccept()
          }}>Ok</button>
    </section>
  </>
} 




