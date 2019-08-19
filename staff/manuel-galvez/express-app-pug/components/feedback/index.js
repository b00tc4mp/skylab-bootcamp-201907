module.exports = function({ message }) { 
    let level
    debugger
    const errors = message.split('|')
    return `<ul class="feedback">
        ${errors.map(error => 
            `<li class="feedback__item feedback--${level? level : 'error'}">${error}</li>`).join('')}</ul>`

}


