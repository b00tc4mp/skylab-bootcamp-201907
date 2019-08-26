
/**
* Feedback message in case of error.
*/


function Feedback({ message, level }) { 
    return <p className={`feedback feedback--${level? level : 'error'}`}>{message}</p>
}