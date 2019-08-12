function Feedback({ message, level }) { 
    return<> 
    <section className="feedback-section">
        <p className={`feedback feedback--${level? level : 'error'}`}>{message}</p>
    </section>
    </>
}

