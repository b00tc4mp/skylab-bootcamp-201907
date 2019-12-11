module.exports = function (currentDate){

    if (currentDate === "") throw new Error(`date is empty or blank`)

    if( !(currentDate instanceof Date) ) throw new Error (`argument with value ${currentDate} is not a date type value`)

    const year = currentDate.getFullYear().toString()
    
    let month = currentDate.getMonth()
    const formatMonth = month<10?month = '0'+ month.toString():month.toString()
    
    let days = currentDate.getDate()
    const formatDays = days<10?days = '0'+ days.toString():days.toString()
    
    const formatdate = `${formatDays}/${formatMonth}/${year}`
    
    return formatdate
}
    
    