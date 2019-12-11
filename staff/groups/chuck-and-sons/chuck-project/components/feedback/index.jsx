function Feedback(props){

    const { message } = props

    return <>
        <div className = "feedback">
            { message }
        </div>
    </>
}