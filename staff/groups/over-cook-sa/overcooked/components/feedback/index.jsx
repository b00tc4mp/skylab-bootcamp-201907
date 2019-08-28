function Feedback({ message, level }) { // level: 'error', 'warn', 'success'
    return <>
    <section className="feedback">
    <p className={` feedback--${level? level : 'error'}`}>{message}</p>
    </section>
    </>
}