function Feedback ({message, level}){
    return <p className={`feedback feedback--${level? level : 'error'}`}>{message}</p>
}

// level: 'error', 'warn', 'success'