function Feedback({ message, level }) { // level: 'error', 'warn', 'success'
    return<> 
    <section className="feedback-section">
        <p className={`feedback feedback--${level? level : 'error'}`}>{message}</p>
    </section>
    </>
}

