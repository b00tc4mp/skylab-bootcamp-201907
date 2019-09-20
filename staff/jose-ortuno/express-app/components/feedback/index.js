module.exports = function (errorMessage) {
    
    let errors = errorMessage.split('|')
    
    return `<ul class="panel__feedback feedback">
        ${errors.map(error => `<li>${error}</li>`).join('')}
    </ul>`
}